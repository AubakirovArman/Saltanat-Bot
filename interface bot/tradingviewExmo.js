//////////////////////////////
/////////////////exmo
function ExmoTradingviewCreat(Type ,pair ,priceTypeBuy,priceTypeSell,countProcentBuy,countProcentSell,countTypeBuy,countTypeSell, count ,price,telegramm)
{
  if (Type.toLowerCase()=="buy")
  {
    var listAnswer = [];
    listAnswer = ExmoTradingViewPriceCount(Type ,pair ,priceTypeBuy ,countTypeBuy, count ,countProcentBuy,price);
    Type= listAnswer[0];
    price=listAnswer[1];
    count=listAnswer[2];
    TradingviewExmoOrderCreat(pair,count,price,Type.toLowerCase(),telegramm)
  }
  else if (Type.toLowerCase()=="sell")
  {
  var listAnswer = [];
    listAnswer = ExmoTradingViewPriceCount(Type ,pair ,priceTypeSell , countTypeSell , count ,countProcentSell,price);
    Type= listAnswer[0];
    price=listAnswer[1];
    count=listAnswer[2];
    TradingviewExmoOrderCreat(pair,count,price,Type.toLowerCase(),telegramm)
  }
              
}
//////////////////////////////////////////////////
///////////формирование цены и количесво для биржы exmo
function ExmoTradingViewPriceCount(Type ,pair ,priceType , countType , count ,countProcent,price)
{  
  
  var ticker = ExmoOrderBook(pair)
  var type=Type;
  
  var res= ExmoPriceCheckTradingview(Type,priceType,ticker,pair,price,type);
  price=res[0];
  type=res[1];
  ///////////////////////////////// формирование количества 
  
  if (countType=="custom")
  {
    count = count*1;
  }
  else if (countType=="%balance")
  {
    var bal = balanceExmoBot(pair);
    if (Type=="buy")
    {
      count= ((bal[3]*1)*(((countProcent*1)/100)))/price;
    }
    else if (Type=="sell")
    {
      count= (bal[2]*1)*(((countProcent*1)/100));
    }
  }
  else if (countType=="all")
  {
    var bal = balanceExmoBot(pair);
    if (Type=="buy")
    {
      count= (bal[3]*1)/price;
    }
    else if (Type=="sell")
    {
      count= (bal[2]*1);
    }
  }
  var res = [];
  res[0]=type;
  res[1]=price;
  res[2]=count;
  return res;
}
/////////////////////////
///////////////формирование цены для биржы exmo
function ExmoPriceCheckTradingview(Type,priceType,ticker,pair,price,type)
{
if (Type=="buy")
  {
    if (priceType=="bid")
    {
      price = (ticker[pair].bid_top*1)+0.00000001;
    }
    else if (priceType=="ask")
    {
      price=(ticker[pair].ask_top*1)-0.00000001;
    }
    else if (priceType=="custom")
    {
      price = price;
    }
    else if (priceType=="market")
    {
      type="market_buy";
      price = (ticker[pair].bid_top*1)+0.00000001;
    }
  }
  else if (Type=="sell")
  { 
    if (priceType=="bid")
    {
      price = (ticker[pair].bid_top*1)+0.00000001;
    }
    else if (priceType=="ask")
    {
      price = (ticker[pair].ask_top*1)-0.00000001
    }
    else if (priceType=="custom")
    {
      price = price;
    }
    else if (priceType=="market")
    {
      type="market_sell";
      price = (ticker[pair].bid_top*1)+0.00000001;
    }
  }
  
  var res=[];
  res[0]=price;
  res[1]=type;
  return res;
}
/////////////////////////////
/////создание ордера 
function TradingviewExmoOrderCreat(pair,count,price,type,telegramm)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("tradingview");
  var number = sheet.getRange("O1").getValue(); 
  var infoStep = sheet.getRange("O2").getValue(); 
  var orderRes = ExmoOrderCreat(pair,count,price,type);
  var text1;
  if (orderRes.result)
  {   
    number++;
    sheet.getRange("H1").setValue(number); 
    sheet.getRange("A"+(number+1)).setValue("Exmo");
    sheet.getRange("B"+(number+1)).setValue(pair);
    sheet.getRange("C"+(number+1)).setValue(count);
    sheet.getRange("D"+(number+1)).setValue(price); 
    sheet.getRange("F"+(number+1)).setValue(type); 
    sheet.getRange("E"+(number+1)).setValue((count*price).toFixed(8)); 
    sheet.getRange("G"+(number+1)).setValue("0"); 
    sheet.getRange("L"+(number+1)).setValue(orderRes.order_id);
    sheet.getRange("L"+(infoStep+1)).setValue("Ордер создан валюта = "+pair);     infoStep++;
    sheet.getRange("L"+(infoStep+1)).setValue("Цена ="+price);        infoStep++;          
    sheet.getRange("L"+(infoStep+1)).setValue("Количество ="+ count);         infoStep++;    
    sheet.getRange("L"+(infoStep+1)).setValue("тип ордера ="+ type);         infoStep++;   
    text1 = "Ордер по оповещению tradingview создан id ордера ="+orderRes.order_id;  
    sheet.getRange("L"+(infoStep+1)).setValue(text1);  infoStep++;
    
  }
  else if (!orderRes.result)
  {
    text1 = "Ордер по оповещению tradingview  не создан ошибка ="+orderRes.error;
    sheet.getRange("L"+(infoStep+1)).setValue(text1);  infoStep++;
  }
  if (telegramm=="ВКЛ")
  {
    sendMessage(text1);
  }
  sheet.getRange("O2").setValue(infoStep);
}





