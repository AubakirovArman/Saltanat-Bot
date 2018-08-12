////////////////////////////////////////////////
/////////////////расчет обьема и спреда для стратегии римуса 
function BinanceVolSpred(profit,minVolBtc,pairCheck,infoAllPair,stat)
{
  var AllIn =infoAllPair;
  var pair=[];
  var fPair =[];
  var tPair = [];
  var spred=[];
  var avg=[];
  var ask =[];
  var bid=[];
  var vol=[];
  var vol2=[];
  var countA=0;
  for (var i=0;i<15000;i++)
  {
    if (AllIn.symbols[i]!=null)
    {
      pair[i]=AllIn.symbols[i].symbol
      fPair[i] = AllIn.symbols[i].baseAsset
      tPair[i] = AllIn.symbols[i].quoteAsset
      ask[i]=stat[i].askPrice;
      bid[i]=stat[i].bidPrice;
      avg[i]=stat[i].weightedAvgPrice;
      vol[i]=stat[i].volume
      vol2[i]=stat[i].quoteVolume
      spred[i]=100/((stat[i].bidPrice*1)/((stat[i].askPrice*1)-(stat[i].bidPrice*1)));
      countA++;
    }
    else if (AllIn.symbols[i]==null)
    {
      i=150001;
    }
  }
  
  var mat;
  
  if (spred[pair.indexOf(pairCheck)]>=profit)
  {
    i = pair.indexOf(pairCheck)
    mat = BinanceRashet(i,pair,ask,bid,vol,avg,stat,fPair,tPair,vol2)
    if (mat>=minVolBtc)
    {
      return true;
    }
    else if (mat<minVolBtc)
    {
      return false;
    }
  }
  else if (spred[pair.indexOf(pairCheck)]<profit)
  {
    return false;
  }
}

///// обновление валют 
function BinanceUpdatePair()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("setting");
  var BinanceClient = ss.getSheetByName("BinanceClient");
  var BinanceBotsss = ss.getSheetByName("BinanceBots");
  var a = BinanceExchangeInfo()
  var b = BinanceAccount()
  var countA = 0;
  var countB = 0;
  var pair;
  var listPair=[];
  for (var i=0; i<15000;i++)
  {
    if (a.symbols[i]!=null)
    {
      listPair[countB]=a.symbols[i].symbol;
      countB++;
    }
    else if (a.symbols[i]==null)
    {
      i=15555;
    }
  }
  for (var i=0; i<15000; i++)
  {
    if (b.balances[i]!=null)
    {
      countA++;
    }
    else if (b.balances[i]==null)
    {
      i=15555;
    }
  }
  sheet.getRange("E2").setValue(countA)
  sheet.getRange("E3").setValue(countB)
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(listPair).build();
  sheet.getRange("E4").setDataValidation(rule);
  BinanceClient.getRange("D2").setDataValidation(rule);
  BinanceBotsss.getRange("B2").setDataValidation(rule);
}