///////////формирование количество для exmo sell
function exmoCountSell(sell,price,pair) {
  var count = sell[5]
  if (sell[4]=="Процент от баланса"){
    var balance = balanceExmoBot(pair) 
    Logger.log(balance)
    count=((balance[2]*sell[6])/100)
  }
  return count.toFixed(8)
}
//////////формирование цены для exmo 
function exmoPriceCount(pair, sell, ticker) {
  var price = sell[3]
  if (sell[2] == "По цене покупки Ask") {
    price = (ticker[pair].buy_price * 1) 
  }
  else if (sell[2] == "По цене продажи Bid") {
    price = (ticker[pair].sell_price * 1)
  }
  return price.toFixed(8)
}
///////////формирование количество для exmo buy
function exmoCountBuy(buy,pair,price) {
  var count = buy[5]
  if (buy[4]=="Процент от баланса"){
    var balance = balanceExmoBot(pair)
    count=(((balance[3]*buy[6])/100).toFixed(8))
    count=(count/price)-0.00000001
  }
  return count.toFixed(8)
}
function exmoCountBuyMar(buy,pair,price) {
  var count = buy[5]
  if (buy[4]=="Процент от баланса"){
    var balance = balanceExmoBot(pair)
    count=(((balance[3]*buy[6])/100).toFixed(8))
    count=count-0.00000001
  }
  return count.toFixed(8)
}
///////////////////запись в логи 
function readLog(sheet,countLog,price,count,res,result,mesageDate,mesage){
  countLog=countLog*1

  sheet.getRange("B"+(countLog+2)).setValue(countLog+1)
  sheet.getRange("C"+(countLog+2)).setValue(mesageDate)
  sheet.getRange("D"+(countLog+2)).setValue(new Date())
  sheet.getRange("E"+(countLog+2)).setValue(mesage)
  if (result){
    sheet.getRange("F"+(countLog+2)).setValue("Ордер успешно создан")
    sheet.getRange("G"+(countLog+2)).setValue(res)
    sheet.getRange("H"+(countLog+2)).setValue("Количество="+count)
    sheet.getRange("I"+(countLog+2)).setValue("Цена="+price)
  }
  else{
    sheet.getRange("F"+(countLog+2)).setValue("Ошибка при создании ордера")
    sheet.getRange("G"+(countLog+2)).setValue(res)
    sheet.getRange("H"+(countLog+2)).setValue("Количество="+count)
    sheet.getRange("I"+(countLog+2)).setValue("Цена="+price)
  }
  sheet.getRange("A1").setValue(countLog+1)
}

////////////пред подговтока ордера для биржы exmo
function preSettingExmo(type, pair, position, exmopairFiltr,mesageDate,mesage,sheet) {
  if (type == "sell") {
    var sell = []
    sell[1] = exmopairFiltr.getRange("K" + position).getValue();
    sell[2] = exmopairFiltr.getRange("L" + position).getValue();
    sell[3] = exmopairFiltr.getRange("M" + position).getValue();
    sell[4] = exmopairFiltr.getRange("N" + position).getValue();
    sell[5] = exmopairFiltr.getRange("O" + position).getValue();
    sell[6] = exmopairFiltr.getRange("P" + position).getValue();
    sell[7] = exmopairFiltr.getRange("Q" + position).getValue();
    sell[8] = exmopairFiltr.getRange("R" + position).getValue();
    if (sell[1] == "Лимитный") {
      var ticker = ExmoTicker()
      var price = exmoPriceCount(pair, sell, ticker) 
      var count =exmoCountSell(sell,price,pair)
      var res = ExmoOrderCreat(pair,count,price,"sell",1)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.result,mesageDate,mesage)
    }
    else if (sell[1] == "Рыночный") { 
      var ticker = ExmoTicker()
      var price = ticker[pair].buy_price
      var count =exmoCountSell(sell,price,pair)
      var res = ExmoOrderCreat(pair,count,price,"market_sell",2)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.result,mesageDate,mesage)
    }
  }
  else if (type == "buy") {
    var buy = []
    buy[1] = exmopairFiltr.getRange("C" + position).getValue();
    buy[2] = exmopairFiltr.getRange("D" + position).getValue();
    buy[3] = exmopairFiltr.getRange("E" + position).getValue();
    buy[4] = exmopairFiltr.getRange("F" + position).getValue();
    buy[5] = exmopairFiltr.getRange("G" + position).getValue();
    buy[6] = exmopairFiltr.getRange("H" + position).getValue();
    buy[7] = exmopairFiltr.getRange("I" + position).getValue();
    buy[8] = exmopairFiltr.getRange("J" + position).getValue();
    if (buy[1] == "Лимитный") { 
      var ticker =ExmoTicker()
      var price = exmoPriceCount(pair, buy, ticker) 
      var count =exmoCountBuy(buy,pair,price) 
      var res = ExmoOrderCreat(pair,count,price,"buy",1)
      Logger.log(res)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.result,mesageDate,mesage)
    }
    else if (buy[1] == "Рыночный") { 
      var ticker = ExmoTicker()
      var price = ticker[pair].sell_price
      var count =exmoCountBuyMar(buy,pair,price) 
      var res = ExmoOrderCreat(pair,count,price,"market_buy_total",2)
      Logger.log(res)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.result,mesageDate,mesage)
    }
  }
}


