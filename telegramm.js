class telegram {
  constructor() {
    this.token = ""
    this.id = ""
    this.url = ""
    this.text = ""
    this.answerMarket = ""
    this.status = "выкл"
    this.params = {
      'method': 'post',
      'muteHttpExceptions': true
    }
  }
  // отправка сообщение в телеграмм
  telegramSendLog() {
    if (this.status == "вкл") {
      this.answerMarket=JSON.stringify(this.answerMarket)
      this.answerMarket = this.answerMarket.replace("{", "");
      this.answerMarket = this.answerMarket.replace("}", "");
      let text = "Команда от tradingview:\n" + this.text + "\n" + "\n Oтвет биржы:\n (" + this.answerMarket + ")";

      this.message = this.url + "/sendMessage?chat_id=" + this.id + "&text=" + text;
      let urlEncoded = encodeURI(this.message);
      UrlFetchApp.fetch(urlEncoded, this.params);
    }
  }
  telegramSend() {
    if (this.status == "вкл") {
      this.message = this.url + "/sendMessage?chat_id=" + this.id + "&text=" + this.text;
      let urlEncoded = encodeURI(this.message);
      UrlFetchApp.fetch(urlEncoded, this.params);
    }
  }
}


// /// telegramm оповещение
var teleg =new telegram();
teleg.status=settingSheet.getRange("B3").getValue();
teleg.id=telebot.getRange("B3").getValue();
teleg.token=telebot.getRange("B2").getValue();
teleg.url="https://api.telegram.org/bot"+teleg.token;