/////////////////////////////
////////Логика бота
function BinanceBots()
{avtoUpdateFormula();
 var ss = SpreadsheetApp.getActiveSpreadsheet();
 var sheet = ss.getSheetByName("BinanceBots");
 var numberBot = sheet.getRange("D1").getValue();
 if (numberBot>0)
 {
   var infoStep = sheet.getRange("C19").getValue();
   infoProverka(infoStep,"BinanceBots");
   var ping =BinancePing();
   var text="";
   if (ping==null)
   {
     text = "Биржа не доступна возможно идет добавление новых валют"
     sheet.getRange("A"+(infoStep+19)).setValue(text);
     infoStep++;
     sendMessage(text);
   }
   else if (ping!=null)
   {
     var infoAllPair = BinanceExchangeInfo(); 
     var stat = BinanceTicker24hrAll();
     for (var i=1; i<=numberBot;i++)
     {
       
       if (sheet.getRange("L"+(i+1)).getValue()=="ВКЛ")
       {
         var infoStep = sheet.getRange("C19").getValue();               var strategia = sheet.getRange("V"+(i+1)).getValue();      var procentDepoStatus = sheet.getRange("Z"+(i+1)).getValue();   
         var procentDepo = sheet.getRange("AA"+(i+1)).getValue();   var repeatType = sheet.getRange("F"+(i+1)).getValue();     var pair = sheet.getRange("G"+(i+1)).getValue();           
         var count = sheet.getRange("H"+(i+1)).getValue();   
         var profit = sheet.getRange("I"+(i+1)).getValue();         var sr24 = sheet.getRange("J"+(i+1)).getValue();           var allDep = sheet.getRange("K"+(i+1)).getValue();
         var OrderID = sheet.getRange("M"+(i+1)).getValue();        var number = sheet.getRange("N"+(i+1)).getValue();         var price = sheet.getRange("O"+(i+1)).getValue();          
         var OrderCount = sheet.getRange("P"+(i+1)).getValue();     var telega = sheet.getRange("Q"+(i+1)).getValue();         var down =sheet.getRange("R"+(i+1)).getValue();
         var downProcent = sheet.getRange("S"+(i+1)).getValue();   var timer1 =sheet.getRange("T"+(i+1)).getValue();          var timer2 =sheet.getRange("U"+(i+1)).getValue(); 
         ////////////////////////////стратегия римуса конфиг
         var spred = sheet.getRange("W"+(i+1)).getValue();          var lostTime =  sheet.getRange("X"+(i+1)).getValue();      var minVolBtc = sheet.getRange("Y"+(i+1)).getValue(); 
         if (number==1)
         {
           if (strategia =="купи и продай по дороже")
           {
             BinanceBotsStepOne(pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent,infoAllPair,procentDepoStatus,procentDepo)
           }
           else if (strategia == "римус")
           {
             BinanceBotsRimusStepOne(profit,minVolBtc,pair,infoAllPair,stat,i,infoStep,sr24,down,downProcent,allDep,procentDepoStatus,count,procentDepo,telega)
           }
         }
         else if (number==2)
         { 
           if (strategia =="купи и продай по дороже")
           {
             BinanceBotsStepTwo(i,OrderID,infoStep,number,OrderCount,allDep,price,profit,pair,telega,infoAllPair,down,downProcent,procentDepoStatus,procentDepo,timer1,timer2,sr24)
           }
           else if (strategia == "римус")
           {
             BinanceBotsRimusStepTwo(i,OrderID,infoStep,number,OrderCount,allDep,price,profit,pair,telega,infoAllPair,down,downProcent,procentDepoStatus,procentDepo,timer1,timer2,sr24,minVolBtc,stat,lostTime)
           }
         }
         else if (number==3)
         {
           if (strategia =="купи и продай по дороже")
           {
             BinanceBotsStepTri(i,OrderID,infoStep,number,OrderCount,repeatType,telega,pair)
           }
           else if (strategia == "римус")
           {
             BinanceBotsRimusStepTri(i,OrderID,infoStep,number,OrderCount,repeatType,telega,pair,timer1,lostTime,profit,minVolBtc,allDep,sr24,down,downProcent,infoAllPair,procentDepoStatus,procentDepo,stat)
           }
         }
       }
     }
   }
 }
}
///////////////////////////
////////////////////////////шаг третии стратегии римуса 
function BinanceBotsRimusStepTri(i,OrderID,infoStep,number,OrderCount,repeatType,telega,pair,timer1,lostTime,profit,minVolBtc,allDep,sr24,down,downProcent,infoAllPair,procentDepoStatus,procentDepo,stat)
{  
  var time = Number(new Date().getTime()/1000).toFixed(0);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BinanceBots");
  var count =OrderCount;   var text = "";   var text1 = "";
  var res = BinanceOrderInfo(pair,OrderID);
  sheet.getRange("A"+(infoStep+19)).setValue("Бот под номером №"+i);    infoStep++;
  if (res.msg!=null)
  {
    text = "Ошибка "+res.msg;
    sheet.getRange("A"+(infoStep+19)).setValue(text);      infoStep++;
  }
  else if (res.executedQty!=null)
  {
    if (res.executedQty==res.origQty)
    {
      text =  "Ордер испольнен польностью"
      sheet.getRange("A"+(infoStep+19)).setValue(text);        infoStep++;
      if (telega=="Только ордера")
      {
        sendMessage("Бот под номером №"+i+"%0A"+text)
      }
      if (repeatType=="цикл")
      {
        sheet.getRange("N"+(i+1)).setValue(1);
      }
      else if (repeatType=="Один раз")
      {
        sheet.getRange("N"+(i+1)).setValue(1);
        sheet.getRange("L"+(i+1)).setValue("ВЫКЛ");
      }
    }
    else if (res.executedQty=="0.00000000")
    {
      text = "Ордер не испольнен"
      sheet.getRange("A"+(infoStep+19)).setValue(text);
      infoStep++;
      if (time>=timer1)
      {
        BinanceCancelOrderBotsRimuxTri(profit,minVolBtc,pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent,infoAllPair,procentDepoStatus,procentDepo,stat)
      }
    }
    else if ((res.executedQty>"0.00000000")&&(res.executedQty<res.origQty))
    {
      text = "Ордер испольнен частично"
      sheet.getRange("A"+(infoStep+19)).setValue(text);
      infoStep++;
    }
  }
  
  sheet.getRange("C19").setValue(infoStep);
  if (telega=="ВКЛ")
  {
    sendMessage("Бот под номером №"+i+"%0A"+text);
  }
}
///////////////////////////////////
/////////////отмена ордера 
function BinanceCancelOrderBotsRimuxTri(profit,minVolBtc,pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent,infoAllPair,procentDepoStatus,procentDepo,stat)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BinanceBots");
  var resOrderCancel =  BinanceCancelOrder(pair,OrderID);
  var text1;
  if(resOrderCancel.symbol==pair)
  {
    sheet.getRange("A"+(infoStep+19)).setValue("Отмена ордера время вышло");     infoStep++;
    sheet.getRange("A"+(infoStep+19)).setValue("Продажа по маркету ");     infoStep++;
    sheet.getRange("N"+(i+1)).setValue(1);  
    var orderRes = BinanceCreatOrder(pair,"SELL","MARKET","GTC",count,price,"ACK","");
      if (orderRes.orderId!=null)
      {
        sheet.getRange("A"+(infoStep+19)).setValue("Цена ="+price);    infoStep++;
        sheet.getRange("A"+(infoStep+19)).setValue("Количество ="+count);      infoStep++;
        text1 = "Ордер на продажу создан id ордера ="+orderRes.orderId;    sheet.getRange("A"+(infoStep+19)).setValue(text1);          infoStep++;
        
      }
      else if (orderRes.msg!=null)
      {
        text1 = "Ордер на продажу не создан ошибка ="+orderRes.msg;
        sheet.getRange("A"+(infoStep+19)).setValue(text1);          infoStep++;
      }
  }
}

