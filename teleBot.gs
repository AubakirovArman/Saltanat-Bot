var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet1 = ss.getSheetByName("Config");
var sheet = ss.getSheetByName("ExmoBot");
var rite = ss.getSheetByName("telegramm")


var token = sheet1.getRange("B6").getValue(); // FILL IN YOUR OWN TOKEN
var telegramUrl = "https://api.telegram.org/bot" + token;

function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}
///вэбхуки
function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}
//отправить ответное сообшение
function sendText(id,text) {
  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}
//проверка вэбхуки
function doGet(e) {
  return HtmlService.createHtmlOutput("Вэбхуки работает");
}
//входяшие сообщения
function doPost(e) {
  var MyId = sheet1.getRange("B7").getValue();
  var data = JSON.parse(e.postData.contents);
  var text = data.message.text;
  var id = data.message.chat.id;
  var name = data.message.chat.first_name + " " + data.message.chat.last_name;
  if (MyId==id)
  {
    if (text.toLowerCase()=="status")
    {
      statusBot(MyId);
    }
    else if ((text.toLowerCase()=="balance")||(text.toLowerCase()=="баланс"))
    {
      balancTele(MyId);
    }
  }
  else if (MyId!=id)
  {
  if (text!="")
  {
    text="Ваш ID telegramma = "+id;
    sendText(id,text)
  }
  }
  rite.appendRow([new Date(),id,name,text,answer]);  
  if(/^@/.test(text)) {
    var sheetName = text.slice(1).split(" ")[0];
    var comment = text.split(" ").slice(1).join(" ");
    rite.appendRow([new Date(),id,name,comment,answer]);
  }
}

///проверка статуса ботов 
function statusBot(MyId)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ExmoBot");
  var exmo = sheet.getRange("B6").getValue();
  var binance;
  var text="null";
  if (exmo.toLowerCase()=="work")
  {
    var i = sheet.getRange("D1").getValue();
    var order = sheet.getRange("D2").getValue();
    var price = sheet.getRange("D4").getValue();
    var count = sheet.getRange("D5").getValue();
    text="ExmoBot запущен"+"%0A"+
      "Бот находиться на шаге №"+i+"%0A"+
       "Ордер под №"+order+"%0A"+
         "Цена ордера = "+price+"%0A"+
           "Количеситво = "+count;
      
  }
  else
  {
    text="ExmoBot остановлен"
  }
  sendText(MyId,text);
}
//проверка баланса
function balancTele(MyId)
{
  var balance = Exmo("user_info");
  var pair = ["USD","EUR","RUB","PLN","UAH","BTC","LTC","DOGE","DASH","ETH","WAVES","ZEC","USDT","XMR","XRP","KICK","ETC","BCH","BTG","EOS","HBZ","BTCZ","DXT","STQ","XLM"];
  var Balan;
  var Reserv;
  var text="---Ваш баланс на биржах";
  text = text+ "%0A"+ "---На бирже Exmo"
  for (var i=0;i<25;i++)
  {
    Balan = balance['balances'][pair[i]];
    Reserv= balance['reserved'][pair[i]];
    if (Balan!=0)
    {
      text = text +"%0A"+ "---Баланс "+pair[i]+"="+Balan;   
    }
    if (Reserv!=0)
    {
      text = text +"%0A"+ "---В резерве "+pair[i]+"="+Reserv;   
    }

  }
  sendText(MyId,text);
  Logger.log(pair[0])
}

/////////////////////////
///////отправка сообщении в телеграмм 
function sendMessage(text)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet1 = ss.getSheetByName("Config");
  var MyId = sheet1.getRange("B7").getValue();
  sendText(MyId,text);
}