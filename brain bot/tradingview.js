function infoAllP(ss2,pair)
{
  var sheet = ss2.getSheetByName("setting"); 
  var count= sheet.getRange("E3").getValue();
  count=(count*1)+1;
  var res = [];
  for (var i=2; i<=count;i++)
  {
    var pa= sheet.getRange("G"+i).getValue();
    if (pa == pair)
    {
      res[0]=pair; //pair
      res[1]=sheet.getRange("H"+i).getValue();  //status
      res[2]=sheet.getRange("I"+i).getValue();  //minPrice
      res[3]=sheet.getRange("J"+i).getValue();  //maxPrice
      res[4]=sheet.getRange("K"+i).getValue();  //tickSize
      res[5]=sheet.getRange("L"+i).getValue();  //minQt
      res[6]=sheet.getRange("M"+i).getValue();  //maxQt
      res[7]=sheet.getRange("N"+i).getValue();  //stepSize
      res[8]=sheet.getRange("O"+i).getValue();  //minNotional
      res[9]=sheet.getRange("P"+i).getValue();  //baseAssetl
      res[10]=sheet.getRange("Q"+i).getValue();  //quoteAsset
      i=count*2;
    }
  }
  Logger.log("infoallpair="+res);
  return res;
}
////////////////////////////////
///////////основной
function tradingview(ss2,ss,logi,countLog)
{
  var sheet= ss2.getSheetByName("tradingview"); 
  var sheet1 =ss2.getSheetByName("Config");  
  var infoStep = sheet.getRange("R2").getValue();     
  var filtrPair = [];   
  var proverka;  
  if (infoStep >=20)
  {
    TradingviewClear(infoStep,sheet); 
  }
  ///////////////////
  var telegramm = "ВЫКЛ";
  proverka =1;
  var nuType = ss.indexOf("t=");                         
  var nuPair = ss.indexOf("pa=");      
  var filClient=  ss.substring(nuType); 
  var tochka=ss.indexOf(".");
  var Type = ss.substring((nuType+2),nuPair);
  var pair = ss.substring((nuPair+3),tochka);
  var resu1=TradingviewfiltrClient(ss,ss2,tochka,pair);
  var filProv=resu1[0];
  if (filProv==1)
  { 
    var infoAllPair = infoAllP(ss2,pair); 
    var setting1 = resu1[1];
    filtrPair = sheet1.getRange("H"+resu1[3]).getDataValidation().getCriteriaValues()[0];
    var market= setting1[1]; 
    var filtr =  setting1[2];  
    var priceTypeSell = setting1[3];
    var priceTypeBuy = setting1[4];    
    var priceSell = setting1[5];  
    var countTypeSell =setting1[6];
    var countTypeBuy = setting1[7];
    var countSell = setting1[8];    
    var countBuy = setting1[9];    
    var countProcentSell = setting1[10];   
    var countProcentBuy =  setting1[11];  
    var priceBuy =setting1[12];  
    if (market=="Binance")
    {
      BinanceOsnovnoiTradingview(filtr,proverka,filtrPair,pair,Type,countSell,priceSell,infoAllPair,priceTypeBuy,priceTypeSell,countProcentBuy,countProcentSell,countTypeBuy,countTypeSell,telegramm,sheet,resu1[4],countBuy,priceBuy,logi,countLog);
    }
  }
  else if (filProv==0)
  {
    logi.getRange("D"+(countLog+1)).setValue(new Date());
    logi.getRange("F"+(countLog+1)).setValue("Данная заявка не может быть обработана");
    logi.getRange("G"+(countLog+1)).setValue("так как выключена торговля по данной паре");
    sheet.getRange("O"+(infoStep+1)).setValue("Данная заявка не может быть обработана");     infoStep++;
    sheet.getRange("O"+(infoStep+1)).setValue("так как выключена торговля по данной паре");     infoStep++;
    sheet.getRange("R2").setValue(infoStep);
  }
  else if (filProv==2)
  {
    logi.getRange("F"+(countLog+1)).setValue("Данная заявка не может быть обработана");
    logi.getRange("G"+(countLog+1)).setValue("так как такого идентификатора нету");
    logi.getRange("D"+(countLog+1)).setValue(new Date());
    sheet.getRange("O"+(infoStep+1)).setValue("Данная заявка не может быть обработана");     infoStep++;
    sheet.getRange("O"+(infoStep+1)).setValue("так как такого идентификатора нету");     infoStep++;
    sheet.getRange("R2").setValue(infoStep);
  }
  else if (filProv==3)
  {
    logi.getRange("F"+(countLog+1)).setValue("Это являеться сигналом для телеграмм канала");
    logi.getRange("G"+(countLog+1)).setValue("Сигнал для телеграмм канала");
    logi.getRange("D"+(countLog+1)).setValue(new Date());
    sheet.getRange("O"+(infoStep+1)).setValue("Это являеться сигналом для телеграмм канала");     infoStep++;
    sheet.getRange("R2").setValue(infoStep);
    var date = new Date();
    var pri =BinanceTickerBookTicker(pair);
    var price;
    if (Type.toLowerCase()=="sell")
    {
      price=pri.askPrice;
    }
    else if (Type.toLowerCase()=="buy")
    {
      price=pri.bidPrice;
    }
    var text = "Время = "+date+"%0A"+"Валюта = "+pair +"%0A"+ "Тип ордера = " + Type+"%0A"+"Цена = "+price ;
    sendMessage(text);
  }
}
function dddsd()
{
  var date = new Date();

// Wed Feb 17 13:00:00 GMT-08:00 2018
Logger.log(date);
}