///////////////////////////////////////////////////////////////
//////////////////// второй шаг стратегиии римуса 
function BinanceBotsRimusStepTwo(i,OrderID,infoStep,number,OrderCount,allDep,price,profit,pair,telega,infoAllPair,down,downProcent,procentDepoStatus,procentDepo,timer1,timer2,sr24,minVolBtc,stat,lostTime)
{
  
  var time = Number(new Date().getTime()/1000).toFixed(0);
  time =time*1;
  lostTime=((lostTime*24)*60)*60;
  lostTime=time+lostTime;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BinanceBots");
  var count = OrderCount;   var text = "";  var text1 = "";
  sheet.getRange("A"+(infoStep+19)).setValue("Бот под номером №"+i);    infoStep++;
  var res = BinanceOrderInfo(pair,OrderID)
  
  if (res.msg!=null)
  {
    text = "Ошибка "+res.msg;
    sheet.getRange("A"+(infoStep+19)).setValue(text);      infoStep++;
  }
  else if (res.executedQty!=null)
  {
    if (res.executedQty==res.origQty)
    {
      text =  "Ордер испольнен польностью"
      sheet.getRange("A"+(infoStep+19)).setValue(text);        infoStep++;
      price =BinancePriceCheck(pair,price,infoAllPair);
      price=price*(1+(profit/100));
      count = res.origQty *0.998;
      price =BinancePriceCheck(pair,price,infoAllPair);
      if (telega=="Только ордера")
      {
        sendMessage("Бот под номером №"+i+"%0A"+text)
      }
      if (allDep=="ВКЛ")
      {
        var list = [];
        list = BinanceAllDepo(pair,infoAllPair);
        count = list[1]
        count= count *0.998;
      }
      count = BinanceCountCheck(pair,count,infoAllPair)
      var orderRes = BinanceCreatOrder(pair,"SELL","LIMIT","GTC",count,price,"ACK","");
      if (orderRes.orderId!=null)
      {
        sheet.getRange("T"+(i+1)).setValue(lostTime); 
        sheet.getRange("N"+(i+1)).setValue(number+1);      sheet.getRange("M"+(i+1)).setValue(orderRes.orderId);
        sheet.getRange("P"+(i+1)).setValue(count);         sheet.getRange("A"+(infoStep+19)).setValue("Цена ="+price);    infoStep++;
        sheet.getRange("A"+(infoStep+19)).setValue("Количество ="+count);      infoStep++;
        text1 = "Ордер на продажу создан id ордера ="+orderRes.orderId;    sheet.getRange("A"+(infoStep+19)).setValue(text1);          infoStep++;
      }
      else if (orderRes.msg!=null)
      {
        text1 = "Ордер на продажу не создан ошибка ="+orderRes.msg;
        sheet.getRange("A"+(infoStep+19)).setValue(text1);          infoStep++;
      }
    }
    else if (res.executedQty=="0.00000000")
    {
      text = "Ордер не испольнен"
      sheet.getRange("A"+(infoStep+19)).setValue(text);       infoStep++;
      BinanceCancelOrderBotsRimux(profit,minVolBtc,pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent,infoAllPair,procentDepoStatus,procentDepo,stat)
    }
    else if ((res.executedQty>"0.00000000")&&(res.executedQty<res.origQty))
    {
      text = "Ордер испольнен частично"
      sheet.getRange("A"+(infoStep+19)).setValue(text);        infoStep++;
    }
  }
  sheet.getRange("C19").setValue(infoStep);
  if (telega=="ВКЛ")  {  sendMessage("Бот под номером №"+i+"%0A"+"Цена ="+price+"%0A"+"Количество ="+count+"%0A"+text+"%0A"+text1) }
}
///////////////////////////////////
/////////////отмена ордера 
function BinanceCancelOrderBotsRimux(profit,minVolBtc,pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent,infoAllPair,procentDepoStatus,procentDepo,stat)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BinanceBots");
  var resOrderCancel =  BinanceCancelOrder(pair,OrderID);
  if(resOrderCancel.symbol==pair)
  {
    sheet.getRange("A"+(infoStep+19)).setValue("Отмена ордера");     infoStep++;
    sheet.getRange("N"+(i+1)).setValue(1);   BinanceBotsRimusStepOne(profit,minVolBtc,pair,infoAllPair,stat,i,infoStep,sr24,down,downProcent,allDep,procentDepoStatus,count,procentDepo)
  }
}
/////////////////////////////////////////////
/////////////////////первый шаг стрегии римуса
function BinanceBotsRimusStepOne(profit,minVolBtc,pair,infoAllPair,stat,i,infoStep,sr24,down,downProcent,allDep,procentDepoStatus,count,procentDepo,telega)
{ 
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BinanceBots");
  if (BinanceVolSpred(profit,minVolBtc,pair,infoAllPair,stat))
  {
    var price;    var text;   
    price = BinanceBotsPriceRimus(pair,infoAllPair,profit,stat)
    if (allDep=="ВКЛ")
    {  
      var list = [];
      list = BinanceAllDepo(pair,infoAllPair)
      count = (list[2]/price);
      count= count *0.998;
    }
    else if ((allDep=="ВЫКЛ")&&(procentDepoStatus=="ВКЛ"))
    {
      var list = [];
      list = BinanceAllDepo(pair,infoAllPair)
      count = (list[2]/price)*(procentDepo/100);
      count= count *0.998;
    }
    price = BinancePriceCheck(pair,price,infoAllPair);
    count = BinanceCountCheck(pair,count,infoAllPair);
    var BuyResult = BinanceCreatOrder(pair,"BUY","LIMIT","GTC",count,price,"ACK","");
    if (BuyResult.orderId!=null)
    {  
      sheet.getRange("M"+(i+1)).setValue(BuyResult.orderId);
      text="Ордер на покупку создан. Инфа об ордере = " + BuyResult.orderId;
      sheet.getRange("N"+(i+1)).setValue(2);
      sheet.getRange("P"+(i+1)).setValue(count);
    }
    else if (BuyResult.msg!=null)
    {    
      text="Ошибка при покупки ордера тип ошибки = " + BuyResult.msg;
    }  
    sheet.getRange("A"+(infoStep+19)).setValue("Бот под номером №"+i);    infoStep++;
    sheet.getRange("A"+(infoStep+19)).setValue("Цена ="+price);  infoStep++;
    sheet.getRange("A"+(infoStep+19)).setValue("Количество ="+count);   infoStep++;
    sheet.getRange("A"+(infoStep+19)).setValue(text);   infoStep++;
    sheet.getRange("O"+(i+1)).setValue(price);  
    sheet.getRange("C19").setValue(infoStep);
    if (telega=="ВКЛ")
    {
      sendMessage("Бот под номером №"+i+"%0A"+"Цена ="+price+"%0A"+"Количество ="+count+"%0A"+text)
    }
    
    
  }
  else if (!BinanceVolSpred(profit,minVolBtc,pair,infoAllPair,stat))
  {
    sheet.getRange("A"+(infoStep+19)).setValue("Бот под номером №"+i);    infoStep++;
    sheet.getRange("A"+(infoStep+19)).setValue("пара не подходит по обьему или спреду");    infoStep++;
  }
}
/////////////////////////////////////////////////
/////////////формирование цены для стратегиии римуса 
function BinanceBotsPriceRimus(pairCheck,infoAllPair,profit,stat)
{
  var AllIn =infoAllPair;
  var pair=[];  var fPair =[];   var tPair = [];
  var spred=[];  var avg=[];  var ask =[];
  var bid=[];  var vol=[];  var vol2=[];
  var countA=0;
  for (var i=0;i<15000;i++)
  {
    if (AllIn.symbols[i]!=null)
    {
      pair[i]=AllIn.symbols[i].symbol
      fPair[i] = AllIn.symbols[i].baseAsset
      tPair[i] = AllIn.symbols[i].quoteAsset
      ask[i]=stat[i].askPrice;
      bid[i]=stat[i].bidPrice;
      avg[i]=stat[i].weightedAvgPrice;
      vol[i]=stat[i].volume
      vol2[i]=stat[i].quoteVolume
      spred[i]=100/((stat[i].bidPrice*1)/((stat[i].askPrice*1)-(stat[i].bidPrice*1)));
      countA++;
    }
    else if (AllIn.symbols[i]==null)
    {
      i=150001;
    }
  }
  var result;
  result = (bid[pair.indexOf(pairCheck)]*1);
  return result;
 
}
/////////////////////////
///////////// третии шаг проверка на проданность 
function BinanceBotsStepTri(i,OrderID,infoStep,number,OrderCount,repeatType,telega,pair)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BinanceBots");
  var count =OrderCount;   var text = "";   var text1 = "";
  var res = BinanceOrderInfo(pair,OrderID);
  sheet.getRange("A"+(infoStep+19)).setValue("Бот под номером №"+i);    infoStep++;
  if (res.msg!=null)
  {
    text = "Ошибка "+res.msg;
    sheet.getRange("A"+(infoStep+19)).setValue(text);      infoStep++;
  }
  else if (res.executedQty!=null)
  {
    if (res.executedQty==res.origQty)
    {
      text =  "Ордер испольнен польностью"
      sheet.getRange("A"+(infoStep+19)).setValue(text);        infoStep++;
      if (telega=="Только ордера")
      {
        sendMessage("Бот под номером №"+i+"%0A"+text)
      }
      if (repeatType=="цикл")
      {
        sheet.getRange("N"+(i+1)).setValue(1);
      }
      else if (repeatType=="Один раз")
      {
        sheet.getRange("N"+(i+1)).setValue(1);
        sheet.getRange("L"+(i+1)).setValue("ВЫКЛ");
      }
    }
    else if (res.executedQty=="0.00000000")
    {
      text = "Ордер не испольнен"
      sheet.getRange("A"+(infoStep+19)).setValue(text);
      infoStep++;
    }
    else if ((res.executedQty>"0.00000000")&&(res.executedQty<res.origQty))
    {
      text = "Ордер испольнен частично"
      sheet.getRange("A"+(infoStep+19)).setValue(text);
      infoStep++;
    }
  }
  
  sheet.getRange("C19").setValue(infoStep);
  if (telega=="ВКЛ")
  {
    sendMessage("Бот под номером №"+i+"%0A"+text);
  }
}
////////////////////////////
////////// второй шаг бота проверка ордера и создание ордера на продажу 
function BinanceBotsStepTwo(i,OrderID,infoStep,number,OrderCount,allDep,price,profit,pair,telega,infoAllPair,down,downProcent,procentDepoStatus,procentDepo,timer1,timer2,sr24)
{  
  var time = Number(new Date().getTime()/1000).toFixed(0);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BinanceBots");
  var count = OrderCount;   var text = "";  var text1 = "";
  sheet.getRange("A"+(infoStep+19)).setValue("Бот под номером №"+i);    infoStep++;
  var res = BinanceOrderInfo(pair,OrderID)
  
  if (res.msg!=null)
  {
    text = "Ошибка "+res.msg;
    sheet.getRange("A"+(infoStep+19)).setValue(text);      infoStep++;
  }
  else if (res.executedQty!=null)
  {
    if (res.executedQty==res.origQty)
    {
      text =  "Ордер испольнен польностью"
      sheet.getRange("A"+(infoStep+19)).setValue(text);        infoStep++;
      price =BinancePriceCheck(pair,price,infoAllPair);
      price=price*(1+(profit/100));
      count = res.origQty *0.998;
      price =BinancePriceCheck(pair,price,infoAllPair);
      if (telega=="Только ордера")
      {
        sendMessage("Бот под номером №"+i+"%0A"+text)
      }
      if (allDep=="ВКЛ")
      {
        var list = [];
        list = BinanceAllDepo(pair,infoAllPair);
        count = list[1]
        count= count *0.998;
      }
      count = BinanceCountCheck(pair,count,infoAllPair)
      var orderRes = BinanceCreatOrder(pair,"SELL","LIMIT","GTC",count,price,"ACK","");
      if (orderRes.orderId!=null)
      {
        sheet.getRange("N"+(i+1)).setValue(number+1);      sheet.getRange("M"+(i+1)).setValue(orderRes.orderId);
        sheet.getRange("P"+(i+1)).setValue(count);         sheet.getRange("A"+(infoStep+19)).setValue("Цена ="+price);    infoStep++;
        sheet.getRange("A"+(infoStep+19)).setValue("Количество ="+count);      infoStep++;
        text1 = "Ордер на продажу создан id ордера ="+orderRes.orderId;    sheet.getRange("A"+(infoStep+19)).setValue(text1);          infoStep++;
      }
      else if (orderRes.msg!=null)
      {
        text1 = "Ордер на продажу не создан ошибка ="+orderRes.msg;
        sheet.getRange("A"+(infoStep+19)).setValue(text1);          infoStep++;
      }
    }
    else if (res.executedQty=="0.00000000")
    {
      text = "Ордер не испольнен"
      sheet.getRange("A"+(infoStep+19)).setValue(text);       infoStep++;
      if ((down=="ВЫКЛ")&&(sr24=="ВЫКЛ"))    {    BinanceCancelOrderBots(pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent,infoAllPair,procentDepoStatus,procentDepo)     }
      else if (down=="ВКЛ")
      {
        if (time>=timer2)  {     BinanceCancelOrderBots(pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent,infoAllPair,procentDepoStatus,procentDepo)   }
      }
      else if ((down=="ВЫКЛ")&&(sr24=="ВКЛ"))
      {
        if (time>=timer2)  { BinanceCancelOrderBots(pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent,infoAllPair,procentDepoStatus,procentDepo)   }
      }
    }
    else if ((res.executedQty>"0.00000000")&&(res.executedQty<res.origQty))
    {
      text = "Ордер испольнен частично"
      sheet.getRange("A"+(infoStep+19)).setValue(text);        infoStep++;
    }
  }
  sheet.getRange("C19").setValue(infoStep);
  if (telega=="ВКЛ")  {  sendMessage("Бот под номером №"+i+"%0A"+"Цена ="+price+"%0A"+"Количество ="+count+"%0A"+text+"%0A"+text1) }
}
///////////////////////////////////
/////////////отмена ордера 
function BinanceCancelOrderBots(pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent,infoAllPair,procentDepoStatus,procentDepo)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BinanceBots");
  var resOrderCancel =  BinanceCancelOrder(pair,OrderID);
  if(resOrderCancel.symbol==pair)
  {
    sheet.getRange("A"+(infoStep+19)).setValue("Отмена ордера");     infoStep++;
    sheet.getRange("N"+(i+1)).setValue(1);   BinanceBotsStepOne(pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent,infoAllPair,procentDepoStatus,procentDepo)
  }
}
////////////////////////////
///////// Логика бота первая ступень 
/////// формирование цены , количество и покупка

