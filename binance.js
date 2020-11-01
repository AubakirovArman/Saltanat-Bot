// запись листов таблицы в переменную
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName("API");
var telebot = ss.getSheetByName("telebot");
var logiSheet = ss.getSheetByName("log");
var signalSheet = ss.getSheetByName("signal");
var formulaSheet = ss.getSheetByName("formula");
var settingSheet = ss.getSheetByName("settings");
var com = ss.getSheetByName("com");


class binanceClass {
  constructor() {
    this.key = ""
    this.secret = ""
    this.baseUrl = ""
    this.pos = 0
    this.typeExchange = "/dapi"
    this.command = ""
    this.param = ""
    this.pair = ""
    this.side = ""
    this.type = ""
    this.timeInForce = "GTC"
    this.quantity = 0
    this.price = 0
    this.newOrderRespType = "ACK"
    this.stopPrice = 0
    this.quoteOrderQty = 0
    this.callbackRate = 0.5
    this.market = ""
    this.leverage = 0
    this.reduceOnly = "false"
    this.closePosition = "false"
    this.allClose = "false"
    this.signalCount = ""
    this.signalID = ""
    this.formula = "false"
    this.rowid = ""
    this.rowText = ""
    this.marketType = "spot"
  }
  // соединитель через которое отправляються команды в биржу 
  binanceConnect() {

    let timestamp = Number(new Date().getTime()).toFixed(0);
    if (this.pos == 0) {
      let params = {
        'method': 'get',
        'headers': { 'X-MBX-APIKEY': this.key },
        'muteHttpExceptions': true
      };
      let string = this.param
      let query = "?" + string
      var response = UrlFetchApp.fetch(this.baseUrl + this.command + query, params);
    }
    if (this.pos == 1) {
      let string = this.param
      let query = "?" + string
      var response = UrlFetchApp.fetch(this.baseUrl + this.command + query);
    }
    else if (this.pos == 2) {
      let string = this.param + "&timestamp=" + timestamp;

      let signature = Utilities.computeHmacSha256Signature(string, this.secret);

      signature = signature.map(function (e) {
        let v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v;
      }).join("");
      let query = "?" + string + "&signature=" + signature;
      let params = {
        'method': 'get',
        'headers': { 'X-MBX-APIKEY': this.key },
        'muteHttpExceptions': true
      };
      var response = UrlFetchApp.fetch(this.baseUrl + this.command + query, params);
    }
    else if (this.pos == 3) {
      let string = this.param + "&timestamp=" + timestamp;
      let signature = Utilities.computeHmacSha256Signature(string, this.secret);

      signature = signature.map(function (e) {
        let v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v;
      }).join("");
      let query = "?" + string + "&signature=" + signature;
      let params = {
        'method': 'POST',
        'headers': { 'X-MBX-APIKEY': this.key },
        'muteHttpExceptions': true
      };
      var response = UrlFetchApp.fetch(this.baseUrl + this.command + query, params);
    }
    else if (this.pos == 4) {
      let string = this.param + "&timestamp=" + timestamp;
      let signature = Utilities.computeHmacSha256Signature(string, this.secret);
      signature = signature.map(function (e) {
        let v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v;
      }).join("");
      let query = "?" + string + "&signature=" + signature;
      let params = {
        'method': 'DELETE',
        'headers': { 'X-MBX-APIKEY': this.key },
        'muteHttpExceptions': true
      };
      var response = UrlFetchApp.fetch(this.baseUrl + this.command + query, params);
    }
    let data = JSON.parse(response.getContentText());
    return data;
  }