/////
///фильтр клиента 
function TradingviewfiltrClient(ss,ss2,tochka,pair)
{
  var sheet = ss2.getSheetByName("tradingview");  
  var sheet1 =ss2.getSheetByName("Config")
  var id=ss.substring(tochka+1);
  var UserCount = sheet1.getRange("B1").getValue();
  var res = searcIdTradingview(UserCount,sheet1,id)
  var proverka =0;
  var resu=[];
  var setting=[];
  if (res!=0)
  {
    proverka=1;
    var pairSetting=sheet1.getRange("H"+res).getDataValidation().getCriteriaValues()[0];
    resu[2]=pairSetting; //фильтр валютных пар
    resu[3]=res; // ид идентификатора
    sheet1.getRange("A1").setValue(res); 
    var BotSet=uploadBinancePairSetting(pair,sheet1)
    if (BotSet[0]=="ВЫКЛ")
    {
      proverka =0;
    }
    resu[4]=id;
    resu[1]=BotSet;
  }
  else if (res==0)
  {
    proverka = 2;
    if (id=="signal")
    {
      proverka=3;
    }
  }
  resu[0]=proverka;
  return resu
}

/////////////////////////////////////
//////////////настройки заливка 
function uploadBinancePairSetting(pair,sheet1)
{
  var num=0
  var setting1=[]
  for (var i =2; i<5000; i++)
  {
    if (sheet1.getRange("I"+i).getValue()==pair)
    {
      num=i
      i=5001
    }
  }
  setting1[0]=sheet1.getRange("J"+num).getValue();
  setting1[1]="Binance";
  setting1[2]=sheet1.getRange("L"+num).getValue();
  setting1[3]=sheet1.getRange("M"+num).getValue();
  setting1[4]=sheet1.getRange("N"+num).getValue();    
  setting1[5]=sheet1.getRange("O"+num).getValue();
  setting1[6]=sheet1.getRange("P"+num).getValue();
  setting1[7]=sheet1.getRange("Q"+num).getValue();
  setting1[8]=sheet1.getRange("R"+num).getValue();  
  setting1[9]=sheet1.getRange("S"+num).getValue();
  setting1[10]=sheet1.getRange("T"+num).getValue();  
  setting1[11]=sheet1.getRange("U"+num).getValue();
  setting1[12]=sheet1.getRange("V"+num).getValue();
  return setting1
}
///////////////////////////////
///////////////////поиск позиции ид пользователя 
function searcIdTradingview(UserCount,sheet1,id)
{
  var listId;
  var Clientpo = 0;
  for (var i =0;i<UserCount;i++)
  {
    listId= sheet1.getRange("F"+((i*1)+2)).getValue();
    if (listId==id)
    {
      Clientpo=(i*1)+2;
    }
  }
  return Clientpo;
}

///////////////////
////////проверка ордеров сокращенный 
function BinanceExmoTradingviewAllOrderCheck(sheet,infoStep)
{
  var countOrder = sheet.getRange("O1").getValue();
  if (countOrder>0)
  {
    for (var i=1;i<=countOrder; i++)
    {
      var statusOrder = sheet.getRange("G"+(i+1)).getValue();
      var OrderId = sheet.getRange("H"+(i+1)).getValue();
      var count1 = sheet.getRange("C"+(i+1)).getValue();
      var pair = sheet.getRange("B"+(i+1)).getValue();
      var market= sheet.getRange("A"+(i+1)).getValue();
      if (statusOrder!="Ордер испольнен")
      {
        TradingViewCheckOrder(OrderId,count1,i,pair,market,sheet,infoStep)
      }          
    }
    
  }
}
///////////////////////
////////проверка ордера
function TradingViewCheckOrder(OrderId,count,i,pair,market,sheet,infoStep)
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
      if (res.type=="buy")
      {
        var outAmount = res.in_amount;
      }
      else if (res.type=="sell")
      {
        var outAmount = res.out_amount;
      }
      if (outAmount>=count)
      {
        text = "Ордер испольнен";
        sendMessage("Tradingview ордер из списка tradingview под №"+i+"%0A"+text+"%0A"+"Биржа Exmo"+"%0A"+"Order iD ="+OrderId)
        
      }
      else if (outAmount<count)
      {
        text = "Ордер испольнен частично";
      }
    }
  }
  else if (market=="Binance")
  {
    var res = BinanceOrderInfo(pair,OrderId)
    
    if (res.msg!=null)
    {
      text = "Ошибка "+res.msg;
    }
    else if (res.executedQty!=null)
    {
      if (res.executedQty==res.origQty)
      {
        text =  "Ордер испольнен польностью"
        sendMessage("Tradingview ордер из списка tradingview под №"+i+"%0A"+text+"%0A"+"Биржа binance"+"%0A"+"Order iD ="+OrderId)
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
  sheet.getRange("G"+(i+1)).setValue(text);
}
////////////////
////// очистка табло 
function TradingviewClear(infoStep,sheet)
{
  var number = sheet.getRange("R2").getValue(); 
  if (infoStep>=20)
  {
    for (var i=2; i<=100;i++)
    {
      sheet.getRange("O"+i).setValue("");
      sheet.getRange("P"+i).setValue("");
      sheet.getRange("Q"+i).setValue("");
    }
  }
  sheet.getRange("R2").setValue(1)
}