function BinanceBotsStepOne(pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent,infoAllPair,procentDepoStatus,procentDepo)
{  
  var time = Number(new Date().getTime()/1000).toFixed(0);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BinanceBots");
  var price;    var text;
  
  price = BinancePrice(pair,sr24,down,downProcent);
  if (sr24=="ВЫКЛ")
  {
    time=time*1;
    sheet.getRange("T"+(i+1)).setValue(time+360);
  }
  price = BinancePriceCheck(pair,price,infoAllPair);
  if (down=="ВКЛ")
  {
    time=time*1;
    sheet.getRange("U"+(i+1)).setValue(time+720);
  }
  if (allDep=="ВКЛ")
  {  
    var list = [];
    list = BinanceAllDepo(pair,infoAllPair)
    count = (list[2]/price);
    count= count *0.998;
  }
  else if ((allDep=="ВЫКЛ")&&(procentDepoStatus=="ВКЛ"))
  {
    var list = [];
    list = BinanceAllDepo(pair,infoAllPair)
    count = (list[2]/price)*(procentDepo/100);
    count= count *0.998;
  }
  count = BinanceCountCheck(pair,count,infoAllPair)
  var BuyResult = BinanceCreatOrder(pair,"BUY","LIMIT","GTC",count,price,"ACK","");
  if (BuyResult.orderId!=null)
  {  
    sheet.getRange("M"+(i+1)).setValue(BuyResult.orderId);
    text="Ордер на покупку создан. Инфа об ордере = " + BuyResult.orderId;
    sheet.getRange("N"+(i+1)).setValue(2);
    sheet.getRange("P"+(i+1)).setValue(count);
  }
  else if (BuyResult.msg!=null)
  {    
    text="Ошибка при покупки ордера тип ошибки = " + BuyResult.msg;
  }  
  sheet.getRange("A"+(infoStep+19)).setValue("Бот под номером №"+i);    infoStep++;
  sheet.getRange("A"+(infoStep+19)).setValue("Цена ="+price);  infoStep++;
  sheet.getRange("A"+(infoStep+19)).setValue("Количество ="+count);   infoStep++;
  sheet.getRange("A"+(infoStep+19)).setValue(text);   infoStep++;
  sheet.getRange("O"+(i+1)).setValue(price);  
  sheet.getRange("C19").setValue(infoStep);
  if (telega=="ВКЛ")
  {
    sendMessage("Бот под номером №"+i+"%0A"+"Цена ="+price+"%0A"+"Количество ="+count+"%0A"+text)
  }
}
///////////
///// проверка и исправление количества исходя из норм биржы binance
function BinanceCountCheck(pair,count,infoAllPair)
{
  var ss ;
  var min ;
  for (var i =0;i<1500;i++)
  {
    if (infoAllPair.symbols[i]!=null)
    {
      ss = infoAllPair.symbols[i].symbol;
      if (ss==pair)
      {
        min = infoAllPair.symbols[i].filters[1].stepSize;
        i =155555;
      }
    }
    else if (infoAllPair.symbols[i]==null)
    {
      i=15555;
    }
  }
  var num  = min.indexOf("1");
  count=count*1;
  var res = count.toFixed(num-1);
  return  res
}
////////////////////////////////////////////
///// проверка и исправление цены исходя из норм биржы binance
function BinancePriceCheck(pair,price,infoAllPair)
{
  var ss ;
  var min ;
  for (var i =0;i<1500;i++)
  {
    if (infoAllPair.symbols[i]!=null)
    {
      ss = infoAllPair.symbols[i].symbol;
      if (ss==pair)
      {
        min = infoAllPair.symbols[i].filters[0].tickSize;
        Logger.log("tickSize"+min)
        i =155555;
      }
    }
    else if (infoAllPair.symbols[i]==null)
    {
      i=15555;
    }
  }
  var num  = min.indexOf("1");
  price=price*1;
  var res = price.toFixed(num-1);
  Logger.log("res===="+res)
  return  res
}
///////////////
//////// вес депозит 

