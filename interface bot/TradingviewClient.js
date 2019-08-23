////////////////////////////////
///////добавление клиента в традингвю
function AddClientTradingview()
{
  var ss2 = SpreadsheetApp.getActiveSpreadsheet();    
  var sheet = ss2.getSheetByName("tradingview");  
  var sheet1 =ss2.getSheetByName("Config");
  var UserCount = sheet1.getRange("B1").getValue();
  var check = CheckClientTradingview();
  if (check==1)
  {
    var market=sheet.getRange("E5").getValue();
    if (market == "Binance")
    {
      addClientTradingviewBinance(market,sheet,sheet1,UserCount)
    }
    updateClientProfil()
  }
  
  
  
}
////////////////////
///////////функция для поиска номера валютной пары для binance
function FountNumberPairBinance(sheet1,sheet)
{
  var num=0
  for (var i =2; i<5000; i++)
  {
    if (sheet1.getRange("I"+i).getValue()==sheet.getRange("K5").getValue())
    {
      num=i
      i=5001
    }
  }
  return num;
}
///////////////////////////////////
/////////////сохранение валют для биржы бинанс
function SaveClientProfileBinance(sheet,sheet1,setBot)
{
  var num =FountNumberPairBinance(sheet1,sheet)
  sheet1.getRange("J"+num).setValue(setBot[0])
  sheet1.getRange("D2").setValue(sheet.getRange("M5").getValue())
  sheet1.getRange("L"+num).setValue(setBot[2])
  sheet1.getRange("M"+num).setValue(setBot[3])
  sheet1.getRange("N"+num).setValue(setBot[4])
  sheet1.getRange("O"+num).setValue(setBot[5])
  sheet1.getRange("P"+num).setValue(setBot[6])
  sheet1.getRange("Q"+num).setValue(setBot[7])
  sheet1.getRange("R"+num).setValue(setBot[8])
  sheet1.getRange("S"+num).setValue(setBot[9])
  sheet1.getRange("T"+num).setValue(setBot[10])
  sheet1.getRange("U"+num).setValue(setBot[11])
  sheet1.getRange("V"+num).setValue(setBot[12])
}
/////////////////////////
////////////сохранить профил 
function SaveClientProfilTradingview()
{
  var ss2 = SpreadsheetApp.getActiveSpreadsheet();    
  var sheet = ss2.getSheetByName("tradingview");  
  var sheet1 =ss2.getSheetByName("Config");
  var setBot=[];
  var id= sheet.getRange("M15").getValue();
  setBot[0]=sheet.getRange("M4").getValue(); //id
  setBot[2]=sheet.getRange("M7").getValue();  // состояние валютных пар
  setBot[3]=sheet.getRange("M10").getValue();   //sell type
  setBot[4]=sheet.getRange("N10").getValue();   //buy type
  setBot[5]=sheet.getRange("M11").getValue(); // цена в ручную sell
  setBot[6]=sheet.getRange("M12").getValue(); // sell amout
  setBot[7]=sheet.getRange("N12").getValue();  // buy amout
  setBot[8]=sheet.getRange("M13").getValue();  //custom amout
  setBot[9]=sheet.getRange("N13").getValue();    //custom amout
  setBot[10]=sheet.getRange("M14").getValue();  //%balance sell
  setBot[11]=sheet.getRange("N14").getValue(); //%balance buy
  setBot[12]=sheet.getRange("N11").getValue();// цена в ручную buy 
  
  var market = sheet.getRange("I5").getValue();
  if (market=="binance"){
    sheet1.getRange("F2").setValue(id)
    var pairClient = sheet.getRange("M8").getDataValidation().getCriteriaValues()[0];
    var rule = SpreadsheetApp.newDataValidation().requireValueInList(pairClient).build();
    sheet1.getRange("H2").setDataValidation(rule);
    SaveClientProfileBinance(sheet,sheet1,setBot);
  }
  
}
////////////////////////////////
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
  return Clientpo
}
//////////////////////////////////
////////////////////удалить профил
function DeleteClientProfil()
{
  var ss2 = SpreadsheetApp.getActiveSpreadsheet();    
  var sheet = ss2.getSheetByName("tradingview");  
  var sheet1 =ss2.getSheetByName("Config");
  var Clientpo = 2
  sheet1.getRange("B1").setValue(0)
  sheet1.getRange("E"+Clientpo).setValue(sheet1.getRange("I1").getValue());

  sheet1.getRange("C"+Clientpo).setValue("")
  sheet1.getRange("D"+Clientpo).setValue("")
  sheet1.getRange("F"+Clientpo).setValue("")
  sheet1.getRange("G"+Clientpo).setValue(sheet1.getRange("I1").getValue());
  sheet1.getRange("H"+Clientpo).setValue("")
  updateClientProfil()
}

