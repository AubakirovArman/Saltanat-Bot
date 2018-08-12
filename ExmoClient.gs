var pair="TRX_RUB";
function tickerAvg(pair) {
    var tickerAv=Exmo("ticker");  
   return tickerAv[pair];
}

function ExmoAvgVolume24(pair) {
    var tickerAv=Exmo("ticker");  
   return tickerAv[pair].vol_curr;
}

///////////////////////////////////////////////
////////Баланс
function user_info() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ExmoClient");
  var setting = ss.getSheetByName("setting");
  var balance=Exmo("user_info");
  var pair = ExmoCurrency();
  var count = setting.getRange("B2").getValue();
  for (var i=0;i<count;i++)
  {
    sheet.getRange("A"+(i+3)).setValue(pair[i]);
    sheet.getRange("B"+(i+3)).setValue(balance['balances'][pair[i]]);
    sheet.getRange("C"+(i+3)).setValue(balance['reserved'][pair[i]]);
  }
}
///////////////////////////////////////////////
////////Стакан
function stakan() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ExmoClient");
  var pair = sheet.getRange("D2").getValue();
  var stakan=Exmo("order_book/?pair="+pair+"&limit=10");
  for (i=0; i < 10; i++)
  {
    sheet.getRange("F"+(i+3)).setValue(stakan[pair].bid[i][0]);
    sheet.getRange("G"+(i+3)).setValue(stakan[pair].ask[i][0]);
  }
}
///////////////////////////////////////////////
////////Покупка
function buy1() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ExmoClient");
  var count =sheet.getRange("I2").getValue();
  var price =sheet.getRange("I3").getValue();
  var pair = sheet.getRange("D2").getValue();
  ExmoOrderCreat(pair,count,price,"buy")
  openOrder();
  
}
///////////////////////////////////////////////
////////Продажа
function sell1() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ExmoClient");
  var count =sheet.getRange("L2").getValue();
  var price =sheet.getRange("L3").getValue();
  var pair = sheet.getRange("D2").getValue();
  ExmoOrderCreat(pair,count,price,"sell")
  openOrder();
}
///////////////////////////////////////////////////
///////////Закрытые ордера 
function oldOrder() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ExmoClient");
  var pair = sheet.getRange("D2").getValue();
  var oldOrderExmo=Exmo("user_trades/?pair="+pair);
  var i1 = 0;
  var ind = 0;
  for (ind=0;ind<11;ind++)
  {
     sheet.getRange("L"+(ind+19)).setValue('');
      sheet.getRange("M"+(ind+19)).setValue('');
      sheet.getRange("N"+(ind+19)).setValue('');
      sheet.getRange("O"+(ind+19)).setValue('');
      sheet.getRange("P"+(ind+19)).setValue('');     
    
  }
  ind=0;
  while (i1<1)
  {
   if (oldOrderExmo[pair][ind]!=null)
   {
     Logger.log("ura");
      sheet.getRange("L"+(ind+19)).setValue(oldOrderExmo[pair][ind].order_id);
      sheet.getRange("M"+(ind+19)).setValue(oldOrderExmo[pair][ind].pair);
      sheet.getRange("N"+(ind+19)).setValue(oldOrderExmo[pair][ind].quantity);
      sheet.getRange("O"+(ind+19)).setValue(oldOrderExmo[pair][ind].price);
      sheet.getRange("P"+(ind+19)).setValue(oldOrderExmo[pair][ind].type);     
   }
  else
  {

    i1=3;
    
  }
   ind=ind+1;
  }
}
///////////////////////////////////////////////////
///////////Открытые ордера 
function openOrder() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ExmoClient");
  var pair = sheet.getRange("D2").getValue();
  var oldOrderExmo=Exmo("user_open_orders/?pair="+pair);
  var i1 = 0;
  var ind = 0;
   
   for (ind=0;ind<11;ind++)
  {
     sheet.getRange("F"+(ind+19)).setValue('');
      sheet.getRange("G"+(ind+19)).setValue('');
      sheet.getRange("H"+(ind+19)).setValue('');
      sheet.getRange("I"+(ind+19)).setValue('');
      sheet.getRange("J"+(ind+19)).setValue('');     
    
  }
  ind=0;
  while (i1<1)
  {
   if(oldOrderExmo[pair]!=null)
   {
    if (oldOrderExmo[pair][ind]!=null)
    {
      sheet.getRange("F"+(ind+19)).setValue(oldOrderExmo[pair][ind].order_id);
      sheet.getRange("G"+(ind+19)).setValue(oldOrderExmo[pair][ind].pair);
      sheet.getRange("H"+(ind+19)).setValue(oldOrderExmo[pair][ind].quantity);
      sheet.getRange("I"+(ind+19)).setValue(oldOrderExmo[pair][ind].price);
      sheet.getRange("J"+(ind+19)).setValue(oldOrderExmo[pair][ind].type);     
    }
     else
     {
       i1=3;
    
     }
   }
    else
    {
       i1=3;
    
    }
   ind=ind+1;
  }
  
}