function BinanceAllDepo(pair,infoAllPair)
{
  
  var result =[];
  var ss
  for (var i =0;i<1500;i++)
  {
    if (infoAllPair.symbols[i]!=null)
    {
      ss = infoAllPair.symbols[i].symbol;
      if (ss==pair)
      {
        result[1] = infoAllPair.symbols[i].baseAsset;
        result[2] = infoAllPair.symbols[i].quoteAsset;
        i=15555;
      }
    }
    else if (infoAllPair.symbols[i]==null)
    {
      i=15555;
    }
  }
  
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
////////////////////////////////
///////////формирование цены 
function BinancePrice(pair,sr24,down,downProcent,res)
{
  var price=0;
  var res =  BinanceTicker24hr(pair);
  var avg24 = res.weightedAvgPrice+0;
  var ask = (res.askPrice)*1; 
  var bid = (res.bidPrice)*1;
  var sred = (ask+bid)/2
  if (sr24=="ВКЛ")
  {
    if (sred>avg24)
    {
      price = avg24;
    }
    else if (sred==avg24)
    {
      price = avg24; 
    }
    else if (sred<avg24)
    {
      price =sred;
    }
  }
  else if (sr24=="ВЫКЛ")
  {
    price = sred;
  }
  if (down=="ВКЛ")
  {
    price = price*(1-(downProcent/100));
    Logger.log(downProcent)
  }
  return price; 
}
////////////////////////
////Добавление бота
function BinanceAddBot()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var list1 = "BinanceBots"
  var sheet = ss.getSheetByName(list1);
  var numberBot = sheet.getRange("D1").getValue()+1;
  var stroka = 1+numberBot;
  var list2 = [];
  list2[0]="ВКЛ";
  list2[1]="ВЫКЛ";
  list2[2]="Только ордера"
  var list = [];
  list[0]="ВКЛ";
  list[1]="ВЫКЛ";
  var stLi = []
  stLi[0]= "купи и продай по дороже";
  stLi[1]= "римус"
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(list).build();
  var rule1=SpreadsheetApp.newDataValidation().requireValueInList(list2).build();
  var rule2=SpreadsheetApp.newDataValidation().requireValueInList(stLi).build();
  
  sheet.getRange("E"+stroka).setValue(numberBot);
  sheet.getRange("G"+stroka).setValue(sheet.getRange("B2").getValue());
  sheet.getRange("H"+stroka).setValue(sheet.getRange("B3").getValue());
  sheet.getRange("I"+stroka).setValue(sheet.getRange("B4").getValue());
  sheet.getRange("J"+stroka).setValue(sheet.getRange("B5").getValue());
  sheet.getRange("K"+stroka).setValue(sheet.getRange("B6").getValue());
  sheet.getRange("F"+stroka).setValue(sheet.getRange("B7").getValue());
  sheet.getRange("Q"+stroka).setValue(sheet.getRange("B8").getValue());
  sheet.getRange("R"+stroka).setValue(sheet.getRange("B9").getValue());
  sheet.getRange("S"+stroka).setValue(sheet.getRange("B10").getValue());
  sheet.getRange("V"+stroka).setValue(sheet.getRange("B11").getValue());
  sheet.getRange("W"+stroka).setValue(sheet.getRange("B12").getValue());
  sheet.getRange("X"+stroka).setValue(sheet.getRange("B13").getValue());
  sheet.getRange("Y"+stroka).setValue(sheet.getRange("B14").getValue());
  sheet.getRange("Z"+stroka).setValue(sheet.getRange("D6").getValue());
  sheet.getRange("AA"+stroka).setValue(sheet.getRange("D7").getValue());
  
  sheet.getRange("L"+stroka).setValue("ВКЛ");
  sheet.getRange("N"+stroka).setValue(1);
  sheet.getRange("J"+stroka).setDataValidation(rule);
  
  sheet.getRange("Q"+stroka).setDataValidation(rule1);
  sheet.getRange("K"+stroka).setDataValidation(rule);
  sheet.getRange("L"+stroka).setDataValidation(rule);
  sheet.getRange("R"+stroka).setDataValidation(rule);
  sheet.getRange("V"+stroka).setDataValidation(rule2);
  sheet.getRange("Z"+stroka).setDataValidation(rule);
  sheet.getRange("D1").setValue(numberBot);
  UpdateDeleteBots(stroka,list1)
}

//////////////////////////////////////////////////
///////////////////Удаление бота 
function BinanceDeleteBot()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var list = "BinanceBots"
  var sheet = ss.getSheetByName(list);
  var numberBot = sheet.getRange("B17").getValue();
  var allBotNumber = sheet.getRange("D1").getValue();
  Logger.log(numberBot)
  if (numberBot==allBotNumber)
  {
    DeleteBotlast(allBotNumber,list)
  }
  else 
  {
    DeleteBotNow(numberBot,allBotNumber,list)
    DeleteBotlast(allBotNumber,list);
  }
  sheet.getRange("D1").setValue(allBotNumber-1);
  UpdateDeleteBots(allBotNumber,list)
}

