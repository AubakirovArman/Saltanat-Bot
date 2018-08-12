function tradingview() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("tradingview");
  var status = sheet.getRange("I2").getValue();
  var lastDate = sheet.getRange("J2").getValue();
  var lastId = sheet.getRange("K2").getValue();
  var infoStep = sheet.getRange("K4").getValue(); 
  TradingviewClear(infoStep);
  
  var firstThread = GmailApp.search("Оповещение TradingView: <noreply@tradingview.com>")
  if (status=="ВЫКЛ")
  {
    if (firstThread[0]==null)
    {
      sheet.getRange("J2").setValue("0");
      sheet.getRange("K2").setValue("0");
    }
    else if (firstThread[0]!=null)
    {
      sheet.getRange("J2").setValue(firstThread[0].getLastMessageDate());
      sheet.getRange("K2").setValue(firstThread[0].getId());
      sheet.getRange("L2").setValue(firstThread[0].getLastMessageDate());
    }
  }
  else if (status=="ВКЛ")
  {
    if (firstThread[0]!=null)
    {     
      
      if ((firstThread[0].getLastMessageDate().toString()!=lastDate.toString() )&&(firstThread[0].getId().toString()!=lastId.toString()))
      { 
        var mailCount = firstThread.length;
        for (var i = 0; i<mailCount; i++)
        {
          if ((firstThread[i].getLastMessageDate().toString()!=lastDate.toString() )&&(firstThread[i].getId().toString()!=lastId.toString()))
          {
            ss = firstThread[i].getFirstMessageSubject()
            var nuType = ss.indexOf("t=");           var nuPair = ss.indexOf("pa=");  
            
            var market =  sheet.getRange("M6").getValue();
            var Type = ss.substring((nuType+2),nuPair);
            var pair = ss.substring((nuPair+3));
            var priceType = sheet.getRange("M7").getValue();
            var price = sheet.getRange("M8").getValue();
            var countType = sheet.getRange("M9").getValue();
            var count = sheet.getRange("M10").getValue();
            var countProcent = sheet.getRange("M11").getValue();
            if (market=="EXMO")
            {
              var listAnswer = [];
              listAnswer = ExmoTradingViewPriceCount(Type ,pair ,priceType , countType , count ,countProcent,price);
              Type= listAnswer[0];
              price=listAnswer[1];
              count=listAnswer[2];
              Logger.log("++++"+pair+" count = "+count+"   price"+price+ "   type"+Type)
              TradingviewExmoOrderCreat(pair,count,price,Type.toLowerCase())
            }
            else if (market=="Binance")
            {
              var infoAllPair = BinanceExchangeInfo(); 
              var listAnswer = [];
              listAnswer = BinanceTradingViewPriceCount(Type,pair,priceType,countType,count,countProcent,price,infoAllPair)
              var side = listAnswer[0];
              price=listAnswer[1];
              var quantity =listAnswer[2];
              Type=listAnswer[3];
              var symbol =pair;
              Logger.log("++++"+listAnswer)
              TradingviewBinanceOrderCreat(symbol,quantity,price,Type,side,infoAllPair)
              
            }
          }
          else 
          {
            i=mailCount+1;
          }
        }
        sheet.getRange("J2").setValue(firstThread[0].getLastMessageDate());
        sheet.getRange("K2").setValue(firstThread[0].getId());
      }
    }
  }
  var countOrder = sheet.getRange("H1").getValue();
  if (countOrder>0)
  {
    for (var i=1;i<=countOrder; i++)
    {
      var statusOrder = sheet.getRange("F"+(i+1)).getValue();
      var OrderId = sheet.getRange("G"+(i+1)).getValue();
      var count1 = sheet.getRange("C"+(i+1)).getValue();
      var pair = sheet.getRange("B"+(i+1)).getValue();
      var market= sheet.getRange("A"+(i+1)).getValue();
      if (statusOrder!="0")
      {
        TradingViewCheckOrder(OrderId,count1,i,pair,market)
      }          
    }
    
  }
}
///////////////////////
////////проверка ордера
function TradingViewCheckOrder(OrderId,count,i,pair,market)
{ 
  if (market=="Exmo")
  {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("tradingview");
    var res = ExmoOrderTrades(OrderId);
    var text ="";
    if (res.result==false)
    {
      text = "Ордер не испольнен"
    }
    else if (res.result==null)
    { 
      var outAmount = res.out_amount;
      if (outAmount>=count)
      {
        text = "Ордер испольнен";
        sendMessage("Tradingview ордер из списка под №"+i+"%0A"+text)
        
      }
      else if (outAmount<count)
      {
        text = "Ордер испольнен частично";
        
      }
    }
  }
  else if (market=="Binance ")
  {
    var res = BinanceOrderInfo(pair,OrderId)
    
    if (res.msg!=null)
    {
      text = "Ошибка "+res.msg;
      sheet.getRange("A"+(infoStep+19)).setValue(text);
      infoStep++;
    }
    else if (res.executedQty!=null)
    {
      if (res.executedQty==res.origQty)
      {
        text =  "Ордер испольнен польностью"
      }
      else if (res.executedQty=="0.00000000")
      {
        text = "Ордер не испольнен"
      }
      else if ((res.executedQty>"0.00000000")&&(res.executedQty<res.origQty))
      {
        text = "Ордер испольнен частично"
      }
    }
  }
  sheet.getRange("F"+(i+1)).setValue(text);
}
////////////////
////// очистка табло 
function TradingviewClear(infoStep)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("tradingview");
  var number = sheet.getRange("K4").getValue(); 
  if (infoStep>=15)
  {
    for (var i=5; i<=(number+5);i++)
    {
      sheet.getRange("H"+i).setValue("");
    }
  }
}
/////////////////////////////
/////создание ордера 
function TradingviewBinanceOrderCreat(symbol,quantity,price,type,side,infoAllPair )
{
  price=BinancePriceCheck(symbol,price,infoAllPair);
  quantity=BinanceCountCheck(symbol,quantity,infoAllPair);
  var text;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("tradingview");
  var number = sheet.getRange("H1").getValue(); 
  var infoStep = sheet.getRange("K4").getValue(); 
  //////////////////
  var BuyResult = BinanceCreatOrder(symbol,side,type,"GTC",quantity,price,"ACK","");
  if (BuyResult.orderId!=null)
  {  
    number++;
    sheet.getRange("H1").setValue(number); 
    sheet.getRange("A"+(number+1)).setValue("Binance");
    sheet.getRange("B"+(number+1)).setValue(symbol);
    sheet.getRange("C"+(number+1)).setValue(quantity);
    sheet.getRange("D"+(number+1)).setValue(price); 
    sheet.getRange("E"+(number+1)).setValue(side); 
    sheet.getRange("F"+(number+1)).setValue("0"); 
    sheet.getRange("G"+(number+1)).setValue(BuyResult.orderId);
    
    
    sheet.getRange("H"+(infoStep+5)).setValue("Ордер создан валюта = "+symbol);     infoStep++;
    sheet.getRange("H"+(infoStep+5)).setValue("Цена ="+price);        infoStep++;          
    sheet.getRange("H"+(infoStep+5)).setValue("Количество ="+ quantity);         infoStep++;    
    sheet.getRange("H"+(infoStep+5)).setValue("тип ордера ="+ side);         infoStep++;   
    sheet.getRange("H"+(infoStep+5)).setValue("тип ="+ type);         infoStep++;  
    text = "Ордер по оповещению tradingview создан id ордера ="+BuyResult.orderId;  
    sheet.getRange("H"+(infoStep+5)).setValue(text);  infoStep++;
  }
  else if (BuyResult.msg!=null)
  {    
    text="Ошибка при покупки ордера тип ошибки = " + BuyResult.msg;
    sheet.getRange("H"+(infoStep+5)).setValue(text);  infoStep++;
  }  
  sendMessage(text);
  sheet.getRange("K4").setValue(infoStep);
}



