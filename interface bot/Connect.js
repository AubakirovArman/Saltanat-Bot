var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName("API");
function Bitmex(command,data,method,pos) {
  // command='/api/v1/user';
  // data ={}
  // method = 'GET'
  var baseUrl = "https://www.bitmex.com";
  var key = sheet.getRange("С2").getValue();
  var secret = sheet.getRange("С3").getValue();
  var timestamp = Math.floor(new Date().getTime()/1000)+2+"";
  var postBody = JSON.stringify(data);
  
  if (pos==1)
  {
    var options = {
      method: method,
      contenttype: "application/json; charset=utf-8",
      payload: data
    }
    var response = UrlFetchApp.fetch(baseUrl + command,options);
  }
  if (pos==0)
  {
    var options = {
      method: method,
      contenttype: "application/json; charset=utf-8",
      
    }
    var response = UrlFetchApp.fetch(baseUrl + command+"?"+data,options);
  }
  if (pos==4)
  {
    var options = {
      method: method,
      contenttype: "application/json; charset=utf-8",
      
    }
    var response = UrlFetchApp.fetch(baseUrl + command,options);
  }
  else if (pos==2)
  {
    var string = method+command+timestamp;
    var signature = Utilities.computeHmacSha256Signature(string, secret);
    
    signature = signature.map(function(e){ var v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v; }).join("");
    var options = {
      method: method,
      contentType: "application/json; charset=utf-8",
      
      headers: {
        "api-expires": timestamp,
        "api-key": key,
        "api-signature": signature },
      payload: data
    }
    
    
    var response = UrlFetchApp.fetch(baseUrl + command,options);
  }
  else if (pos==3)
  {
    Logger.log(JSON.stringify(data))
    var string = method+command+timestamp+JSON.stringify(data)
    var signature = Utilities.computeHmacSha256Signature(string, secret);
    
    signature = signature.map(function(e){ var v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v; }).join("");
    var options = {
      method: method,
      contentType: "application/json; charset=utf-8",
      headers: {
        "api-expires": timestamp,
        "api-key": key,
        "api-signature": signature },
      payload: JSON.stringify(data)
    }
    
    var url = encodeURI(baseUrl + command)
    var response = UrlFetchApp.fetch(url,options);
  }
  var data = JSON.parse(response.getContentText());
  return data;
}


function addId() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Telebot");
  var id = sheet.getRange("E2").getValue();
  var count = sheet.getRange("D3").getValue();
  count=count+1;
  sheet.getRange("D3").setValue(count);
  sheet.getRange("E"+(count+3)).setValue(id);
}
//////////////////////////////////////////////////////////////////////
////////////////////Exmo подключение 
function Exmo(command) {

  var key = sheet.getRange("D2").getValue();
  var secret = sheet.getRange("D3").getValue();
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
  var baseUrl = "https://api.binance.com";
  var key = sheet.getRange("B2").getValue();
  var secret =sheet.getRange("B3").getValue();
  var timestamp = Number(new Date().getTime()).toFixed(0);
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
    var string = param+"&timestamp=" + timestamp;

    var signature = Utilities.computeHmacSha256Signature(string, secret);
    
    signature = signature.map(function(e)
                              {
                                var v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v; 
                              }).join("");
    var query = "?" + string + "&signature=" + signature;
    var params = {
      'method': 'get',
      'headers': {'X-MBX-APIKEY': key},
      'muteHttpExceptions': true
    };
    var response = UrlFetchApp.fetch(baseUrl + command + query , params);
  }
  else if (pos==3)
  {   
    var string = param+"&timestamp=" + timestamp;
    var signature = Utilities.computeHmacSha256Signature(string, secret);
    
    signature = signature.map(function(e)
                              {
                                var v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v; 
                              }).join("");
    var query = "?" + string + "&signature=" + signature;
    var params = {
      'method': 'POST',
      'headers': {'X-MBX-APIKEY': key},
      'muteHttpExceptions': true
    };
    var response = UrlFetchApp.fetch(baseUrl + command + query , params);
  }
  else if (pos==4)
  {  
    var string = param+"&timestamp=" + timestamp;      
    signature = signature.map(function(e)
                              {
                                var v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v; 
                              }).join("");
    var query = "?" + string + "&signature=" + signature;
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

function ssssssss()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Telebot");
  var notes = [["it goes", "like this", "the fourth, the fifth"]];
  var rule =[];
  rule = sheet.getRange('G1:G515').getValues().toString();
  Logger.log(rule)
  var id = sheet.getRange("F4").setDataValidations(rule)
  //  Logger.log(id)
  }