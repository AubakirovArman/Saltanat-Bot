////////////////////////////////////////////////////////////////////
/////////////////////////////Yobit подключение 
function Yobit(command,pos) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Config");
  var key = ""
  var secret = ""
  var nonce = Number(new Date().getTime()/1000).toFixed(0);
  if (pos ==2)
  {
    var cb = "method="+command+"&nonce="+nonce
    
    var signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, cb, secret);
    
    var stringSignature = signature.map(function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
    
    var headers = {
      "Sign" :stringSignature, 
      "Key" : key
      
    };
    
    var options = {
      "method" : "post",
      "headers": headers,
      "payload": cb
    };
    
    var response = UrlFetchApp.fetch("https://yobit.net/tapi/", options);
 
 }
  else if (pos==0)
  {
   var response = UrlFetchApp.fetch("https://yobit.net/api/2/"+command);
  }
  else if (pos==1)
  {
    var response = UrlFetchApp.fetch("https://yobit.net/api/3/"+command);
  }
  var data = JSON.parse(response.getContentText());
  return data;
}

//////////////////////////////////////////////////////////////////////
////////////////////Exmo подключение 
function Exmo(command) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Config");
  var key = sheet.getRange("B2").getValue();
  var secret = sheet.getRange("B3").getValue();
  var nonce = new Date().getTime();
  var nonceG=nonce+nonce;
  var  cb = "nonce="+nonce;
  var signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, cb, secret);
  var stringSignature = signature.map(function(byte) 
                                      { return ('0' + (byte & 0xFF).toString(16)).slice(-2); 
                                      }).join('');
  var headers = {
  "Key" : key,
  "Sign" : stringSignature
  };
  var options = {
   "method" : "post",
   "headers": headers,
   "payload": cb,
  };
  var response = UrlFetchApp.fetch("https://api.exmo.com/v1/"+command , options);
  var data = JSON.parse(response.getContentText());
  return data;
}
////////////////////////////////////////////////////////////////////////
//////////////////Binance подключение 
function Binance(command,param,pos) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Config");
  var key = sheet.getRange("D2").getValue();
  var secret = sheet.getRange("D3").getValue();
  var baseUrl = "https://api.binance.com";
  var timestamp = Number(new Date().getTime()).toFixed(0);
  var string = param+"&timestamp=" + timestamp;
  var signature = Utilities.computeHmacSha256Signature(string, secret);
  signature = signature.map(function(e)
                            {
                              var v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v; 
                            }).join("");
  var query = "?" + string + "&signature=" + signature;
  if (pos == 0)
  {  
    var params = {
      'method': 'get',
      'headers': {'X-MBX-APIKEY': key},
      'muteHttpExceptions': true
    };
    var string = param
    var query = "?" + string
    var response = UrlFetchApp.fetch(baseUrl + command + query,params);
  }
  if (pos ==1)
  {
    var string = param
    var query = "?" + string
    var response = UrlFetchApp.fetch(baseUrl + command + query);
  }
  else if (pos==2)
  {  

    var params = {
    'method': 'get',
    'headers': {'X-MBX-APIKEY': key},
    'muteHttpExceptions': true
    };
    var response = UrlFetchApp.fetch(baseUrl + command + query , params);
  }
  else if (pos==3)
  {  
    var params = {
    'method': 'POST',
    'headers': {'X-MBX-APIKEY': key},
    'muteHttpExceptions': true
    };
    var response = UrlFetchApp.fetch(baseUrl + command + query , params);
  }
  else if (pos==4)
  {  
    var params = {
    'method': 'DELETE',
    'headers': {'X-MBX-APIKEY': key},
    'muteHttpExceptions': true
    };
    var response = UrlFetchApp.fetch(baseUrl + command + query , params);
  }
  var data = JSON.parse(response.getContentText());
  return data;
}