  //////создание ордеров для спот
  BinanceCreatOrderSpot() {
    let param = "symbol=" + this.pair + "&side=" + this.side + "&type=" + this.type + "&newOrderRespType=" + this.newOrderRespType;
    if (this.type == "LIMIT") {
      param = param + "&timeInForce=" + this.timeInForce + "&quantity=" + this.quantity + "&price=" + this.price;
    }
    else if ((this.type == "MARKET") && (this.quoteOrderQty == 0)) {
      param = param + "&quantity=" + this.quantity;
    }
    else if ((this.type == "MARKET") && (this.quoteOrderQty != 0)) {
      param = param + "&quoteOrderQty=" + this.quoteOrderQty;
    }
    else if ((this.type == "STOP_LOSS") || (this.type == "TAKE_PROFIT")) {
      param = param + "&quantity=" + this.quantity + "&stopPrice=" + this.stopPrice;
    }
    else if ((this.type == "STOP_LOSS_LIMIT") || (this.type == "TAKE_PROFIT_LIMIT")) {
      param = param + "&timeInForce=" + this.timeInForce + "&quantity=" + this.quantity + "&price=" + this.price + "&stopPrice=" + this.stopPrice;
    }
    else if (this.type == "LIMIT_MAKER") {
      param = param + "&quantity=" + this.quantity + "&price=" + this.price;
    }
    this.command = "/api/v3/order"
    this.param = param
    this.pos = 3











  }
  ////закрытие всех ордеров спота по выбранной валютной пары
  BinanceCloseAllOrderSpot() {
    if (this.allClose == "true") {
      this.command = "/api/v3/openOrders"
      this.param = "&symbol=" + this.pair
      this.pos = 4
    } else if (this.allClose == "all") {
      this.command = "/api/v3/openOrders"
      this.param = ""
      this.pos = 4
    }
  }
  // Информация о пользователе спот
  BinanceAccountInfoSpot() {

    this.command = "/api/v3/account"
    this.param = ""
    this.pos = 2
  }
  //////создание ордеров для фьючерсов
  BinanceCreatOrderFutures() {
    let param = "symbol=" + this.pair + "&side=" + this.side + "&type=" + this.type + "&quantity=" + this.quantity + "&newOrderRespType=" + this.newOrderRespType;
    if (this.type == "LIMIT") {
      param = param + "&timeInForce=" + this.timeInForce + "&price=" + this.price + "&reduceOnly=" + this.reduceOnly;
    }
    else if (this.type == "MARKET") {
      param = param + "&reduceOnly=" + this.reduceOnly;
    }
    else if ((this.type == "STOP") || (this.type == "TAKE_PROFIT")) {
      param = param + "&price=" + this.price + "&stopPrice=" + this.stopPrice + "&reduceOnly=" + this.reduceOnly;
    }
    else if ((this.type == "STOP_MARKET") || (this.type == "TAKE_PROFIT_MARKET")) {
      if (this.closePosition == "true") {
        param = param + "&timeInForce=" + this.timeInForce + "&stopPrice=" + this.stopPrice + "&closePosition=" + this.closePosition;
      }
      else {
        param = param + "&timeInForce=" + this.timeInForce + "&stopPrice=" + this.stopPrice + "&reduceOnly=" + this.reduceOnly;
      }
    }
    else if (this.type == "TRAILING_STOP_MARKET") {
      param = param + "&quantity=" + this.quantity + "&callbackRate=" + this.callbackRate + "&reduceOnly=" + this.reduceOnly;
    }

    this.command = this.typeExchange + "/v1/order"
    this.param = param
    this.pos = 3
    console.log(this.param)
  }
  ////закрытие всех ордеров фьючерсов по выбранной валютной пары
  BinanceCloseAllOrderFutures() {
    if (this.allClose == "true") {
      this.command = this.typeExchange + "/v1/allOpenOrders"
      this.param = "&symbol=" + this.pair
      this.pos = 4
    }
    else if (this.allClose == "all") {
      this.command = this.typeExchange + "/v1/allOpenOrders"
      this.param = ""
      this.pos = 4

    }
  }
  /////изменение плеча во фьючерсах
  BinanceLeverageFutures() {
    this.param = "symbol=" + this.pair + "&leverage=" + Number(this.leverage)
    this.command = this.typeExchange + "/v1/leverage"
    this.pos = 3

  }
  // Информация о пользователе фьючерсах
  BinanceAccountInfoFutures() {
    this.command = this.typeExchange + "/v1/account"
    this.param = ""
    this.pos = 2
  }
  binanceStart() {
    if (this.marketType == "spot") {
      if (this.allClose != "false") {
        this.BinanceCloseAllOrderSpot();
        return this.binanceConnect();
      }
      else {
        this.BinanceCreatOrderSpot();
        return this.binanceConnect();
      }
    }
    else if (this.marketType == "futures") {
      if (this.leverage != 0) {
        // плеча 
        console.log(this.leverage)
        this.BinanceLeverageFutures();
        let r= this.binanceConnect();
        console.log('ss')
        console.log(r)
      }
	  console.log('futures')
      if (this.allClose != "false") {
        /////// запуск команды закрытие ордеров фьючерсный рынок
        this.BinanceCloseAllOrderFutures();
        return this.binanceConnect();
      }
      else {
        // запуск создание ордера
        this.BinanceCreatOrderFutures();
        return this.binanceConnect();
      }


    }
  }

}




////binance
var binance = new binanceClass();
binance.secret = sheet.getRange("B3").getValue();
binance.key = sheet.getRange("B2").getValue();
binance.baseUrl = "https://api.binance.com";
binance.marketType="spot"
///// binance futures REAL usdt
var binanceFru = new binanceClass();
binanceFru.key = sheet.getRange("B2").getValue();
binanceFru.secret = sheet.getRange("B3").getValue();
binanceFru.baseUrl = "https://fapi.binance.com";
binanceFru.typeExchange = "/fapi";
binanceFru.marketType="futures"
///// binance futures real coin
var binanceFro = new binanceClass();
binanceFro.key = sheet.getRange("B2").getValue();
binanceFro.secret = sheet.getRange("B3").getValue();
binanceFro.baseUrl = "https://dapi.binance.com";
binanceFro.typeExchange = "/dapi";
binanceFro.marketType="futures"
///// binance futures testnet usdt
var binanceFtu = new binanceClass();
binanceFtu.key = sheet.getRange("C2").getValue();
binanceFtu.secret = sheet.getRange("C3").getValue();
binanceFtu.baseUrl = "https://testnet.binancefuture.com";
binanceFtu.typeExchange = "/fapi";
binanceFtu.marketType="futures"
///// binance futures testnet coin
var binanceFto = new binanceClass();
binanceFto.key = sheet.getRange("C2").getValue();
binanceFto.secret = sheet.getRange("C3").getValue();
binanceFto.baseUrl = "https://testnet.binancefuture.com";
binanceFto.typeExchange = "/dapi";
binanceFto.marketType="futures"
/////dict market 
var marketDict={
    'binance':binance,
    'binanceftu':binanceFtu,
    'binancefto':binanceFto,
    'binancefru':binanceFru,
    'binancefro':binanceFro,
}