function uploadBinanceClient(sheet,sheet1)
{
  var num=FountNumberPairBinance(sheet1,sheet)
  sheet.getRange("M4").setValue(sheet1.getRange("J"+num).getValue());
  sheet.getRange("M5").setValue(sheet1.getRange("D2").getValue());
  sheet.getRange("M6").setValue("Binance");
  sheet.getRange("M7").setValue(sheet1.getRange("L"+num).getValue());
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(sheet1.getRange("H2").getDataValidation().getCriteriaValues()[0]).build();
  sheet.getRange("M8").setDataValidation(rule);
  sheet.getRange("M10").setValue(sheet1.getRange("M"+num).getValue());
  sheet.getRange("N10").setValue(sheet1.getRange("N"+num).getValue());
  sheet.getRange("M11").setValue(sheet1.getRange("O"+num).getValue());
  sheet.getRange("M12").setValue(sheet1.getRange("P"+num).getValue());
  sheet.getRange("N12").setValue(sheet1.getRange("Q"+num).getValue());
  sheet.getRange("M13").setValue(sheet1.getRange("R"+num).getValue());
  sheet.getRange("N13").setValue(sheet1.getRange("S"+num).getValue());
  sheet.getRange("M14").setValue(sheet1.getRange("T"+num).getValue());
  sheet.getRange("N14").setValue(sheet1.getRange("U"+num).getValue());
  sheet.getRange("N11").setValue(sheet1.getRange("V"+num).getValue());
  sheet.getRange("M15").setValue(sheet1.getRange("F2").getValue());
}
///////////////////////
///////////загрузить профиль 
function UploadClientProfilTradingview()
{
  var ss2 = SpreadsheetApp.getActiveSpreadsheet();    
  var sheet = ss2.getSheetByName("tradingview");  
  var sheet1 =ss2.getSheetByName("Config");
  var market = sheet.getRange("I5").getValue();
  if (market=="binance"){
    uploadBinanceClient(sheet,sheet1)
  }
  
  
  
    
}
///////////////////////////
////////////////////////////
//////////////если выбрана биржа binance
function addClientTradingviewBinance(market,sheet,sheet1,UserCount)
{
  var i=2;
  var UsCo=1
  var id = sheet.getRange("F5").getValue();
  var name = sheet.getRange("B5").getValue();
  var status = sheet.getRange("G5").getValue();
  var pairFiltr= [];
  pairFiltr[0]="LTCBNB"
  var api = [];
  api[0]= sheet.getRange("C5").getValue();   //api secret
  api[1]= sheet.getRange("D5").getValue();   //api key
  ///////////////////////////////
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(api).build();
  sheet1.getRange("G"+i).setDataValidation(rule);
  ////////////////////////////////////////
  var rule1 = SpreadsheetApp.newDataValidation().requireValueInList(pairFiltr).build();
  sheet1.getRange("H"+i).setDataValidation(rule1);
  ////////////////////////////////////////
  sheet1.getRange("C"+i).setValue(UsCo)
  ////////////////////////////////
  sheet1.getRange("D"+i).setValue(name)
  ////////////////////
  var setBot=[];
  var couPa = BinancePairСount();
  var countPair=couPa[1];
  var listPair=couPa[0];
  for (var i1 = 0; i1<countPair; i1++)
     {
      sheet1.getRange("I"+(i1+2)).setValue(listPair[i1])
      sheet1.getRange("J"+(i1+2)).setValue(status)
      sheet1.getRange("K"+(i1+2)).setValue(market)
      sheet1.getRange("L"+(i1+2)).setValue("ВЫКЛ")
      sheet1.getRange("M"+(i1+2)).setValue("market")
      sheet1.getRange("N"+(i1+2)).setValue("market")
      sheet1.getRange("O"+(i1+2)).setValue("10")
      sheet1.getRange("P"+(i1+2)).setValue("all")
      sheet1.getRange("Q"+(i1+2)).setValue("all")
      sheet1.getRange("R"+(i1+2)).setValue("20")
      sheet1.getRange("S"+(i1+2)).setValue("20")
      sheet1.getRange("T"+(i1+2)).setValue("10")
      sheet1.getRange("U"+(i1+2)).setValue("10")
      sheet1.getRange("V"+(i1+2)).setValue("10")
       
     }
  sheet1.getRange("F2").setValue(id)   
  //////////
  sheet1.getRange("B1").setValue(UsCo)   
}
///////////////////////////
/////////// обновление списка 
function updateClientProfil()
{
  var ss2 = SpreadsheetApp.getActiveSpreadsheet();    
  var sheet = ss2.getSheetByName("tradingview");  
  var sheet1 =ss2.getSheetByName("Config");
  var UserCount = sheet1.getRange("B1").getValue();
  var client=[];
  var listId
  for (var i =0;i<UserCount;i++)
    {
      listId= sheet1.getRange("D"+((i*1)+2)).getValue();
      client[i]=listId+"."+sheet1.getRange("F"+((i*1)+2)).getValue();;
    }
  var rule2 = SpreadsheetApp.newDataValidation().requireValueInList(client).build();
//  sheet.getRange("I5").setDataValidation(rule2);
}

/////////////////////
////////////проверка идентификатора на совпадение 
function CheckClientTradingview()
{
  var ss2 = SpreadsheetApp.getActiveSpreadsheet();    
  var sheet = ss2.getSheetByName("tradingview");  
  var sheet1 =ss2.getSheetByName("Config");
  var UserCount = sheet1.getRange("B1").getValue();
  var id = sheet.getRange("F5").getValue();
  sheet.getRange("E2").setValue("")
  var proverka=1;
  if (UserCount==0)
  {
  
    sheet.getRange("E2").setValue("Идентификатор может быть добавлен")
    proverka=1;
  }
  else if (UserCount>0)
  {
    Logger.log(UserCount)
    var listId;
    for (var i =2;i<=UserCount+1;i++)
    {
      listId= sheet1.getRange("F"+i).getValue();
      if (listId==id)
      {
         sheet.getRange("E2").setValue("Такой Идентификатор существует. Повторите попытку")
         proverka=0;
      }
    }
  }
  if (proverka==1)
  {
    sheet.getRange("E2").setValue("Идентификатор может быть добавлен")
  }
  return proverka;
  
}
