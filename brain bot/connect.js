var ss = SpreadsheetApp.openById("1fdv0MVOvxNzqGDXVrQWNyJK5E3qZhh_zCTvb-_9AYbM");
var sheet = ss.getSheetByName("API");
/////////соединение с биржей bitmex
function Bitmex(command, data, method, pos) {

  var baseUrl = "https://www.bitmex.com";
  var key = sheet.getRange("C2").getValue();
  var secret = sheet.getRange("C3").getValue();
  var timestamp = Math.floor(new Date().getTime() / 1000) + 2 + "";
  var postBody = JSON.stringify(data);

  if (pos == 1) {
    var options = {
      method: method,
      contenttype: "application/json; charset=utf-8",
      payload: data
    }
    var response = UrlFetchApp.fetch(baseUrl + command, options);
  }
  if (pos == 0) {
    var options = {
      method: method,
      contenttype: "application/json; charset=utf-8",

    }
    var response = UrlFetchApp.fetch(baseUrl + command + "?" + data, options);
  }
  if (pos == 4) {
    var options = {
      method: method,
      contenttype: "application/json; charset=utf-8",

    }
    var response = UrlFetchApp.fetch(baseUrl + command, options);
  }
  else if (pos == 2) {
    var string = method + command + timestamp;
    var signature = Utilities.computeHmacSha256Signature(string, secret);

    signature = signature.map(function (e) { var v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v; }).join("");
    var options = {
      method: method,
      contentType: "application/json; charset=utf-8",

      headers: {
        "api-expires": timestamp,
        "api-key": key,
        "api-signature": signature
      },
      payload: data
    }


    var response = UrlFetchApp.fetch(baseUrl + command, options);
  }
  else if (pos == 3) {
    Logger.log(JSON.stringify(data))
    var string = method + command + timestamp + JSON.stringify(data)
    var signature = Utilities.computeHmacSha256Signature(string, secret);

    signature = signature.map(function (e) { var v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v; }).join("");
    var options = {
      method: method,
      contentType: "application/json; charset=utf-8",
      headers: {
        "api-expires": timestamp,
        "api-key": key,
        "api-signature": signature
      },
      payload: JSON.stringify(data)
    }

    var url = encodeURI(baseUrl + command)
    var response = UrlFetchApp.fetch(url, options);
  }
  var data = JSON.parse(response.getContentText());
  return data;
}


