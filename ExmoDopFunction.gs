/////////////////////////////////////
/////// статус ордера

function statusBuyOrder(id,pair,openOrderCount)
{
  var status;
  var i1=0;

  var orderId = Exmo("user_open_orders")
  Logger.log(orderId)
  if (orderId[pair] == null)
  {
    status = "продан"
  }
  if (orderId[pair]!=null)
  {
    while (i1>-1)
    {
      if (orderId[pair][i1]!=null)
      {
        if (orderId[pair][i1].order_id==id)
        {
          if (orderId[pair][i1].quantity!=openOrderCount)
          {
          status = "продан частично"
          i1=-6;
          }
          else if (orderId[pair][i1].quantity==openOrderCount)
          {
            status = "не продан"
            i1=-6;
          }
        }
      }
      else if (orderId[pair][i1]==null)
      {
        i1=-5;
      status = "продан"
      }
      i1++;
    }  
  }
  return status;
}





////////////////////////////////////////////////////
//формирование сред цены с 24 часа
function priceAvg24(pair)
{    
  var stakan=ExmoOrderBook(pair);
  var avg= tickerAvg(pair);
  avg = parseFloat(avg.avg);
  var ask= stakan[pair].ask_top
  var bid= stakan[pair].bid_top
  var avg1=((parseFloat(ask)+parseFloat(bid))/2);
  var result ;
  if (avg>avg1)
  {
    result= avg1;
  }
  else if (avg<avg1)
  {
    result = avg;
  }
  
  return result;
  

}
////////////////////////////////////////
//формирование сред цены без 24 часа
function priceAvg(pair)
{    
  var stakan = ExmoOrderBook(pair);
  var ask = stakan[pair].ask_top
  var bid = stakan[pair].bid_top
  var result = ((parseFloat(ask)+parseFloat(bid))/2);
  return result;
}


////////////////////////////////
/////////////// проверка баланса валюты 
function balanceExmoBot(pair) 
{
  var balance = Exmo("user_info");
  var fPair= pair.substring(0,pair.indexOf("_"))
  var tPair = pair.substring(pair.indexOf("_")+1,pair.length)
  var fPairBalance = balance['balances'][fPair]
  var tPairBalance= balance['balances'][tPair]
  var fPairReserve= balance['reserved'][fPair]
  var tPairReserve= balance['reserved'][tPair]
  var result = [];
  result[0]=fPair;
  result[1]=tPair;
  result[2]=fPairBalance;
  result[3]=tPairBalance;
  result[4]=fPairReserve;
  result[5]=tPairReserve;
  return result;
}
/////////////////////////////
////// автопроверка для формул

function avtoUpdateFormula()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("formula");
  var status = sheet.getRange("G1").getValue(); 
  if (status!=0)
  {
  sheet.getRange("G1").setValue(0);
  }
  else
  {
  sheet.getRange("G1").setValue(1);
  }
  
}
//////////////////////
/////проверка доступности api 
function ExmoPing()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("setting");
  var a = ExmoCurrency();
  var count = sheet.getRange("B2").getValue();
  var countA = 0;
  for (var i=0;i<15000;i++)
  {
    if (a[i]!=null)
    {
    countA++;
    }
    else if (a[i]==null)
    {
      break;
    }
  }
  var result;
  if (countA==count)
  {
    result = "норма"
  }
  else if (countA<count)
  {
    result = "не норма"
  }
  else if (countA>count)
  {
    result = "обнова"
    ExmoUpdatePair()
  }
  return result;
}
//////////////////////////////
///// обновление валют 
function ExmoUpdatePair()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("setting");
  var ExmoClient = ss.getSheetByName("ExmoClient");
  var ExmoBotsss = ss.getSheetByName("ExmoBots");
  var a = ExmoCurrency();
  var b = ExmoTicker(); 
  var countA = 0;
  var countB = 0;
  var pair;
  var listPair=[];
  for (var i=0;i<15000;i++)
  {
    if (a[i]!=null)
    {
      countA++;
    }
    else if (a[i]==null)
    {
      break;
    }
  }

  for (var i =0;i<=countA;i++)
  {
    for(var i2=0;i2<=countA;i2++)
    {
      pair=a[i]+"_"+a[i2];
      if (b[pair]!=null)
      {
        listPair[countB]=pair;
        countB++;
      }
    }
  }
  sheet.getRange("B2").setValue(countA)
  sheet.getRange("B3").setValue(countB)
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(listPair).build();
  sheet.getRange("B4").setDataValidation(rule);
  ExmoClient.getRange("D2").setDataValidation(rule);
  ExmoBotsss.getRange("B2").setDataValidation(rule);
}