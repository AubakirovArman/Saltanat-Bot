//////////,биржа binance
function preSettingBinance(type, pair, position, binancepairFiltr,mesageDate,mesage,sheet) {
  var resp =[]
  resp[1]= binancepairFiltr.getRange("AC"+position).getValue();
  resp[2]=binancepairFiltr.getRange("AD"+position).getValue();
  var stepSize=binancepairFiltr.getRange("AA"+position).getValue();
  if (type == "sell") {
    var sell = []

    sell[1] = binancepairFiltr.getRange("K" + position).getValue();
    sell[2] = binancepairFiltr.getRange("L" + position).getValue();
    sell[3] = binancepairFiltr.getRange("M" + position).getValue();
    sell[4] = binancepairFiltr.getRange("N" + position).getValue();
    sell[5] = binancepairFiltr.getRange("O" + position).getValue();
    sell[6] = binancepairFiltr.getRange("P" + position).getValue();
    sell[7] = binancepairFiltr.getRange("Q" + position).getValue();
    sell[8] = binancepairFiltr.getRange("R" + position).getValue();
    if (sell[1] == "Лимитный") {
      var ticker = BinanceBalancePair(resp,pair)
      var price = BinancePriceCount(sell, ticker)
      var count =BinanceCountSell(sell,ticker,stepSize)
      var stopPrice = sell[7]
      var res = BinanceCreatOrder(pair,"SELL","LIMIT","GTC",count,price,"RESULT",stopPrice)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.msg==undefined,mesageDate,mesage)
    }
    else if (sell[1] == "Рыночный") { 
      var ticker = BinanceBalancePair(resp,pair)
      var price = BinancePriceCount(sell, ticker)
      var count =BinanceCountSell(sell,ticker,stepSize)
      var stopPrice = sell[7]
      var res = BinanceCreatOrder(pair,"SELL","MARKET","GTC",count,price,"RESULT",stopPrice)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.msg==undefined,mesageDate,mesage)
    }

    else if (sell[1] == "Лимитный стоп-ордер"){
      var ticker = BinanceBalancePair(resp,pair)
      var price = BinancePriceCount(sell, ticker)
      var count =BinanceCountSell(sell,ticker,stepSize)
      var stopPrice = sell[7]
      var res = BinanceCreatOrder(pair,"SELL","STOP_LOSS_LIMIT","GTC",count,price,"RESULT",stopPrice)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.msg==undefined,mesageDate,mesage)
    }

  }
  else if (type == "buy") {
    var buy = []
    buy[1] = binancepairFiltr.getRange("C" + position).getValue();
    buy[2] = binancepairFiltr.getRange("D" + position).getValue();
    buy[3] = binancepairFiltr.getRange("E" + position).getValue();
    buy[4] = binancepairFiltr.getRange("F" + position).getValue();
    buy[5] = binancepairFiltr.getRange("G" + position).getValue();
    buy[6] = binancepairFiltr.getRange("H" + position).getValue();
    buy[7] = binancepairFiltr.getRange("I" + position).getValue();
    buy[8] = binancepairFiltr.getRange("J" + position).getValue();
    if (buy[1] == "Лимитный") {       
      var ticker = BinanceBalancePair(resp,pair)
      var price = BinancePriceCount(buy, ticker,stepSize)
      var count =BinanceCountBuy(buy,price,ticker,stepSize)
      var stopPrice = buy[7]
      var res = BinanceCreatOrder(pair,"BUY","LIMIT","GTC",count,price,"RESULT",stopPrice)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.msg==undefined,mesageDate,mesage)
    }
    else if (buy[1] == "Рыночный") { 
      var ticker = BinanceBalancePair(resp,pair)
      var price = BinancePriceCount(buy, ticker)
      var count =BinanceCountBuy(buy,price,ticker,stepSize)
      var stopPrice = buy[7]
      var res = BinanceCreatOrder(pair,"BUY","MARKET","GTC",count,price,"RESULT",stopPrice)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.msg==undefined,mesageDate,mesage)
    }

    else if (buy[1] == "Лимитный стоп-ордер"){
      var ticker = BinanceBalancePair(resp,pair)
      var price = BinancePriceCount(buy, ticker)
      var count =BinanceCountBuy(buy,price,ticker,stepSize)
      var stopPrice = buy[7]
      var res = BinanceCreatOrder(pair,"BUY","STOP_LOSS_LIMIT","GTC",count,price,"RESULT",stopPrice)
      var countLog =sheet.getRange("A1").getValue()
      readLog(sheet,countLog,price,count,res,res.msg==undefined,mesageDate,mesage)
    }
  }
}

///////////формирование количество для binance sell
function BinanceCountSell(sell,ticker,stepSize) {
  var count = sell[5]
  if (sell[4]=="Процент от баланса"){
    count=(((ticker[1]*sell[6])/100))
  }
    stepSize=stepSize.toString()
  var num = stepSize.indexOf("1")
  if (num==0)
  {
   count=count.toFixed(0)
  }
  else if (num>0){
    count=count.toFixed(num-1)
  }
  return count
}
///////////формирование количество для binance buy
function BinanceCountBuy(buy,price,ticker,stepSize) {
  var count = buy[5]
  if (buy[4]=="Процент от баланса"){
    count=(((ticker[2]*buy[6])/100))
    count=(count/price)
  }
  stepSize=stepSize.toString()
  var num = stepSize.indexOf("1")
  if (num==0)
  {
   count=count.toFixed(0)
  }
  else if (num>0){
    count=count.toFixed(num-1)
  }
  return count
}
///////////////
//////// вес депозит 

function BinanceBalancePair(res,pair)
{
  var result =[];
  var ss
  result[1] = res[1]  //baseAsset;
  result[2] = res[2] //quoteAsset;
  result[3]=BinanceTickerBookTicker(pair)
  var bal = BinanceAccount();
  for (var i =0;i<1500;i++)
  {
    if (bal.balances[i]!=null)
    {
      ss = bal.balances[i].asset;
      if (ss==result[1])
      {
        result[1] = bal.balances[i].free;
      }
      else if (ss==result[2])
      {
        result[2] = bal.balances[i].free;
      }
    }
    else if (bal.balances[i]==null)
    {
      i=15555;
    }
  }
  return result;
}
//////////формирование цены для binance
function BinancePriceCount(sell, ticker) {
  var price = sell[3]
  if (sell[2] == "По цене покупки Ask") {
    price = (ticker[3].askPrice * 1) 
  }
  else if (sell[2] == "По цене продажи Bid") {
    price = (ticker[3].bidPrice * 1)
  }
  return price
}
