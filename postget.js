// запись листов таблицы в переменную
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName("API");
var telebot = ss.getSheetByName("telebot");
var logiSheet = ss.getSheetByName("log");
var signalSheet = ss.getSheetByName("signal");
var formulaSheet = ss.getSheetByName("formula");
var settingSheet = ss.getSheetByName("settings");
var com = ss.getSheetByName("com");


function doPost(e) {
  if (e.postData.type == "text/plain") {
    let message = e.postData.contents;
    comCommands.message = message;
    comCommands.comCheck();
    message = comCommands.message;
    obrabotkaMesageClass(message)
  }

}
