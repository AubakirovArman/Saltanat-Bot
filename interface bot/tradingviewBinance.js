/////////////////////////////
//////////binance
function BinanceOsnovnoiTradingview(filtr,proverka,filtrPair,pair,Type,count,price,infoAllPair,priceTypeBuy,priceTypeSell,countProcentBuy,countProcentSell,countTypeBuy,countTypeSell,telegramm)
{
  proverka=BinanceFiltr(filtr,proverka,filtrPair,pair);
  Logger.log("3")
  if (proverka==1)
  {
    var ticker = BinanceTickerBookTicker(pair)
    Logger.log("1");
    var listAnswer = [];
    listAnswer = BinanceTradingViewPriceCount(Type,pair,count,price,infoAllPair,ticker,priceTypeBuy,priceTypeSell,countProcentBuy,countProcentSell,countTypeBuy,countTypeSell)
    var side = listAnswer[0].toLowerCase();
    price=listAnswer[1];
    var quantity =listAnswer[2];
    Type=listAnswer[3];
    var symbol = pair;
    Logger.log("2")
    TradingviewBinanceOrderCreat(symbol,quantity,price,Type,side,infoAllPair,telegramm)
  }
}

/////////////////////////////
/////создание ордера 
function TradingviewBinanceOrderCreat(symbol,quantity,price,type,side,infoAllPair,telegramm)
{
  price=BinancePriceCheck(symbol,price,infoAllPair);
  quantity=BinanceCountCheck(symbol,quantity,infoAllPair);
  var text;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("tradingview");
  var number = sheet.getRange("O1").getValue(); 
  var infoStep = sheet.getRange("O2").getValue(); 
  //////////////////
  Logger.log("side= " + side)
  var BuyResult = BinanceCreatOrder(symbol,side,type,"GTC",quantity,price,"ACK","");
  Logger.log("tut result == "+BuyResult.msg)
  if (BuyResult.orderId!=null)
  {  
    number++;
    sheet.getRange("O1").setValue(number); 
    sheet.getRange("A"+(number+1)).setValue("Binance");
    sheet.getRange("B"+(number+1)).setValue(symbol);
    sheet.getRange("C"+(number+1)).setValue(quantity);
    sheet.getRange("D"+(number+1)).setValue(price); 
    sheet.getRange("E"+(number+1)).setValue((quantity*price).toFixed(8)); 
    sheet.getRange("F"+(number+1)).setValue(side); 
    sheet.getRange("G"+(number+1)).setValue("0"); 
    sheet.getRange("H"+(number+1)).setValue(BuyResult.orderId);
    
    
    sheet.getRange("L"+(infoStep+1)).setValue("Ордер создан валюта = "+symbol);     infoStep++;
    sheet.getRange("L"+(infoStep+1)).setValue("Цена ="+price);        infoStep++;          
    sheet.getRange("L"+(infoStep+1)).setValue("Количество ="+ quantity);         infoStep++;    
    sheet.getRange("L"+(infoStep+1)).setValue("тип ордера ="+ side);         infoStep++;   
    sheet.getRange("L"+(infoStep+1)).setValue("тип ="+ type);         infoStep++;  
    text = "Ордер по оповещению tradingview создан id ордера ="+BuyResult.orderId;  
    sheet.getRange("L"+(infoStep+1)).setValue(text);  infoStep++;
  }
  else if (BuyResult.msg!=null)
  {    
    text="Ошибка при покупки ордера тип ошибки = " + BuyResult.msg;
    sheet.getRange("L"+(infoStep+1)).setValue(text);  infoStep++;
  }  
  if (telegramm=="ВКЛ")
  {
    sendMessage(text);
  }
  sheet.getRange("O2").setValue(infoStep);
}



