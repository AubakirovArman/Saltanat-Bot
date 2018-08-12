
////////////////////////////////////////////////////////////////////////
//стакан
function BinanceStakan()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BinanceClient");
  var pair = sheet.getRange("D2").getValue();
  var res = BinanceDepth(pair,10);
  for (var i=0;i<10;i++)
  {
    sheet.getRange("F"+(3+i)).setValue(res.bids[i]);
    sheet.getRange("G"+(3+i)).setValue(res.asks[i])
  }
}
///////////////////////////////////
////////////баланс
function BinanceAccountInfo()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BinanceClient");
  var res = BinanceAccount();
  for (var i=0;i<1000;i++)
  {
    if (res.balances[i]==null)
    {
      i=1000;
    }
    else if(res.balances[i]!=null)
    {
      sheet.getRange("A"+(3+i)).setValue(res.balances[i].asset);
      sheet.getRange("B"+(3+i)).setValue(res.balances[i].free);
      sheet.getRange("C"+(3+i)).setValue(res.balances[i].locked);
    }
  }
  
}

////////////////////////////////////////////////////////
/////////////открытые ордера 
function BinanceOpenOr()
{  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BinanceClient");
  var pair = sheet.getRange("D2").getValue();
  var count = sheet.getRange("O21").getValue();
  var res = BinanceOpenOrders(pair);
  for(var i=0; i<count; i++)
  {
    if (res[i]==null)
    {
      sheet.getRange("E"+(21+i)).setValue("");
      sheet.getRange("F"+(21+i)).setValue("");
      sheet.getRange("G"+(21+i)).setValue("");
      sheet.getRange("H"+(21+i)).setValue("");
      sheet.getRange("I"+(21+i)).setValue("");
      sheet.getRange("J"+(21+i)).setValue("");
      sheet.getRange("K"+(21+i)).setValue("");
      sheet.getRange("L"+(21+i)).setValue("");
      sheet.getRange("M"+(21+i)).setValue("");
      sheet.getRange("N"+(21+i)).setValue(""); 
    }
    else if (res[i]!=null)
    {
      sheet.getRange("E"+(21+i)).setValue(res[i].symbol);
      sheet.getRange("F"+(21+i)).setValue(res[i].side);
      sheet.getRange("G"+(21+i)).setValue(res[i].orderId);
      sheet.getRange("H"+(21+i)).setValue(res[i].origQty);
      sheet.getRange("I"+(21+i)).setValue(res[i].clientOrderId);
      sheet.getRange("J"+(21+i)).setValue(res[i].type);
      sheet.getRange("K"+(21+i)).setValue(res[i].price);
      sheet.getRange("L"+(21+i)).setValue(res[i].timeInForce);
      sheet.getRange("M"+(21+i)).setValue(res[i].isWorking);
      sheet.getRange("N"+(21+i)).setValue(res[i].status);
          
      
    }
  }
}

////////////////////////////////////////////
/////////купить продать 
function BinanceBuySell()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BinanceClient");
  var pair = sheet.getRange("J1").getValue();
  var side;
  if (sheet.getRange("I2").getValue()=="Купить")
  {
    side="BUY";
  }
  else
  {
    side="SELL"
  }
  var type = sheet.getRange("J3").getValue();
  var quantity = sheet.getRange("J4").getValue();
  var timeInForce = sheet.getRange("J5").getValue();
  var price = sheet.getRange("J6").getValue();
  var stopPrice = sheet.getRange("J7").getValue();
  var res = BinanceCreatOrder(pair,side,type,timeInForce,quantity,price,"FULL",stopPrice);
  Logger.log(res);
  Logger.log(res.fills[0]);
  BinanceOpenOr();
  
}