///////////////////////////////////////////////////////////////////////
//////////////////Bitfinex подключение 
function bytesToHex(data) {
  return data.map(function (e) {
    var v = (e < 0 ? e + 256 : e).toString(16);
    return v.length == 1 ? "0" + v : v;
  }).join("");
}
function Bitfinex(method, apiPath, pos, vid) {
  apiPath = "/v1/balances"
  vid = 2;

  var apiKey = "5z3loWwPOioPgNGAxTk2OOVRHn0ugH4nX6dHiiQqWpf"
  var apiSecret = "tUeKq8mkezEupZbC5jRUEfucgYM03aYrSUlIaSwqtuV"
  var nonce = Date.now().toString();
  var body = {};
  var rawBody = JSON.stringify(body);
  var signature = "/api/" + apiPath + nonce + rawBody;
  signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_384, signature, apiSecret);
  signature = bytesToHex(signature);
  const url = "https://api.bitfinex.com/" + apiPath;

  if (vid == 0) {
    var response = UrlFetchApp.fetch(url);

  }
  else if (vid == 1) {
    var options = {
      method: 'POST',
      contentType: "application/json",
      headers: {
        'bfx-nonce': nonce,
        'bfx-apikey': apiKey,
        'bfx-signature': signature
      },
      payload: rawBody
    };
    var response = UrlFetchApp.fetch(url, options);
  }
  else if (vid == 2) {
    var completeURL = "https://api.bitfinex.com/";
    //  var nonce = Math.floor(new Date().getTime()/1000);
    var body = {
      'request': apiPath,
      'nonce': nonce,
      'options': {}
    };

    var payload = Utilities.base64Encode(Utilities.newBlob(JSON.stringify(body)).getDataAsString());
    var signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_384, payload, apiSecret);
    signature = signature.map(function (byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');

    var params = {
      method: "post",
      headers: {
        'X-BFX-APIKEY': apiKey,
        'X-BFX-PAYLOAD': payload,
        'X-BFX-SIGNATURE': signature
      },
      payload: JSON.stringify(body),
      contentType: "application/json",
      muteHttpExceptions: true
    }
    var response = UrlFetchApp.fetch(completeURL + apiPath, params);
  }
  var data = JSON.parse(response.getContentText());
  Logger.log(data)
  return data;
}
//////////////////////////////////////////////////////////////////////
////////////////////Exmo подключение 
function Exmo(command, param, method) {
  var key = sheet.getRange("D2").getValue();
  var secret = sheet.getRange("D3").getValue();
  var nonce = new Date().getTime();
  var nonceG = nonce + nonce;
  var cb = "nonce=" + nonce;
  Logger.log(method)
  Logger.log(param)
  Logger.log(command)
  Logger.log(cb)


  if (method == 1) {
    var signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, cb, secret);
    var stringSignature = signature.map(function (byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
    var headers = {
      "Key": key,
      "Sign": stringSignature
    };
    var options = {
      "method": "post",
      "headers": headers,
      "payload": cb,
    };
    var response = UrlFetchApp.fetch("https://api.exmo.com/v1/" + command, options);
  }
  else if (method == 2) {
    var cb = "nonce=" + nonce
    var signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, cb + param, secret);
    var stringSignature = signature.map(function (byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
    var headers = {
      "Key": key,
      "Sign": stringSignature
    };
    var options = {
      "method": "post",
      "headers": headers,
      "payload": cb + param
    };
    var response = UrlFetchApp.fetch("https://api.exmo.com/v1/" + command, options);

  }
  Logger.log(data)
  var data = JSON.parse(response.getContentText());
  return data;
}
////////////////////////////////////////////////////////////////////////
//////////////////Binance подключение 
function Binance(command, param, pos) {
  var key = sheet.getRange("B2").getValue();
  var secret = sheet.getRange("B3").getValue();
  var baseUrl = "https://api.binance.com";
  var timestamp = Number(new Date().getTime()).toFixed(0);
  var string = param + "&timestamp=" + timestamp;
  var signature = Utilities.computeHmacSha256Signature(string, secret);
  signature = signature.map(function (e) {
    var v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v;
  }).join("");
  var query = "?" + string + "&signature=" + signature;
  if (pos == 0) {
    var params = {
      'method': 'get',
      'headers': { 'X-MBX-APIKEY': key },
      'muteHttpExceptions': true
    };
    var string = param
    var query = "?" + string
    var response = UrlFetchApp.fetch(baseUrl + command + query, params);
  }
  if (pos == 1) {
    var string = param
    var query = "?" + string
    var response = UrlFetchApp.fetch(baseUrl + command + query);
  }
  else if (pos == 2) {

    var params = {
      'method': 'get',
      'headers': { 'X-MBX-APIKEY': key },
      'muteHttpExceptions': true
    };
    var response = UrlFetchApp.fetch(baseUrl + command + query, params);
  }
  else if (pos == 3) {
    var params = {
      'method': 'POST',
      'headers': { 'X-MBX-APIKEY': key },
      'muteHttpExceptions': true
    };
    var response = UrlFetchApp.fetch(baseUrl + command + query, params);
  }
  else if (pos == 4) {
    var params = {
      'method': 'DELETE',
      'headers': { 'X-MBX-APIKEY': key },
      'muteHttpExceptions': true
    };
    var response = UrlFetchApp.fetch(baseUrl + command + query, params);
  }
  var data = JSON.parse(response.getContentText());
  return data;
}