////////////////////////////////////////////////
//////////////формирование цены и количество для биржы binance
function BinanceTradingViewPriceCount(Type,pair,count,price,infoAllPair,ticker,priceTypeBuy,priceTypeSell,countProcentBuy,countProcentSell,countTypeBuy,countTypeSell)
{  
  var num;
  for (var i =0; i<10000; i++)
  {
    if (infoAllPair.symbols[i].symbol==pair)
    { 
      num=i;
      i=100000;
    }
  }
  var tickSize = infoAllPair.symbols[num].filters[0].tickSize;
  var stepSize=infoAllPair.symbols[num].filters[1].stepSize;
  var minNotional=infoAllPair.symbols[num].filters[2].minNotional;
  Logger.log(minNotional)
  var type=Type.toUpperCase();
  var tS = (tickSize.indexOf(1)*1)-1;  
  var stS=  (stepSize.indexOf(1)*1)-1;
  Logger.log(stepSize)
  var orderType="LIMIT";
  var resu = BinancePriceCreatTradingview(Type,priceTypeBuy,price,ticker,orderType,priceTypeSell,tS,tickSize)
  price=resu[0];
  orderType=resu[1];
  if ((countTypeSell=="custom")||(countTypeBuy=="custom"))
  {
    count = (count*1);
  }
  count=BinanceCountCreatTradingview(countTypeBuy,countTypeSell,pair,infoAllPair,Type,count,countProcentBuy,countProcentSell,price,stS,stepSize);
  var res = [];
  res[0]=type;
  res[1]=price;
  res[2]=count;
  res[3]=orderType;
  return res;
}
////////////////////////////////
///////////////формирование количество для binance
function BinanceCountCreatTradingview(countTypeBuy,countTypeSell,pair,infoAllPair,Type,count,countProcentBuy,countProcentSell,price,stS,stepSize)
{
  var bal = BinanceAllDepo(pair,infoAllPair)
  if (Type=="buy")
  {
    if (countTypeBuy=="%balance")
    {     
      count= ((bal[2]*1)*(((countProcentBuy*1)/100)))/price; 
    }
    else if (countTypeBuy=="all")
    {
      var bal = BinanceAllDepo(pair,infoAllPair)
      count=(bal[2]*1)/price;
    }
  }
  else if (Type=="sell")
  {
    if (countTypeSell=="%balance")
    {
      
      count= ((bal[1]*1)*(((countProcentSell*1)/100)));
      Logger.log("s="+count)
      
    }
    else if (countTypeSell=="all")
    {
      count=(bal[1]*1);
    }
  }


  
  if (Type=="sell")
  {
    if (countTypeSell!="custom")
    {
      count=(count*0.998);
    }
  }
  else if (Type=="buy")
  {
    if(countTypeBuy!="custom")
    {
      count=(count*0.998);
    }
  }
  Logger.log("количество="+count)
  count=((count*1)+0.000000001);
  count=((count*1)-(count%stepSize));
  Logger.log("количество="+count)
  count=count.toFixed(stS);
  Logger.log("количество="+count)
  return count;
}
////////////////////////
////////////формирование цены для binance 
function BinancePriceCreatTradingview(Type,priceTypeBuy,price,ticker,orderType,priceTypeSell,tS,tickSize)
{
  if (Type=="buy")
  {
    if (priceTypeBuy=="bid")
    {
      price = (ticker.bidPrice*1)
    }
    else if (priceTypeBuy=="ask")
    {
      price=(ticker.askPrice*1);
      
    }
    else if (priceTypeBuy=="custom")
    {
      price = price;
    }
    else if (priceTypeBuy=="market")
    {
      orderType = "MARKET";
      price=ticker.askPrice*1;
    }
  }
  else if (Type=="sell")
  {
    if (priceTypeSell=="bid")
    {
      price = (ticker.bidPrice*1)
    }
    else if (priceTypeSell=="ask")
    {
      price=(ticker.askPrice*1);
    }
    else if (priceTypeSell=="custom")
    {
      price = price;
    }
    else if (priceTypeSell=="market")
    {
      orderType = "MARKET";
      price=ticker.bidPrice*1
    }
  }
  price = (price*1)-(price%tickSize);
  price=price.toFixed(tS);
  var res=[];
  res[0]=price;
  res[1]= orderType;
  Logger.log("цена = "+price)
  return res;
}



///////////////////////////////
/////////////фильтр валют для бинанс
function BinanceFiltr(filtr,proverka,filtrPair,pair)
{
  if (filtr=="ВКЛ")
  {
    proverka=0;
    for (var j = 0; j <15000; j++)
    {
      if (filtrPair[j]==null)
      {
        j=150000;
      }
      else if ((filtrPair[j]!=null))
      {
        if (pair==filtrPair[j])
        {
          proverka=1;
          j=150000;
        }
      }
    }
  }
  return proverka;
}