////////////////////////////////////////////////
//////////////формирование цены и количество для биржы binance
function BinanceTradingViewPriceCount(Type,pair,priceType,countType,count,countProcent,price,infoAllPair)
{  
  
  var ticker = BinanceTickerBookTicker(pair)
  var type=Type.toUpperCase();
  var orderType="LIMIT";
  if (Type=="buy")
  {
    if (priceType=="топ значения в стакане")
    {
      price = (ticker.bidPrice*1)+0.00000001
    }
    else if (priceType=="средняя цена по стакану")
    {
      price=((ticker.bidPrice*1)+(ticker.askPrice*1))/2;
    }
    else if (priceType=="ручной ввод")
    {
      price = price;
    }
    else if (priceType=="продать по цене биржы")
    {
      orderType = "MARKET";
      price= 1;
    }
  }
  else if (Type=="sell")
  {
    if (priceType=="топ значения в стакане")
    {
      price = (ticker.askPrice*1)-0.00000001
    }
    else if (priceType=="средняя цена по стакану")
    {
      price=((ticker[pair].bid_top*1)+(ticker[pair].ask_top*1))/2;
    }
    else if (priceType=="ручной ввод")
    {
      price = price;
    }
    else if (priceType=="продать по цене биржы")
    {
      orderType = "MARKET";
      price=((ticker[pair].bid_top*1)+(ticker[pair].ask_top*1))/2;
    }
  }

  if (countType=="ручной ввод")
  {
    count = count*1;
  }
  else if (countType=="процент от баланса")
  {
    
    var bal = BinanceAllDepo(pair,infoAllPair)
    if (Type=="buy")
    {
      count= ((bal[2]*1)*(((countProcent*1)/100)))/price;
    }
    else if (Type=="sell")
    {
      count= (bal[1]*1)*(((countProcent*1)/100));
    }
  }
  else if (countType=="весь баланс")
  {
    var bal = BinanceAllDepo(pair,infoAllPair)
    if (Type=="buy")
    {
      count= (bal[2]*1)/price;
    }
    else if (Type=="sell")
    {
      count= (bal[1]*1);
    }
  }
  var res = [];
  res[0]=type;
  res[1]=price;
  res[2]=count;
  res[3]=orderType;
  return res;
}
//////////////////////////////////////////////////
///////////формирование цены и количесво для биржы exmo
function ExmoTradingViewPriceCount(Type ,pair ,priceType , countType , count ,countProcent,price)
{  
  
  var ticker = ExmoOrderBook(pair)
  var type=Type;

  if (Type=="buy")
  {
    if (priceType=="топ значения в стакане")
    {
      price = (ticker[pair].bid_top*1)+0.00000001
    }
    else if (priceType=="средняя цена по стакану")
    {
      price=((ticker[pair].bid_top*1)+(ticker[pair].ask_top*1))/2;
    }
    else if (priceType=="ручной ввод")
    {
      price = price;
    }
    else if (priceType=="продать по цене биржы")
    {
      type="market_buy";
      price= 1;
    }
  }

  else if (Type=="sell")
  {    Logger.log(Type)
    if (priceType=="топ значения в стакане")
    {
      price = (ticker[pair].ask_top*1)-0.00000001
    }
    else if (priceType=="средняя цена по стакану")
    {
      price=((ticker[pair].bid_top*1)+(ticker[pair].ask_top*1))/2;
      Logger.log(price)
    }
    else if (priceType=="ручной ввод")
    {
      price = price;
    }
    else if (priceType=="продать по цене биржы")
    {
      type="market_sell";
      price= ((ticker[pair].bid_top*1)+(ticker[pair].ask_top*1))/2;
    }
  }
  ///////////////////////////////// формирование количества 
  if (countType=="ручной ввод")
  {
    count = count*1;
  }
  else if (countType=="процент от баланса")
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
  else if (countType=="весь баланс")
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

/////////////////////////////
/////создание ордера 
function TradingviewExmoOrderCreat(pair,count,price,type)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("tradingview");
  var number = sheet.getRange("H1").getValue(); 
  var infoStep = sheet.getRange("K4").getValue(); 
  var orderRes = ExmoOrderCreat(pair,count,price,type);
  Logger.log(orderRes)
  var text1;
  if (orderRes.result)
  {   
    number++;
    sheet.getRange("H1").setValue(number); 
    sheet.getRange("A"+(number+1)).setValue("Exmo");
    sheet.getRange("B"+(number+1)).setValue(pair);
    sheet.getRange("C"+(number+1)).setValue(count);
    sheet.getRange("D"+(number+1)).setValue(price); 
    sheet.getRange("E"+(number+1)).setValue(type); 
    sheet.getRange("F"+(number+1)).setValue("0"); 
    sheet.getRange("G"+(number+1)).setValue(orderRes.order_id);
    
    
    sheet.getRange("H"+(infoStep+5)).setValue("Ордер создан валюта = "+pair);     infoStep++;
    sheet.getRange("H"+(infoStep+5)).setValue("Цена ="+price);        infoStep++;          
    sheet.getRange("H"+(infoStep+5)).setValue("Количество ="+ count);         infoStep++;    
    sheet.getRange("H"+(infoStep+5)).setValue("тип ордера ="+ type);         infoStep++;   
    text1 = "Ордер по оповещению tradingview создан id ордера ="+orderRes.order_id;  
    sheet.getRange("H"+(infoStep+5)).setValue(text1);  infoStep++;
    
  }
  else if (!orderRes.result)
  {
    text1 = "Ордер по оповещению tradingview  не создан ошибка ="+orderRes.error;
    sheet.getRange("H"+(infoStep+5)).setValue(text1);  infoStep++;
  }
  sendMessage(text1);
  sheet.getRange("K4").setValue(infoStep);
}
