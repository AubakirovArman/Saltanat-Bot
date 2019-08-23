
////////////
function preSettingBitmex(type, pair, position, bitmexpairFiltr,mesageDate,mesage,sheet) {
  if (type == "sell") {
    var sell = []

    sell[1] = bitmexpairFiltr.getRange("M" + position).getValue();
    sell[2] = bitmexpairFiltr.getRange("N" + position).getValue();
    sell[3] = bitmexpairFiltr.getRange("O" + position).getValue();
    sell[4] = bitmexpairFiltr.getRange("P" + position).getValue();
    sell[5] = bitmexpairFiltr.getRange("Q" + position).getValue();
    sell[6] = bitmexpairFiltr.getRange("R" + position).getValue();
    sell[7] = bitmexpairFiltr.getRange("S" + position).getValue();
    sell[8] = bitmexpairFiltr.getRange("T" + position).getValue();
    sell[9] = bitmexpairFiltr.getRange("U" + position).getValue();
    sell[10] = bitmexpairFiltr.getRange("V" + position).getValue();
    if (sell[1] == "Лимитный") {
      var ticker = Bitmexinstrument(pair)
      var price = BitmexPriceCount(pair, sell, ticker) 
      var count =sell[5]  
      var res = BitmexorderPost(pair,"Sell",count,price,"","Limit","")
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.error==undefined,mesageDate,mesage)
    }
    else if (sell[1] == "Рыночный") { 
      var ticker = Bitmexinstrument(pair)
      var price =  BitmexPriceCount(pair, sell, ticker) 
      var count =sell[5]
      var res = BitmexorderPost(pair,"Sell",count,price,"","Market","")
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.error==undefined,mesageDate,mesage)
    }
    else if (sell[1] == "Рыночный стоп"){
      var ticker = Bitmexinstrument(pair)
      var price =  BitmexPriceCount(pair, sell, ticker) 
      var count =sell[5]
      var execInst=BitmexTrigger(sell)
      var stopPx=sell[7] 
      var res = BitmexorderPost(pair,"Sell",count,price,stopPx,"Stop",execInst)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.error==undefined,mesageDate,mesage)
    }
    else if (sell[1] == "Лимитный стоп-ордер"){
      var ticker = Bitmexinstrument(pair)
      var count =sell[5]
      var price = BitmexPriceCount(pair, sell, ticker) 
      var execInst=BitmexTrigger(sell)
      var stopPx=sell[7] 
      var res = BitmexorderPost(pair,"Sell",count,price,stopPx,"StopLimit",execInst)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.error==undefined,mesageDate,mesage)
    }
    else if (sell[1] == "Лимитный с фиксацией прибыли"){
      var ticker = Bitmexinstrument(pair)
      var count =sell[5]
      var price = BitmexPriceCount(pair, sell, ticker) 
      var execInst=BitmexTrigger(sell)
      var stopPx=sell[8] 
      var res = BitmexorderPost(pair,"Sell",count,price,stopPx,"LimitIfTouched",execInst)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.error==undefined,mesageDate,mesage)
    }
    else if (sell[1] == "Рыночный с фиксацией прибыли"){
      var ticker = Bitmexinstrument(pair)
      var count =sell[5]
      var price = BitmexPriceCount(pair, sell, ticker) 
      var execInst=BitmexTrigger(sell)
      var stopPx=sell[8] 
      var res = BitmexorderPost(pair,"Sell",count,price,stopPx,"MarketIfTouched",execInst)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.error==undefined,mesageDate,mesage)
    }
  }
  else if (type == "buy") {
    var buy = []
    buy[1] = bitmexpairFiltr.getRange("C" + position).getValue();
    buy[2] = bitmexpairFiltr.getRange("D" + position).getValue();
    buy[3] = bitmexpairFiltr.getRange("E" + position).getValue();
    buy[4] = bitmexpairFiltr.getRange("F" + position).getValue();
    buy[5] = bitmexpairFiltr.getRange("G" + position).getValue();
    buy[6] = bitmexpairFiltr.getRange("H" + position).getValue();
    buy[7] = bitmexpairFiltr.getRange("I" + position).getValue();
    buy[8] = bitmexpairFiltr.getRange("J" + position).getValue();
    buy[9] = bitmexpairFiltr.getRange("K" + position).getValue();
    buy[10] = bitmexpairFiltr.getRange("L" + position).getValue(); 
    if (buy[1] == "Лимитный") {       
      var ticker = Bitmexinstrument(pair)
      var count =buy[5]
      var price = BitmexPriceCount(pair, buy, ticker) 
      var execInst=BitmexTrigger(buy)
      var stopPx=buy[7] 
      var res = BitmexorderPost(pair,"Sell",count,price,stopPx,"Limit",execInst)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.error==undefined,mesageDate,mesage)
    }
    else if (buy[1] == "Рыночный") { 
      var ticker = Bitmexinstrument(pair)
      var count =buy[5]
      var price = BitmexPriceCount(pair, buy, ticker) 
      var execInst=BitmexTrigger(buy)
      var stopPx=buy[7] 
      var res = BitmexorderPost(pair,"Sell",count,price,stopPx,"Market",execInst)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.error==undefined,mesageDate,mesage)
    }
    else if (buy[1] == "Рыночный стоп"){
      var ticker = Bitmexinstrument(pair)
      var count =buy[5]
      var price = BitmexPriceCount(pair, buy, ticker) 
      var execInst=BitmexTrigger(buy)
      var stopPx=buy[7] 
      var res = BitmexorderPost(pair,"Sell",count,price,stopPx,"Stop",execInst)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.error==undefined,mesageDate,mesage)
    }
    else if (buy[1] == "Лимитный стоп-ордер"){
      var ticker = Bitmexinstrument(pair)
      var count =buy[5]
      var price = BitmexPriceCount(pair, buy, ticker) 
      var execInst=BitmexTrigger(buy)
      var stopPx=buy[7] 
      var res = BitmexorderPost(pair,"Sell",count,price,stopPx,"StopLimit",execInst)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.error==undefined,mesageDate,mesage)
    }
    else if (buy[1] == "Лимитный с фиксацией прибыли"){
      
      var ticker = Bitmexinstrument(pair)
      var count =buy[5]
      var price = BitmexPriceCount(pair, buy, ticker) 
      var execInst=BitmexTrigger(buy)
      var stopPx=buy[8] 
      var res = BitmexorderPost(pair,"Sell",count,price,stopPx,"LimitIfTouched",execInst)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.error==undefined,mesageDate,mesage)
    }
    else if (buy[1] == "Рыночный с фиксацией прибыли"){
      
      var ticker = Bitmexinstrument(pair)
      var count =buy[5]
      var price = BitmexPriceCount(pair, buy, ticker) 
      var execInst=BitmexTrigger(buy)
      var stopPx=buy[8] 
      var res = BitmexorderPost(pair,"Sell",count,price,stopPx,"MarketIfTouched",execInst)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.error==undefined,mesageDate,mesage)
    }
  }
}
////////формирование триггера
function BitmexTrigger(sellBuy)
{
  var res =""
  if (sellBuy[9]){
    res ="Close"
    if (sellBuy[10]=="Маркировка"){
      res ="MarkPrice,"+res
    }
    else if (sellBuy[10]=="Индекс"){
      res ="IndexPrice,"+res
    }
    else if (sellBuy[10]=="Последняя"){
      res ="LastPrice,"+res
    }
  }
  else
  {
    if (sellBuy[10]=="Маркировка"){
      res ="MarkPrice"
    }
    else if (sellBuy[10]=="Индекс"){
      res ="IndexPrice"
    }
    else if (sellBuy[10]=="Последняя"){
      res ="LastPrice"
    }
  }
  return res 
}
//////////формирование цены для bitmex
function BitmexPriceCount(pair, sell, ticker) {
  var price = sell[3]
  if (sell[2] == "По цене покупки Ask") {
    price = (ticker[0].askPrice * 1) 
  }
  else if (sell[2] == "По цене продажи Bid") {
    price = (ticker[0].bidPrice * 1)
  }
  return price.toFixed(8)
}