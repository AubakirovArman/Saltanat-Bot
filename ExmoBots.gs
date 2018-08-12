/////////////////////////////
////////Логика бота
function ExmoBots()
{avtoUpdateFormula();
 var ss = SpreadsheetApp.getActiveSpreadsheet();
 var sheet = ss.getSheetByName("ExmoBots");
 var numberBot = sheet.getRange("D1").getValue();
 if (numberBot>0)
 {
   var infoStep = sheet.getRange("C19").getValue();
   infoProverka(infoStep,"ExmoBots");
   var ping =ExmoPing();
   var text="";
   if (ping=="обнова")
   {
     text = "Биржа добавила новые валюты идет обновление "
     sheet.getRange("A"+(infoStep+19)).setValue(text);
     infoStep++;
     sendMessage(text);
   }
   else if (ping=="не норма")
   {
     text = "Биржа не доступна возможно идет добавление новых валют"
     sheet.getRange("A"+(infoStep+19)).setValue(text);
     infoStep++;
     sendMessage(text);
   }
   else if (ping=="норма")
   {
     for (var i=1; i<=numberBot;i++)
     {
       
       if (sheet.getRange("L"+(i+1)).getValue()=="ВКЛ")
       {
         var infoStep = sheet.getRange("C19").getValue();           var strategia = sheet.getRange("V"+(i+1)).getValue();      var procentDepoStatus = sheet.getRange("Z"+(i+1)).getValue();   
         var procentDepo = sheet.getRange("AA"+(i+1)).getValue(); 
         var repeatType = sheet.getRange("F"+(i+1)).getValue();     var pair = sheet.getRange("G"+(i+1)).getValue();           var count = sheet.getRange("H"+(i+1)).getValue();   
         var profit = sheet.getRange("I"+(i+1)).getValue();         var sr24 = sheet.getRange("J"+(i+1)).getValue();           var allDep = sheet.getRange("K"+(i+1)).getValue();
         var OrderID = sheet.getRange("M"+(i+1)).getValue();        var number = sheet.getRange("N"+(i+1)).getValue();         var price = sheet.getRange("O"+(i+1)).getValue();          
         var OrderCount = sheet.getRange("P"+(i+1)).getValue();     var telega = sheet.getRange("Q"+(i+1)).getValue();         var down =sheet.getRange("R"+(i+1)).getValue();
         var downProcent = sheet.getRange("S"+(i+1)).getValue();    var timer1 =sheet.getRange("T"+(i+1)).getValue();          var timer2 =sheet.getRange("U"+(i+1)).getValue(); 
         ////////////////////////////стратегия римуса конфиг
         var spred = sheet.getRange("W"+(i+1)).getValue();          var lostTime =  sheet.getRange("X"+(i+1)).getValue();      var minVolBtc = sheet.getRange("Y"+(i+1)).getValue(); 
         if (number==1)
         {
           if (strategia =="купи и продай по дороже")
           {
             ExmoBotsStepOne(pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent,procentDepoStatus,procentDepo)
           }
           else if (strategia == "римус")
           {
             ExmoBotsStepOneRimus(pair,count,allDep,i,number,infoStep,telega,procentDepoStatus,procentDepo,spred,minVolBtc)
           }
         }
         else if (number==2)
         {
           if (strategia =="купи и продай по дороже")
           {
             ExmoBotsStepTwo(i,OrderID,infoStep,number,OrderCount,allDep,price,profit,pair,telega,count,sr24,down,downProcent,timer1,timer2)
           }
           else if (strategia == "римус")
           {
             ExmoBotsStepTwoRimus(i,OrderID,infoStep,number,OrderCount,allDep,price,profit,pair,telega,count,lostTime,procentDepoStatus,procentDepo,spred,minVolBtc)
           }
         }
         else if (number==3)
         {
           if (strategia =="купи и продай по дороже")
           {
             ExmoBotsStepTri(i,OrderID,infoStep,number,OrderCount,repeatType,telega);
           }
           else if (strategia == "римус")
           {
             ExmoBotsTriRimus(i,OrderID,infoStep,number,OrderCount,repeatType,telega,timer1,pair)
           }
         }
       }
     }
   }
 }
}
/////////////////////////////////////
/////////////шаг третии стратегии римуса 
function ExmoBotsTriRimus(i,OrderID,infoStep,number,OrderCount,repeatType,telega,timer1,pair)
{
  var time = Number(new Date().getTime()/1000).toFixed(0);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ExmoBots");
  var count =OrderCount;
  var res = ExmoOrderTrades(OrderID)
  var text = "";
  var text1 = "";
  sheet.getRange("A"+(infoStep+19)).setValue("Бот под номером №"+i);
  infoStep++;
  if (res.result==false)
  {
    text = "Ордер не испольнен"
    sheet.getRange("A"+(infoStep+19)).setValue(text);    infoStep++; 
    if (time>=timer1)
    {
      var otmenaOrdera = ExmoOrderCancel(OrderID);
      if (otmenaOrdera.result)
      {
        sheet.getRange("A"+(infoStep+19)).setValue("Отмена ордера");          infoStep++;
        sheet.getRange("N"+(i+1)).setValue(1);          
        var sel =ExmoOrderCreat(pair,count,1,"market_sell");
        if (sel.result==true)
        {
          sheet.getRange("A"+(infoStep+19)).setValue("Время ожидания вышло. Ордер был продан по текущей цене"); infoStep++;            sendMessage("Время ожидания вышло. Ордер был продан по текущей цене");
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
      }
    }
  }
  else if (res.result==null)
  {
    var outAmount = res.out_amount;
    if (outAmount>=count)
    {
      text = "Ордер испольнен";
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
    else if (outAmount<count)
    {
      text = "Ордер испольнен частично";
      sheet.getRange("A"+(infoStep+19)).setValue(text);   infoStep++;
    }
  }
  sheet.getRange("C19").setValue(infoStep);
  if (telega=="ВКЛ")
  {
    sendMessage("Бот под номером №"+i+"%0A"+text);
  }
}
/////////////////////////////////////////////
////////////////// второй шаг стратегии римуса
function ExmoBotsStepTwoRimus(i,OrderID,infoStep,number,OrderCount,allDep,price,profit,pair,telega,count,lostTime,procentDepoStatus,procentDepo,spred,minVolBtc)
{ 
  var time = Number(new Date().getTime()/1000).toFixed(0);
  time =time*1;
  lostTime=((lostTime*24)*60)*60;
  lostTime=time+lostTime;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ExmoBots");
  var count =OrderCount;
  var res = ExmoOrderTrades(OrderID)
  var text = "";    
  var text1 = "";
  sheet.getRange("A"+(infoStep+19)).setValue("Бот под номером №"+i);    infoStep++;
  if (res.result==false)
  {
    text = "Ордер не испольнен"
    sheet.getRange("A"+(infoStep+19)).setValue(text);  infoStep++;
  
      var otmenaOrdera = ExmoOrderCancel(OrderID);
      if (otmenaOrdera.result)
      {
        sheet.getRange("A"+(infoStep+19)).setValue("Отмена ордера");          infoStep++;
        sheet.getRange("N"+(i+1)).setValue(1);          
        ExmoBotsStepOneRimus(pair,count,allDep,i,number,infoStep,telega,procentDepoStatus,procentDepo,spred,minVolBtc)
      }
  }
  else if (res.result==null)
  {
    var outAmount = res.in_amount;
    
    if (outAmount==count)
    {
      text = "Ордер испольнен";    sheet.getRange("A"+(infoStep+19)).setValue(text);        infoStep++;
      if (telega=="Только ордера")
      {
        sendMessage("Бот под номером №"+i+"%0A"+text)
      }
      count = res.in_amount*0.998;
      price=price*(1+(profit/100));
      if (allDep=="ВКЛ")
      {
        var list = [];
        list = balanceExmoBot(pair);
        count = list[2];
      }
      var listPrice =[];
      listPrice =ExmoPriceBuyRimus(pair)
      if (listPrice[1] > price)
      {
        price=listPrice[1];
      }
      price=(price*1)+0.000000001;
      price=price.toFixed(8);
      
      var orderRes = ExmoOrderCreat(pair,count,price,"sell");
      if (orderRes.result)
      {   count = (count-0.00000001)
        sheet.getRange("N"+(i+1)).setValue(number+1);      
        sheet.getRange("M"+(i+1)).setValue(orderRes.order_id);
        sheet.getRange("P"+(i+1)).setValue(count); sheet.getRange("T"+(i+1)).setValue(lostTime);
        sheet.getRange("A"+(infoStep+19)).setValue("Цена ="+price);        infoStep++;          
        sheet.getRange("A"+(infoStep+19)).setValue("Количество ="+ count);         infoStep++;           
        text1 = "Ордер на продажу создан id ордера ="+orderRes.order_id;  
        sheet.getRange("A"+(infoStep+19)).setValue(text1);  infoStep++;
      }
      else if (!orderRes.result)
      {
        text1 = "Ордер на продажу не создан ошибка ="+orderRes.error;
        sheet.getRange("A"+(infoStep+19)).setValue(text1);  infoStep++;
      }
    }
    else if (outAmount<count)
    {
      Logger.log(outAmount)
      Logger.log(count)
      text = "Ордер испольнен частично";
      sheet.getRange("A"+(infoStep+19)).setValue(text);  infoStep++;
    }
  }
  sheet.getRange("C19").setValue(infoStep);
  if (telega=="ВКЛ")
  {
    sendMessage("Бот под номером №"+i+"%0A"+"Цена ="+price+"%0A"+"Количество ="+count+"%0A"+text+"%0A"+text1)
  }
}
////////////////////////////////////////
///////////////////// первый шаг стратегии римуса 
function ExmoBotsStepOneRimus(pair,count,allDep,i,number,infoStep,telega,procentDepoStatus,procentDepo,spred,minVolBtc)
{
  if (ExmoSheckVolume(pair,minVolBtc)&&(ExmoSheckSpred(pair,spred)))
  {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("ExmoBots");
    var price;
    var text;
    var pri =[];
    pri = ExmoPriceBuyRimus(pair);
    price = pri[0];
    Logger.log("price ask = "+pri[0])
    price=price*1;

    if (allDep=="ВКЛ")
    {  
      var list = [];
      list = balanceExmoBot(pair);
      Logger.log(list[3])
      count = (list[3]/price);
    }
    else if ((allDep=="ВЫКЛ")&&(procentDepoStatus=="ВКЛ"))
    {
      var list = [];
      list = balanceExmoBot(pair);
      list[3]= list[3]*(procentDepo/100)
      count = (list[3]/price);
    }
    count=(count*1)+0.000000001;
    count=count.toFixed(8)-0.00000001;
    var BuyResult = ExmoOrderCreat(pair,count,price,"buy")
    if (BuyResult.result)
    {  
      sheet.getRange("M"+(i+1)).setValue(BuyResult.order_id);
      text="Ордер на покупку создан. Инфа об ордере = " + BuyResult.order_id;
      sheet.getRange("N"+(i+1)).setValue(2);
      sheet.getRange("P"+(i+1)).setValue(count);
    }
    else if (!BuyResult.result)
    {    
      text="Ошибка при покупки ордера тип ошибки = " + BuyResult.error;
    }  
    sheet.getRange("A"+(infoStep+19)).setValue("Бот под номером №"+i);
    infoStep++;
    sheet.getRange("A"+(infoStep+19)).setValue("Цена ="+price);
    infoStep++;
    sheet.getRange("A"+(infoStep+19)).setValue("Количество ="+count);
    infoStep++;
    sheet.getRange("A"+(infoStep+19)).setValue(text);
    infoStep++;
    sheet.getRange("O"+(i+1)).setValue(price);
    sheet.getRange("C19").setValue(infoStep);
    if (telega=="ВКЛ")
    {
      sendMessage("Бот под номером №"+i+"%0A"+"Цена ="+price+"%0A"+"Количество ="+count+"%0A"+text)
    }
  }
}
////////////////
/////////формирование цена на покупку для стратегии римас 
function ExmoPriceBuyRimus(pair)
{

  var res = ExmoOrderBook(pair);

  var ask = res[pair].ask_top*1;
  var bid = res[pair].bid_top*1;
  var result = [];
  if (pair=="DOGE_BTC")
  {
    result[0]=bid;
    result[1]=ask;
  }
  else if (pair!="DOGE_BTC")
  {
    result[0]=(((bid+0.00000001)*1)+0.000000001).toFixed(8);
    result[1]=(((ask-0.00000001)*1)+0.000000001).toFixed(8);
  }
  return result;
}
///////////////////////////////////
/////////////// проверка спреда 
function ExmoSheckSpred(pair,spred)
{
  var res = ExmoOrderBook(pair);
  var ask = res[pair].ask_top;
  var bid = res[pair].bid_top;
  var mat = 100/(bid/(ask-bid))
  var result
  if (spred <= mat) 
  {
    result = true;
  }
  else 
  {
    result = false;
  }
  return result;
}
//////////////////////////////
//////проверка обьема торгов за 24 часа для стратегии римус 
function ExmoSheckVolume(pair,minVolBtc)
{
  var b = ExmoTicker();
  var vol = b[pair].vol;
  var mat =0;
  var fPair= pair.substring(0,pair.indexOf("_"));
  var tPair = pair.substring(pair.indexOf("_")+1,pair.length);
  
  if (b[fPair+"_BTC"]!=null)
  {
    mat = vol*b[fPair+"_BTC"].avg
  }
  else if (b[fPair+"_USD"]!=null)
  {
    mat = vol*b[fPair+"_USD"].avg;
    mat = mat/b["BTC_USD"].avg;
  }
  else if (b[fPair+"_RUB"]!=null)
  {
    mat = vol*b[fPair+"_RUB"].avg;
    mat = mat/b["BTC_RUB"].avg;
  }
  Logger.log(mat)
  var result
  if (mat >=minVolBtc)
  {
    result = true;
  }
  else 
  {
    result =false;
  }
  Logger.log(result)
  return result;
}
/////////////////////////
///////////// третии шаг проверка на проданность 
function ExmoBotsStepTri(i,OrderID,infoStep,number,OrderCount,repeatType,telega)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ExmoBots");
  var count =OrderCount;
  var res = ExmoOrderTrades(OrderID);
  var text = "";
  var text1 = "";
  sheet.getRange("A"+(infoStep+19)).setValue("Бот под номером №"+i);
  infoStep++;
  if (res.result==false)
  {
    text = "Ордер не испольнен"
    sheet.getRange("A"+(infoStep+19)).setValue(text);
    infoStep++;
  }
  else if (res.result==null)
  {
    var outAmount = res.out_amount;
    if (outAmount>=count)
    {
      text = "Ордер испольнен";
      sheet.getRange("A"+(infoStep+19)).setValue(text);
      infoStep++;
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
    else if (outAmount<count)
    {
      text = "Ордер испольнен частично";
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
function ExmoBotsStepTwo(i,OrderID,infoStep,number,OrderCount,allDep,price,profit,pair,telega,count,sr24,down,downProcent,timer1,timer2)
{ 
  var time = Number(new Date().getTime()/1000).toFixed(0);
  time =time*1;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ExmoBots");
  var count =OrderCount;
  var res = ExmoOrderTrades(OrderID)
  var text = "";    var text1 = "";
  sheet.getRange("A"+(infoStep+19)).setValue("Бот под номером №"+i);
  infoStep++;
  if (res.result==false)
  {
    text = "Ордер не испольнен"
    sheet.getRange("A"+(infoStep+19)).setValue(text);
    infoStep++;
    if ((down=="ВЫКЛ")&&(sr24=="ВЫКЛ"))
    {
      var otmenaOrdera = ExmoOrderCancel(OrderID);
      if (otmenaOrdera.result)
      {
        sheet.getRange("A"+(infoStep+19)).setValue("Отмена ордера");          infoStep++;
        sheet.getRange("N"+(i+1)).setValue(1);          ExmoBotsStepOne(pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent)
      }
    }
    else if (down=="ВКЛ")
    {
      if (time>=timer2)
      {
        var otmenaOrdera = ExmoOrderCancel(OrderID);
        if (otmenaOrdera.result)
        {
          sheet.getRange("A"+(infoStep+19)).setValue("Отмена ордера");           infoStep++;
          sheet.getRange("N"+(i+1)).setValue(1);     ExmoBotsStepOne(pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent)
        }
      }
    }
    else if ((down=="ВЫКЛ")&&(sr24=="ВКЛ"))
    {
      if (time>=timer1)
      {
        var otmenaOrdera = ExmoOrderCancel(OrderID);
        if (otmenaOrdera.result==true)
        {    
          sheet.getRange("A"+(infoStep+19)).setValue("Отмена ордера");   infoStep++;      sheet.getRange("N"+(i+1)).setValue(1);  ExmoBotsStepOne(pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent)
        }
      }
    }
  }
  else if (res.result==null)
  {
    var outAmount = res.in_amount;
    
    if (outAmount==count)
    {
      text = "Ордер испольнен";    sheet.getRange("A"+(infoStep+19)).setValue(text);        infoStep++;
      if (telega=="Только ордера")
      {
        sendMessage("Бот под номером №"+i+"%0A"+text)
      }
      count = res.in_amount*0.998;

      price=price*(1+(profit/100));
      if (allDep=="ВКЛ")
      {
        var list = [];
        list = balanceExmoBot(pair);
        count = list[2];
        Logger.log(list[2])
      }
      price=(price*1)+0.000000001;
      price=price.toFixed(8);
      
      var orderRes = ExmoOrderCreat(pair,count,price,"sell");
      Logger.log(orderRes)
      if (orderRes.result)
      {      count = (count-0.00000001)
        sheet.getRange("N"+(i+1)).setValue(number+1);          sheet.getRange("M"+(i+1)).setValue(orderRes.order_id);           sheet.getRange("P"+(i+1)).setValue(count);          sheet.getRange("A"+(infoStep+19)).setValue("Цена ="+price);
        infoStep++;           sheet.getRange("A"+(infoStep+19)).setValue("Количество ="+count);          infoStep++;            text1 = "Ордер на продажу создан id ордера ="+orderRes.order_id;          sheet.getRange("A"+(infoStep+19)).setValue(text1);          infoStep++;
      }
      else if (!orderRes.result)
      {
        text1 = "Ордер на продажу не создан ошибка ="+orderRes.error;
        sheet.getRange("A"+(infoStep+19)).setValue(text1);
        infoStep++;
      }
    }
    else if (outAmount<count)
    {
      text = "Ордер испольнен частично";
      sheet.getRange("A"+(infoStep+19)).setValue(text);
      infoStep++;
    }
  }
  sheet.getRange("C19").setValue(infoStep);
  if (telega=="ВКЛ")
  {
    sendMessage("Бот под номером №"+i+"%0A"+"Цена ="+price+"%0A"+"Количество ="+count+"%0A"+text+"%0A"+text1)
  }
}
////////////////////////////
///////// Логика бота первая ступень 
/////// формирование цены , количество и покупка

function ExmoBotsStepOne(pair,count,allDep,sr24,i,number,infoStep,telega,down,downProcent,procentDepoStatus,procentDepo)
{  
  var time = Number(new Date().getTime()/1000).toFixed(0);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ExmoBots");
  var price;
  var text;
  if (sr24=="ВКЛ")
  {
    price = priceAvg24(pair);
    
  }
  else if (sr24=="ВЫКЛ")
  {
    price = priceAvg(pair);
    time=time*1;
    sheet.getRange("T"+(i+1)).setValue(time+360);
  }
  if (down=="ВКЛ")
  {
    price = price*(1-(downProcent/100));
    time=time*1;
    sheet.getRange("U"+(i+1)).setValue(time+720);
  }
  price=(price*1)+0.000000001;
  price=price.toFixed(8);
  if (allDep=="ВКЛ")
  {  
    var list = [];
    list = balanceExmoBot(pair);
    Logger.log(list[3])
    count = (list[3]/price);
  }
  else if ((allDep=="ВЫКЛ")&&(procentDepoStatus=="ВКЛ"))
  {
    var list = [];
    list = balanceExmoBot(pair);
    list[3]= list[3]*(procentDepo/100)
    count = (list[3]/price);
  }
  count=(count*1)+0.000000001;
  count=count.toFixed(8);
  var BuyResult = ExmoOrderCreat(pair,count,price,"buy")
  if (BuyResult.result)
  {  
    sheet.getRange("M"+(i+1)).setValue(BuyResult.order_id);
    text="Ордер на покупку создан. Инфа об ордере = " + BuyResult.order_id;
    sheet.getRange("N"+(i+1)).setValue(2);
    sheet.getRange("P"+(i+1)).setValue(count);
  }
  else if (!BuyResult.result)
  {    
    text="Ошибка при покупки ордера тип ошибки = " + BuyResult.error;
  }  
  sheet.getRange("A"+(infoStep+19)).setValue("Бот под номером №"+i);
  infoStep++;
  sheet.getRange("A"+(infoStep+19)).setValue("Цена ="+price);
  infoStep++;
  sheet.getRange("A"+(infoStep+19)).setValue("Количество ="+count);
  infoStep++;
  sheet.getRange("A"+(infoStep+19)).setValue(text);
  infoStep++;
  sheet.getRange("O"+(i+1)).setValue(price);
  sheet.getRange("C19").setValue(infoStep);
  if (telega=="ВКЛ")
  {
    sendMessage("Бот под номером №"+i+"%0A"+"Цена ="+price+"%0A"+"Количество ="+count+"%0A"+text)
  }
}




////////////////////////
////Добавление бота
function ExmoAddBot()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var list1 = "ExmoBots"
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
function ExmoDeleteBot()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var list = "ExmoBots"
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

