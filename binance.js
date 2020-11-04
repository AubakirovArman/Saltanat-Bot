// запись листов таблицы в переменную
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName("API");
var telebot = ss.getSheetByName("telebot");
var logiSheet = ss.getSheetByName("log");
var signalSheet = ss.getSheetByName("signal");
var formulaSheet = ss.getSheetByName("formula");
var settingSheet = ss.getSheetByName("settings");
var com = ss.getSheetByName("com");
var filterSheet = ss.getSheetByName("filter");

class binanceClass {
  constructor() {
    // api key 
    this.key = ""
    // api secret
    this.secret = ""
    this.baseUrl = ""
    this.pos = 0
    this.typeExchange = "/dapi";
    this.command = "";
    this.param = "";
    this.pair = "";
    this.side = "";
    this.type = "";
    this.timeInForce = "GTC";
    this.quantity = 1;
    this.price = 1;
    this.newOrderRespType = "ACK";
    this.stopPrice = 1;
    this.quoteOrderQty = 0;
    this.callbackRate = 0.5;
    this.market = "";
    this.leverage = 0;
    this.reduceOnly = "false";
    this.closePosition = "false";
    this.allClose = "false";
    this.signalCount = "";
    this.signalID = "";
    this.formula = "false";
    this.rowid = "";
    this.rowText = "";
    this.marketType = "spot";
    // первая валюта в валютной пары нужно будет для указаные количество в процентах
    this.baseAsset = "";
    // вторая валюта в валютной пары нужно будет для указаные количество в процентах
    this.quoteAsset = "";
    // фильтрация цены шаг
    this.tickSize = "";
    // фильтрация количество шаг
    this.stepSize = "";
    // статус фильтра если true тогда скрипт будет фильтровать цену и количетсов по правилам биржы бинанс
    this.filterStatus = false;
    // словарь в который при запуске скрипта будет записан фильтры по всем парам выбранной биржы
    this.filterDict = {};
    this.activationPrice=0;
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
    }
  }
  // Информация о пользователе спот
  BinanceAccountInfoSpot() {

    this.command = "/api/v3/account"
    this.param = ""
    this.pos = 2
  }
  BinanceFilterSpot() {

    this.command = "/api/v3/exchangeInfo"
    this.param = ""
    this.pos = 1
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
      if (this.activationPrice!=0){
        param=param+"&activationPrice="+this.activationPrice;
        this.activationPrice=0
      }
    }

    this.command = this.typeExchange + "/v1/order"
    this.param = param
    this.pos = 3

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
    this.command = this.typeExchange + "/v1/balance"
    this.param = ""
    this.pos = 2
  }
  BinanceFilterFutures() {
    this.command = this.typeExchange + "/v1/exchangeInfo"
    this.param = ""
    this.pos = 1
  }
  //// фильтрация цены и количество согласно фильтрам бинанс
  binancefilterStart() {

    if (this.filterStatus) {
      this.tickSize = this.filterDict[this.pair]['tickSize'];
      this.stepSize = this.filterDict[this.pair]['stepSize'];
      this.baseAsset = this.filterDict[this.pair]['baseAsset'];
      this.quoteAsset = this.filterDict[this.pair]['quoteAsset'];
      // начало фильтрации цена по правилам биржы
      this.tickSize = Number(this.tickSize).toFixed(8);
      let dot = (this.tickSize).indexOf('.');
      let position = (this.tickSize).indexOf('1');
      this.price = Number(this.price).toFixed(8);
      if (dot > position) {

        this.tickSize = Number(this.tickSize).toFixed(8);
        this.price = this.price - (this.price % this.tickSize);
      }
      else if (dot < position) {
        this.price = Number(this.price).toFixed(position - 1)
      }
      // конец фильтрации цена по правилам биржы
      // начало фильтрации количество по правилам биржы

      this.stepSize = Number(this.stepSize).toFixed(8);
      this.stepSize = (this.stepSize).toString();

      dot = (this.stepSize).indexOf('.');

      position = (this.stepSize).indexOf('1');

      this.quantity = Number(this.quantity).toFixed(8);
      if (dot > position) {

        this.stepSize = Number(this.stepSize).toFixed(8);
        this.quantity = this.quantity - (this.quantity % this.stepSize);
      }
      else if (dot < position) {

        this.quantity = Number(this.quantity).toFixed(position - 1)
      }

      // конец фильтрации количество по правилам биржы

    }

  }
  binanceStart() {
    this.binancefilterStart();

    if (this.marketType == "spot") {

      if (this.allClose == "true") {
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

        this.BinanceLeverageFutures();
        let r = this.binanceConnect();

      }

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

// класс для загрузки и обработки фильтров для бирж
class filterBinanceClass {
  constructor() {
    this.table = '';
    this.countDictIn = 0;
    this.countDictOut = 0;
    this.dict = new Map();
    this.json = {};
    this.text = {};
    this.pair = "BTCUSDT";
    this.razdelitel = 300;
    this.loadFilspot = {}
    this.loadFilFutures = {}
    this.symbol = 'A'
  }
  // функция загрузки фильтров из биржы и сохранение для фьючерсов 
  jsonFromDictFutures() {
    let r = this.json;
    this.dict = new Map();
    for (let i in r['symbols']) {
      this.dict[r['symbols'][i]['symbol']] = {
        'baseAsset': r['symbols'][i].baseAsset,
        'quoteAsset': r['symbols'][i].quoteAsset,
        'tickSize': r['symbols'][i]['filters'][0].tickSize,
        'stepSize': r['symbols'][i]['filters'][1].stepSize
      }
    }
    this.dict = JSON.stringify(this.dict)
    this.table.setValue(this.dict)
  }
  stringToDictFutures() {
    this.text = this.table.getValue();
    this.dict = JSON.parse(this.text)
    this.dict = this.dict[this.pair]
  }
  // функция загрузки фильтров из биржы и сохранение для спот 
  jsonFromDictSpot() {
    let kk = {};
    let r = this.json;
    this.countDictIn = 0
    kk[this.countDictIn] = {};

    for (let i in r['symbols']) {

      if ((i % this.razdelitel == 0) && (i > 0)) {
        this.countDictIn++;

        kk[this.countDictIn] = {};
      }
      let pair1 = r['symbols'][i]['symbol'];

      kk[this.countDictIn][r['symbols'][i]['symbol']] = {
        'baseAsset': r['symbols'][i].baseAsset,
        'quoteAsset': r['symbols'][i].quoteAsset,
        'tickSize': r['symbols'][i]['filters'][0].tickSize,
        'stepSize': r['symbols'][i]['filters'][2].stepSize
      }


    }
    let range = 2;
    for (let i = 0; i <= this.countDictIn; i++) {
      let res = JSON.stringify(kk[i])
      res = res.toString()
      res = res.slice(1, res.length - 2)
      filterSheet.getRange("A" + (range + i)).setValue(res);
    }
    filterSheet.getRange("G1").setValue(this.countDictIn);

  }
  // функция загрузки фильтров для спот

  loadFilterSpot() {
    let count = filterSheet.getRange("G1").getValue();
    count += 2;

    let textToDict = '{';
    for (let i = 2; i <= count; i++) {

      textToDict += filterSheet.getRange("A" + i).getValue();
      if (i < count) {
        textToDict += ',';
      }
    }
    textToDict += '}'

    this.loadFilspot = JSON.parse(textToDict);
  }
  // функция загрузки фильтров для фьючерсов
  loadFilterFutures() {
    this.loadFilFutures = JSON.parse(filterSheet.getRange(this.symbol + "2").getValue());
  }
}

//// создание переменной класса фильтр
var filterComman = new filterBinanceClass();
////binance
var binance = new binanceClass();
binance.secret = sheet.getRange("B3").getValue();
binance.key = sheet.getRange("B2").getValue();
binance.baseUrl = "https://api.binance.com";
binance.marketType = "spot"
filterComman.loadFilterSpot();
binance.filterDict = filterComman.loadFilspot;
///// binance futures REAL usdt
var binanceFru = new binanceClass();
binanceFru.key = sheet.getRange("B2").getValue();
binanceFru.secret = sheet.getRange("B3").getValue();
binanceFru.baseUrl = "https://fapi.binance.com";
binanceFru.typeExchange = "/fapi";
binanceFru.marketType = "futures"
filterComman.symbol = "D"
filterComman.loadFilterFutures();
binanceFru.filterDict = filterComman.loadFilFutures;
///// binance futures real coin
var binanceFro = new binanceClass();
binanceFro.key = sheet.getRange("B2").getValue();
binanceFro.secret = sheet.getRange("B3").getValue();
binanceFro.baseUrl = "https://dapi.binance.com";
binanceFro.typeExchange = "/dapi";
binanceFro.marketType = "futures"
filterComman.symbol = "E"
filterComman.loadFilterFutures();
binanceFro.filterDict = filterComman.loadFilFutures;
///// binance futures testnet usdt
var binanceFtu = new binanceClass();
binanceFtu.key = sheet.getRange("C2").getValue();
binanceFtu.secret = sheet.getRange("C3").getValue();
binanceFtu.baseUrl = "https://testnet.binancefuture.com";
binanceFtu.typeExchange = "/fapi";
binanceFtu.marketType = "futures"
filterComman.symbol = "C"
filterComman.loadFilterFutures();
binanceFtu.filterDict = filterComman.loadFilFutures;
///// binance futures testnet coin
var binanceFto = new binanceClass();
binanceFto.key = sheet.getRange("C2").getValue();
binanceFto.secret = sheet.getRange("C3").getValue();
binanceFto.baseUrl = "https://testnet.binancefuture.com";
binanceFto.typeExchange = "/dapi";
binanceFto.marketType = "futures"
filterComman.symbol = "B"
filterComman.loadFilterFutures();
binanceFto.filterDict = filterComman.loadFilFutures;
/////dict market 
var marketDict = {
  'binance': binance,
  'binanceftu': binanceFtu,
  'binancefto': binanceFto,
  'binancefru': binanceFru,
  'binancefro': binanceFro,
}