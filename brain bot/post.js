var ss = SpreadsheetApp.openById("1fdv0MVOvxNzqGDXVrQWNyJK5E3qZhh_zCTvb-_9AYbM");
var sheet = ss.getSheetByName("API");
var telebot = ss.getSheetByName("telebot");
var exmopairFiltr = ss.getSheetByName("ExmoSettingPair");
var binancepairFiltr = ss.getSheetByName("BinanceSettingPair");
var bitmexpairFiltr = ss.getSheetByName("BitmexSettingPair");
var logiSheet = ss.getSheetByName("log");
///////////////
function foundOrder(market, type, pair, idUser,mesageDate,mesage) {
  if (market == "exmo") {
    var count = exmopairFiltr.getRange("A1").getValue() + 1;
    var position = 0;
    for (var i = 2; i <= count; i++) {
      if (pair == exmopairFiltr.getRange("B" + i).getValue()) {
        position = i;
        i = i + count;
      }
    }
    preSettingExmo(type, pair, position, exmopairFiltr,mesageDate,mesage,logiSheet)
  }
  else if (market == "bitmex") { 
    var count = bitmexpairFiltr.getRange("A1").getValue() + 1;
    var position = 0;
    for (var i = 2; i <= count; i++) {
      if (pair == bitmexpairFiltr.getRange("B" + i).getValue()) {
        position = i;
        i = i + count;
      }
    }
    preSettingBitmex(type, pair, position, bitmexpairFiltr,mesageDate,mesage,logiSheet)
  }
  else if (market == "binance") {
    var count = binancepairFiltr.getRange("A1").getValue() + 1;
    var position = 0;
    for (var i = 2; i <= count; i++) {
      if (pair == binancepairFiltr.getRange("B" + i).getValue()) {
        position = i;
        i = i + count;
      }
    }
    preSettingBinance(type, pair, position, binancepairFiltr,mesageDate,mesage,logiSheet)
   }
}



//////////// прием сигнала от почты 
function doPost(e) {
  var stat = sheet.getRange("R6").getValue();
  logiSheet .getRange("R6").setValue("Пришло новое письмо ="+(new Date()));
  var firstThread = GmailApp.getUserLabelByName("tradingview").getThreads();
  var mailCount = firstThread.length;
  if (mailCount > 0) {
    postClone(firstThread, mailCount)
  }
  var response = HtmlService.createHtmlOutput();
  return response;
}

function postClone(firstThread, mailCount) {
  var clone = 0;
  var logi = logiSheet 
  var count = logi.getRange("T1").getValue();
  for (var i = 0; i < mailCount; i++) {
    var time = firstThread[i].getLastMessageDate();
    var mesage = firstThread[i].getFirstMessageSubject();
    var id = firstThread[i].getId();
    for (var i1 = 0; i1 < count; i1++) {
      var timeSheet = logi.getRange("W" + (i1 + 2)).getValue();
      var mesageSheet = logi.getRange("V" + (i1 + 2)).getValue();
      if ((time.toString() == timeSheet)) {
        clone = 1;
        var c = logi.getRange("Y" + (i1 + 2)).getValue();
        c = (c * 1) + 1;
        logi.getRange("Y" + (i1 + 2)).setValue(c);
      }
    }
    if (clone == 0) {
      count=(count*1)+1
      logi.getRange("U"+(count+1)).setValue(count);
      logi.getRange("V" + (count + 1)).setValue(mesage);
      logi.getRange("W" + (count + 1)).setValue(time);
      logi.getRange("X" + (count + 1)).setValue(id);
      logi.getRange("Y" + (count + 1)).setValue(0);
      logi.getRange("T1").setValue(count)
      var mesageDate =firstThread[0].getLastMessageDate()
      var market = mesage.slice(mesage.indexOf("ma=") + 3, mesage.indexOf("."))
      var type = (mesage.slice(mesage.indexOf(".") + 1)).slice(0, (mesage.slice(mesage.indexOf(".") + 1)).indexOf("."))
      var str3 = mesage.slice(mesage.indexOf(type) + ".")
      str3 = str3.slice(str3.indexOf(".") + 1)
      var pair = str3.slice(0, str3.indexOf("."))
      var str4 = mesage.slice(mesage.indexOf(pair) + ".")
      var idUser = str4.slice(str4.indexOf(".") + 1)
    
      GmailApp.getMessageById(id).getThread().moveToTrash()
      if (idUser==sheet.getRange("E2").getValue()){
        foundOrder(market, type, pair, idUser,mesageDate,mesage)
      }
    }
    else if (clone == 1) {
  GmailApp.getMessageById(id).getThread().moveToTrash()
      clone = 0;
    }
  }
}
function adasd(){
  var firstThread = GmailApp.getUserLabelByName("tradingview").getThreads();
  var mailCount = firstThread.length;
  var re =firstThread[0].getFirstMessageSubject();
  var id = firstThread[0].getId();
  Logger.log(re)
  Logger.log(id)
}
function enrollEmail() {
  var watchRes = Gmail.newWatchRequest();
  watchRes.labelIds = ["INBOX"];
  watchRes.labelFilterAction = "include";
  watchRes.topicName = "projects/warm-now-250202/topics/yhh";
  var response = Gmail.Users.watch(watchRes, "armanibadboy@gmail.com");
  Logger.log(response)
}

