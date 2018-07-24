////////////////////////////////////////////////////////////////////////
//////////////////Binance подключение 
function Binance(command,param,pos) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Config");
  var key = sheet.getRange("D2").getValue();
  var secret = sheet.getRange("D3").getValue();
  var api = command ;
  var baseUrl = "https://api.binance.com";
  var timestamp = Number(new Date().getTime()).toFixed(0);
  var string = param+"&timestamp=" + timestamp; // Please input query parameters for the inputterd API.
  var signature = Utilities.computeHmacSha256Signature(string, secret);
  signature = signature.map(function(e){var v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v; }).join("");
  var query = "?" + string + "&signature=" + signature;
  if (pos == 0)
  {
     var response = UrlFetchApp.fetch(baseUrl + api);
  }
  if (pos ==1)
  {
    var string = param
    var query = "?" + string
    var response = UrlFetchApp.fetch(baseUrl + api + query);
  }
  else if (pos==2)
  {  

    var params = {
    'method': 'get',
    'headers': {'X-MBX-APIKEY': key},
    'muteHttpExceptions': true
    };
    var response = UrlFetchApp.fetch(baseUrl + api + query , params);
  }
  else if (pos==3)
  {  
    var params = {
    'method': 'POST',
    'headers': {'X-MBX-APIKEY': key},
    'muteHttpExceptions': true
    };
    var response = UrlFetchApp.fetch(baseUrl + api + query , params);
    Logger.log(response)
  }
  else if (pos==4)
  {  
    var params = {
    'method': 'DELETE',
    'headers': {'X-MBX-APIKEY': key},
    'muteHttpExceptions': true
    };
    var response = UrlFetchApp.fetch(baseUrl + api + query , params);
    Logger.log(response)
  }
  var data = JSON.parse(response.getContentText());
  //Logger.log(data)
  return data;
}