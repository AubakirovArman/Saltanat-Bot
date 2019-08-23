/////////////////////////
////////////// очистить логи 
function clearLogList()
{
  var ss2 = SpreadsheetApp.getActiveSpreadsheet();    
  var sheet = ss2.getSheetByName("log");    
  var count = sheet.getRange("A1").getValue();
  sheet.getRange("A1").setValue(0);
  for (var i=1; i<=count; i++)
  {
    sheet.getRange("B"+(i+1)).setValue("");
    sheet.getRange("C"+(i+1)).setValue("");
    sheet.getRange("D"+(i+1)).setValue("");
    sheet.getRange("E"+(i+1)).setValue("");
    sheet.getRange("F"+(i+1)).setValue("");
    sheet.getRange("G"+(i+1)).setValue("");
    sheet.getRange("H"+(i+1)).setValue("");
    sheet.getRange("I"+(i+1)).setValue("");
    sheet.getRange("J"+(i+1)).setValue("");
    sheet.getRange("K"+(i+1)).setValue("");
  }
}

////////////////////////////
////////////очистить список 
function clearListTradingview()
{
  var ss2 = SpreadsheetApp.getActiveSpreadsheet();    
  var sheet = ss2.getSheetByName("log");    
  var count = sheet.getRange("T1").getValue();
  sheet.getRange("T1").setValue(0);
  for (var i=1; i<=count; i++)
  {
    sheet.getRange("U"+(i+1)).setValue("");
    sheet.getRange("V"+(i+1)).setValue("");
    sheet.getRange("W"+(i+1)).setValue("");
    sheet.getRange("X"+(i+1)).setValue("");
    sheet.getRange("Y"+(i+1)).setValue("");
  }
}
////////////////////////////////
///////////основной
function tradingview() {
  var ss2 = SpreadsheetApp.getActiveSpreadsheet();    var sheet = ss2.getSheetByName("tradingview");    var status = sheet.getRange("J1").getValue();  var lastDate = sheet.getRange("O3").getValue();
  var lastId = sheet.getRange("O4").getValue();  var infoStep = sheet.getRange("O2").getValue();   var filtr = sheet.getRange("J4").getValue();   var filtrPair = [];  var proverka;   filtrPair = sheet.getRange("J5").getDataValidation().getCriteriaValues()[0];
    var firstThread = GmailApp.search("TradingView <noreply@tradingview.com>")
  if (infoStep >=17)
  {TradingviewClear(infoStep); }
  ///////////////////
  if (status=="ВЫКЛ")
  {
    if (firstThread[0]==null)
    {
      sheet.getRange("O3").setValue("0");      sheet.getRange("O4").setValue("0");
    }
    else if (firstThread[0]!=null)
    {
      sheet.getRange("O3").setValue(firstThread[0].getLastMessageDate());     sheet.getRange("O4").setValue(firstThread[0].getId());
    }
  }
  else if (status=="ВКЛ")
  {
    if (firstThread[0]!=null)
    {     

      if ((firstThread[0].getLastMessageDate()!=lastDate.toString()))
      { 
        var market =  sheet.getRange("J3").getValue();          var telegramm = sheet.getRange("J2").getValue();         var mailCount = firstThread.length;
        if (market=="Binance")
        { 
          var infoAllPair = BinanceExchangeInfo(); 
        }
        for (var i = 0; i<mailCount; i++)
        {
          Logger.log("skolkoraz="+i)
          proverka =1;
          if ((firstThread[i].getLastMessageDate()!=lastDate.toString()))
          {
            ss = firstThread[i].getFirstMessageSubject()
            Logger.log(ss)
            var nuType = ss.indexOf("t=");                         var nuPair = ss.indexOf("pa=");          
            var tochka=ss.indexOf(".");        var Type = ss.substring((nuType+2),nuPair);  var pair = ss.substring((nuPair+3),tochka);
            var priceTypeBuy = sheet.getRange("K7").getValue();    var priceTypeSell = sheet.getRange("J7").getValue();   var price = sheet.getRange("J8").getValue();              var countTypeBuy = sheet.getRange("K9").getValue();
            var countTypeSell = sheet.getRange("J9").getValue();   var count = sheet.getRange("J10").getValue();          var countProcentBuy = sheet.getRange("K11").getValue();   var countProcentSell = sheet.getRange("J11").getValue();
            
            if (market=="EXMO")
            {
              ExmoTradingviewCreat(Type ,pair ,priceTypeBuy,priceTypeSell,countProcentBuy,countProcentSell,countTypeBuy,countTypeSell, count ,price,telegramm);
            }
            else if (market=="Binance")
            {
             BinanceOsnovnoiTradingview(filtr,proverka,filtrPair,pair,Type,count,price,infoAllPair,priceTypeBuy,priceTypeSell,countProcentBuy,countProcentSell,countTypeBuy,countTypeSell,telegramm);
            }
            
          }
          else if (firstThread[i].getId().toString()==lastId.toString())
          {
            Logger.log("sovpal="+i);
            i=mailCount+1000000;
            sheet.getRange("O3").setValue(firstThread[0].getLastMessageDate());  sheet.getRange("O4").setValue(firstThread[0].getId());
          }
          firstThread[i].moveToTrash();
        }
        sheet.getRange("O3").setValue(firstThread[0].getLastMessageDate());  sheet.getRange("O4").setValue(firstThread[0].getId());
        
      }
      else if (firstThread[0].getId().toString()==lastId.toString())
      {
        /////BinanceExmoTradingviewAllOrderCheck(sheet,infoStep)
      }
    } 
  }
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
function TradingviewClear(infoStep)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("tradingview");
  var number = sheet.getRange("O2").getValue(); 
  if (infoStep>=15)
  {
    for (var i=2; i<=100;i++)
    {
      sheet.getRange("L"+i).setValue("");
    }
  }
  sheet.getRange("O2").setValue(1)
}
















