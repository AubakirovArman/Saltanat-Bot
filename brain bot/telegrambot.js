var ss = SpreadsheetApp.openById("1fdv0MVOvxNzqGDXVrQWNyJK5E3qZhh_zCTvb-_9AYbM");
var rite = ss.getSheetByName("telebot");
var token = rite.getRange("B2").getValue(); // FILL IN YOUR OWN TOKEN
var telegramUrl = "https://api.telegram.org/bot" + token;

function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
}
///вэбхуки
function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
}
////////////////////////узнаем ид канала 
function findChannelID(){
  var text = "узнаем id канала"
    var url1 = telegramUrl + "/sendMessage?chat_id=@"+rite.getRange("B5").getValue() + "&text=" + text;
  var response1 = UrlFetchApp.fetch(url1);

  var res = JSON.parse(response1)
  url1 = telegramUrl + "/sendMessage?chat_id=@"+rite.getRange("B5").getValue() + "&text=" + res.result.chat.id;
  UrlFetchApp.fetch(url1);
  rite.getRange("C5").setValue(res.result.chat.id)
}
/////////////////////////
///////отправка сообщении в телеграмм 
function sendMessage(text)
{
  var url1 = telegramUrl + "/sendMessage?chat_id="+rite.getRange("C5").getValue() + "&text=" + text;
  var response1 = UrlFetchApp.fetch(url1);
  var count = rite.getRange("D3").getValue();
  var url=[];
  var co=0;
  var pro=0;
  for (var i=0; i<count;i++)
  {
    if (i%5!=0)
    {
      url[co] = telegramUrl + "/sendMessage?chat_id=" + rite.getRange("E"+(i+4)).getValue() + "&text=" + text;
      co++;
      pro=1;
    }
    else 
    {
      url[co] = telegramUrl + "/sendMessage?chat_id=" + rite.getRange("E"+(i+4)).getValue() + "&text=" + text;
      var response = UrlFetchApp.fetchAll(url);
      url=[];
      co=0;
      pro=0;
    }
  }
  if (pro==0)
  {
    var response = UrlFetchApp.fetchAll(url);
  }
  
}