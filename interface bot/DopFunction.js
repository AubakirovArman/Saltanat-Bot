 var ss = SpreadsheetApp.getActiveSpreadsheet();


///////////////////////////////
/////////проверка информационной таблицы 
function infoProverka(infoStep,list)
{  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(list);
  if (infoStep>=31)
  {
    for(var i = 1; i<=(infoStep+4);i++)
    {
      sheet.getRange("A"+(i+19)).setValue("");
    }
    sheet.getRange("C19").setValue(1);
  }
}
///////////////////////////
/////////////функция ожидания 
function sleep(ms) 
{
  ms += new Date().getTime();
  while (new Date() < ms){}
} 

////////////////////////////////
//////////Удаление последнего бота
function DeleteBotlast(stroka,list)
{
  stroka++;
 
  var sheet = ss.getSheetByName(list);
  sheet.getRange("E"+stroka).setValue("");      sheet.getRange("F"+stroka).setValue("");    sheet.getRange("G"+stroka).setValue(""); sheet.getRange("Q"+stroka).setValue("");
  sheet.getRange("H"+stroka).setValue("");      sheet.getRange("I"+stroka).setValue("");    sheet.getRange("J"+stroka).setValue(""); sheet.getRange("R"+stroka).setValue("");
  sheet.getRange("K"+stroka).setValue("");      sheet.getRange("L"+stroka).setValue("");    sheet.getRange("M"+stroka).setValue(""); sheet.getRange("S"+stroka).setValue("");
  sheet.getRange("N"+stroka).setValue("");      sheet.getRange("O"+stroka).setValue("");    sheet.getRange("P"+stroka).setValue(""); sheet.getRange("T"+stroka).setValue("");
  sheet.getRange("U"+stroka).setValue("");      sheet.getRange("V"+stroka).setValue("");    sheet.getRange("W"+stroka).setValue(""); sheet.getRange("X"+stroka).setValue("");
  sheet.getRange("Y"+stroka).setValue("");      sheet.getRange("Z"+stroka).setValue("");    sheet.getRange("AA"+stroka).setValue(""); sheet.getRange("AB"+stroka).setValue(""); 
  sheet.getRange("AC"+stroka).setValue("");     sheet.getRange("AD"+stroka).setValue("");   sheet.getRange("AE"+stroka).setValue("");    sheet.getRange("AF"+stroka).setValue("");
  sheet.getRange("AG"+stroka).setValue("");    sheet.getRange("AH"+stroka).setValue("");    sheet.getRange("AI"+stroka).setValue("");   sheet.getRange("AJ"+stroka).setValue(""); 
  sheet.getRange("AK"+stroka).setValue("");   sheet.getRange("AL"+stroka).setValue("");    sheet.getRange("AM"+stroka).setValue(""); 
}

/////////////////////////
//////Удаление бота по номеру
function DeleteBotNow(numberBot,allBotNumber,list)
{
  numberBot++;
  allBotNumber++
    var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(list);
  sheet.getRange("F"+numberBot).setValue(sheet.getRange("F"+allBotNumber).getValue());
  sheet.getRange("G"+numberBot).setValue(sheet.getRange("G"+allBotNumber).getValue());
  sheet.getRange("H"+numberBot).setValue(sheet.getRange("H"+allBotNumber).getValue());
  sheet.getRange("J"+numberBot).setValue(sheet.getRange("J"+allBotNumber).getValue());
  sheet.getRange("K"+numberBot).setValue(sheet.getRange("K"+allBotNumber).getValue());
  sheet.getRange("L"+numberBot).setValue(sheet.getRange("L"+allBotNumber).getValue());
  sheet.getRange("M"+numberBot).setValue(sheet.getRange("M"+allBotNumber).getValue());
  sheet.getRange("N"+numberBot).setValue(sheet.getRange("N"+allBotNumber).getValue());
  sheet.getRange("O"+numberBot).setValue(sheet.getRange("O"+allBotNumber).getValue());
  sheet.getRange("P"+numberBot).setValue(sheet.getRange("P"+allBotNumber).getValue());
  sheet.getRange("Q"+numberBot).setValue(sheet.getRange("Q"+allBotNumber).getValue());
  sheet.getRange("R"+numberBot).setValue(sheet.getRange("R"+allBotNumber).getValue());
  sheet.getRange("S"+numberBot).setValue(sheet.getRange("S"+allBotNumber).getValue());
  sheet.getRange("T"+numberBot).setValue(sheet.getRange("T"+allBotNumber).getValue());
  sheet.getRange("U"+numberBot).setValue(sheet.getRange("U"+allBotNumber).getValue());
  sheet.getRange("V"+numberBot).setValue(sheet.getRange("V"+allBotNumber).getValue());
  sheet.getRange("W"+numberBot).setValue(sheet.getRange("W"+allBotNumber).getValue());
  sheet.getRange("X"+numberBot).setValue(sheet.getRange("X"+allBotNumber).getValue());
  sheet.getRange("Y"+numberBot).setValue(sheet.getRange("Y"+allBotNumber).getValue());
  sheet.getRange("Z"+numberBot).setValue(sheet.getRange("Z"+allBotNumber).getValue());
  sheet.getRange("AA"+numberBot).setValue(sheet.getRange("AA"+allBotNumber).getValue());
  sheet.getRange("AB"+numberBot).setValue(sheet.getRange("AB"+allBotNumber).getValue());
  sheet.getRange("AC"+numberBot).setValue(sheet.getRange("AC"+allBotNumber).getValue());
  sheet.getRange("AD"+numberBot).setValue(sheet.getRange("AD"+allBotNumber).getValue());
  sheet.getRange("AE"+numberBot).setValue(sheet.getRange("AE"+allBotNumber).getValue());
  sheet.getRange("AF"+numberBot).setValue(sheet.getRange("AF"+allBotNumber).getValue());
  sheet.getRange("AG"+numberBot).setValue(sheet.getRange("AG"+allBotNumber).getValue());
  sheet.getRange("AH"+numberBot).setValue(sheet.getRange("AH"+allBotNumber).getValue());
  sheet.getRange("AI"+numberBot).setValue(sheet.getRange("AI"+allBotNumber).getValue());
  sheet.getRange("AJ"+numberBot).setValue(sheet.getRange("AJ"+allBotNumber).getValue());
  sheet.getRange("AK"+numberBot).setValue(sheet.getRange("AK"+allBotNumber).getValue());
  sheet.getRange("AL"+numberBot).setValue(sheet.getRange("AL"+allBotNumber).getValue());
  sheet.getRange("AM"+numberBot).setValue(sheet.getRange("AM"+allBotNumber).getValue());
}
///////////////////////////
/////////обновление значение по количеству бота
function UpdateDeleteBots(stroka,list)
{
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(list);
  var count=[];
  for (var i = 0; i<=stroka;i++)
  {
    count[i-1]=i;
  }
  var co = SpreadsheetApp.newDataValidation().requireValueInList(count).build();
  sheet.getRange("B17").setDataValidation(co);
}