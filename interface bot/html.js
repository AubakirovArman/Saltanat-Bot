var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName("API");
var telebot = ss.getSheetByName("telebot");
var exmopairFiltr = ss.getSheetByName("ExmoSettingPair");
var binancepairFiltr = ss.getSheetByName("BinanceSettingPair");
var bitmexpairFiltr = ss.getSheetByName("BitmexSettingPair");
//////////
function downloadPairForIndex()
{
  var res = []
  var countBinance = sheet.getRange("B4").getValue();
  var countBitmex = sheet.getRange("C4").getValue();
  var countExmo = sheet.getRange("D4").getValue();
  res[0] = zalivpairVmassiv(countBinance,"B",sheet)
  res[1] = zalivpairVmassiv(countBitmex,"C",sheet)
  res[2] = zalivpairVmassiv(countExmo,"D",sheet)
  
  return res
}

function zalivpairVmassiv(count,bukva,sheet)
{
  var res = [];
  for (var i=0; i<count;i++)
  {
    res[i]=sheet.getRange(bukva+(i+5)).getValue();
  }
  return res
}

//кнопка редактирования загрузка и сохраниение настроек валют по каждой паре.
function loadPairBitmex(pair){
  var count = bitmexpairFiltr.getRange("A1").getValue()+1;
  var position=0;
  for (var i =2; i<=count;i++)
  {
    if (pair==bitmexpairFiltr.getRange("B"+i).getValue())
    {
      position = i;
      i=i+count;
    }
  }
  var buy=[];
  if (bitmexpairFiltr.getRange("C"+position).getValue()=="")
  {
    buy[1]="Рыночный";
    buy[2]="По цене покупки Ask";
    buy[3]="";
    buy[4]="Процент от баланса";
    buy[5]="";
    buy[6]="10";
    buy[7]="";
    buy[8]="";
    buy[9]="true";
    buy[10]="Последняя";
         
  }
  else
  {
    buy[1]=bitmexpairFiltr.getRange("C"+position).getValue();
    buy[2]=bitmexpairFiltr.getRange("D"+position).getValue();
    buy[3]=bitmexpairFiltr.getRange("E"+position).getValue();
    buy[4]=bitmexpairFiltr.getRange("F"+position).getValue();
    buy[5]=bitmexpairFiltr.getRange("G"+position).getValue();
    buy[6]=bitmexpairFiltr.getRange("H"+position).getValue();
    buy[7]=bitmexpairFiltr.getRange("I"+position).getValue();
    buy[8]=bitmexpairFiltr.getRange("J"+position).getValue();
    buy[9]=bitmexpairFiltr.getRange("K"+position).getValue();
    buy[10]=bitmexpairFiltr.getRange("L"+position).getValue();
  }
  var sell=[];
  if (bitmexpairFiltr.getRange("M"+position).getValue()=="")
  {
    sell[1]="Рыночный";
    sell[2]="По цене покупки Ask";
    sell[3]="";
    sell[4]="Процент от баланса";
    sell[5]="";
    sell[6]="10";
    sell[7]="";
    sell[8]="";
    sell[9]="true";
    sell[10]="Последняя";
    
  }
  else
  {
    sell[1]=bitmexpairFiltr.getRange("M"+position).getValue();
    sell[2]=bitmexpairFiltr.getRange("N"+position).getValue();
    sell[3]=bitmexpairFiltr.getRange("O"+position).getValue();
    sell[4]=bitmexpairFiltr.getRange("P"+position).getValue();
    sell[5]=bitmexpairFiltr.getRange("Q"+position).getValue();
    sell[6]=bitmexpairFiltr.getRange("R"+position).getValue();
    sell[7]=bitmexpairFiltr.getRange("S"+position).getValue();
    sell[8]=bitmexpairFiltr.getRange("T"+position).getValue();
    sell[9]=bitmexpairFiltr.getRange("U"+position).getValue();
    sell[10]=bitmexpairFiltr.getRange("V"+position).getValue();
  }
  var res = []
  res[0]=buy
  res[1]=sell
  return res
}
//////////// binance
function loadPairBinance(pair){
var count = binancepairFiltr.getRange("A1").getValue()+1;
  var position=0;
  for (var i =2; i<=count;i++)
  {
    if (pair==binancepairFiltr.getRange("B"+i).getValue())
    {
      position = i;
      i=i+count;
    }
  }
  var buy=[];
  if (binancepairFiltr.getRange("C"+position).getValue()=="")
  {
    buy[1]="Рыночный";
    buy[2]="По цене покупки Ask";
    buy[3]="";
    buy[4]="Процент от баланса";
    buy[5]="";
    buy[6]="10";
    buy[7]="";
    buy[8]="";
         
  }
  else
  {
    buy[1]=binancepairFiltr.getRange("C"+position).getValue();
    buy[2]=binancepairFiltr.getRange("D"+position).getValue();
    buy[3]=binancepairFiltr.getRange("E"+position).getValue();
    buy[4]=binancepairFiltr.getRange("F"+position).getValue();
    buy[5]=binancepairFiltr.getRange("G"+position).getValue();
    buy[6]=binancepairFiltr.getRange("H"+position).getValue();
    buy[7]=binancepairFiltr.getRange("I"+position).getValue();
    buy[8]=binancepairFiltr.getRange("J"+position).getValue();
  }
  var sell=[];
  if (binancepairFiltr.getRange("K"+position).getValue()=="")
  {
    sell[1]="Рыночный";
    sell[2]="По цене покупки Ask";
    sell[3]="";
    sell[4]="Процент от баланса";
    sell[5]="";
    sell[6]="10";
    sell[7]="";
    sell[8]="";
    
  }
  else
  {
    sell[1]=binancepairFiltr.getRange("K"+position).getValue();
    sell[2]=binancepairFiltr.getRange("L"+position).getValue();
    sell[3]=binancepairFiltr.getRange("M"+position).getValue();
    sell[4]=binancepairFiltr.getRange("N"+position).getValue();
    sell[5]=binancepairFiltr.getRange("O"+position).getValue();
    sell[6]=binancepairFiltr.getRange("P"+position).getValue();
    sell[7]=binancepairFiltr.getRange("Q"+position).getValue();
    sell[8]=binancepairFiltr.getRange("R"+position).getValue();
  }
  var res = []
  res[0]=buy
  res[1]=sell
  return res
}
/////////exmo
function loadPairExmo(pair){
  var count = exmopairFiltr.getRange("A1").getValue()+1;
  var position=0;
  for (var i =2; i<=count;i++)
  {
    if (pair==exmopairFiltr.getRange("B"+i).getValue())
    {
      position = i;
      i=i+count;
    }
  }
  var buy=[];
  if (exmopairFiltr.getRange("C"+position).getValue()=="")
  {
    buy[1]="Рыночный";
    buy[2]="По цене покупки Ask";
    buy[3]="";
    buy[4]="Процент от баланса";
    buy[5]="";
    buy[6]="10";
    buy[7]="";
    buy[8]="";
         
  }
  else
  {
    buy[1]=exmopairFiltr.getRange("C"+position).getValue();
    buy[2]=exmopairFiltr.getRange("D"+position).getValue();
    buy[3]=exmopairFiltr.getRange("E"+position).getValue();
    buy[4]=exmopairFiltr.getRange("F"+position).getValue();
    buy[5]=exmopairFiltr.getRange("G"+position).getValue();
    buy[6]=exmopairFiltr.getRange("H"+position).getValue();
    buy[7]=exmopairFiltr.getRange("I"+position).getValue();
    buy[8]=exmopairFiltr.getRange("J"+position).getValue();
  }
  var sell=[];
  if (exmopairFiltr.getRange("K"+position).getValue()=="")
  {
    sell[1]="Рыночный";
    sell[2]="По цене покупки Ask";
    sell[3]="";
    sell[4]="Процент от баланса";
    sell[5]="";
    sell[6]="10";
    sell[7]="";
    sell[8]="";
    
  }
  else
  {
    sell[1]=exmopairFiltr.getRange("K"+position).getValue();
    sell[2]=exmopairFiltr.getRange("L"+position).getValue();
    sell[3]=exmopairFiltr.getRange("M"+position).getValue();
    sell[4]=exmopairFiltr.getRange("N"+position).getValue();
    sell[5]=exmopairFiltr.getRange("O"+position).getValue();
    sell[6]=exmopairFiltr.getRange("P"+position).getValue();
    sell[7]=exmopairFiltr.getRange("Q"+position).getValue();
    sell[8]=exmopairFiltr.getRange("R"+position).getValue();
  }
  var res = []
  res[0]=buy
  res[1]=sell
  return res
}

///////save pair exmo 
function saveExmoPair1(res,pair)
{
  
  var count = exmopairFiltr.getRange("A1").getValue()+1;
  var position=0;
  for (var i =2; i<=count;i++)
  {
    if (pair==exmopairFiltr.getRange("B"+i).getValue())
    {
      position = i;
      i=i+count;
    }
  }
  
  var buy=res[0]
  var sell=res[1]
  
  exmopairFiltr.getRange("C"+position).setValue(buy[1]);
  exmopairFiltr.getRange("D"+position).setValue(buy[2]);
  exmopairFiltr.getRange("E"+position).setValue(buy[3]);
  exmopairFiltr.getRange("F"+position).setValue(buy[4]);
  exmopairFiltr.getRange("G"+position).setValue(buy[5]);
  exmopairFiltr.getRange("H"+position).setValue(buy[6]);
  exmopairFiltr.getRange("I"+position).setValue(buy[7]);
  exmopairFiltr.getRange("J"+position).setValue(buy[8]);
  
  exmopairFiltr.getRange("K"+position).setValue(sell[1]);
  exmopairFiltr.getRange("L"+position).setValue(sell[2]);
  exmopairFiltr.getRange("M"+position).setValue(sell[3]);
  exmopairFiltr.getRange("N"+position).setValue(sell[4]);
  exmopairFiltr.getRange("O"+position).setValue(sell[5]);
  exmopairFiltr.getRange("P"+position).setValue(sell[6]);
  exmopairFiltr.getRange("Q"+position).setValue(sell[7]);
  exmopairFiltr.getRange("R"+position).setValue(sell[8]);
  
  return "done"
}
//////////binance save pair
function saveBinancePair1(res,pair)
{
  
  var count = binancepairFiltr.getRange("A1").getValue()+1;
  var position=0;
  for (var i =2; i<=count;i++)
  {
    if (pair==binancepairFiltr.getRange("B"+i).getValue())
    {
      position = i;
      i=i+count;
    }
  }
  
  var buy=res[0]
  var sell=res[1]
  
  binancepairFiltr.getRange("C"+position).setValue(buy[1]);
  binancepairFiltr.getRange("D"+position).setValue(buy[2]);
  binancepairFiltr.getRange("E"+position).setValue(buy[3]);
  binancepairFiltr.getRange("F"+position).setValue(buy[4]);
  binancepairFiltr.getRange("G"+position).setValue(buy[5]);
  binancepairFiltr.getRange("H"+position).setValue(buy[6]);
  binancepairFiltr.getRange("I"+position).setValue(buy[7]);
  binancepairFiltr.getRange("J"+position).setValue(buy[8]);
  
  binancepairFiltr.getRange("K"+position).setValue(sell[1]);
  binancepairFiltr.getRange("L"+position).setValue(sell[2]);
  binancepairFiltr.getRange("M"+position).setValue(sell[3]);
  binancepairFiltr.getRange("N"+position).setValue(sell[4]);
  binancepairFiltr.getRange("O"+position).setValue(sell[5]);
  binancepairFiltr.getRange("P"+position).setValue(sell[6]);
  binancepairFiltr.getRange("Q"+position).setValue(sell[7]);
  binancepairFiltr.getRange("R"+position).setValue(sell[8]);
  
  return "done"
}

//////////bitmex save pair 
function saveBitmexPair1(res,pair)
{
  
  var count = bitmexpairFiltr.getRange("A1").getValue()+1;
  var position=0;
  for (var i =2; i<=count;i++)
  {
    if (pair==bitmexpairFiltr.getRange("B"+i).getValue())
    {
      position = i;
      i=i+count;
    }
  }
  
  var buy=res[0]
  var sell=res[1]
  
  bitmexpairFiltr.getRange("C"+position).setValue(buy[1]);
  bitmexpairFiltr.getRange("D"+position).setValue(buy[2]);
  bitmexpairFiltr.getRange("E"+position).setValue(buy[3]);
  bitmexpairFiltr.getRange("F"+position).setValue(buy[4]);
  bitmexpairFiltr.getRange("G"+position).setValue(buy[5]);
  bitmexpairFiltr.getRange("H"+position).setValue(buy[6]);
  bitmexpairFiltr.getRange("I"+position).setValue(buy[7]);
  bitmexpairFiltr.getRange("J"+position).setValue(buy[8]);
  bitmexpairFiltr.getRange("K"+position).setValue(buy[9]);
  bitmexpairFiltr.getRange("L"+position).setValue(buy[10]);
  
  bitmexpairFiltr.getRange("M"+position).setValue(sell[1]);
  bitmexpairFiltr.getRange("N"+position).setValue(sell[2]);
  bitmexpairFiltr.getRange("O"+position).setValue(sell[3]);
  bitmexpairFiltr.getRange("P"+position).setValue(sell[4]);
  bitmexpairFiltr.getRange("Q"+position).setValue(sell[5]);
  bitmexpairFiltr.getRange("R"+position).setValue(sell[6]);
  bitmexpairFiltr.getRange("S"+position).setValue(sell[7]);
  bitmexpairFiltr.getRange("T"+position).setValue(sell[8]);
  bitmexpairFiltr.getRange("U"+position).setValue(sell[9]);
  bitmexpairFiltr.getRange("V"+position).setValue(sell[10]);
  
  return "done bitmex"
}

function loadAPI()
{
  var res =[]
  //binance api load
  res[0]=sheet.getRange("B2").getValue();
  res[1]=sheet.getRange("B3").getValue();
  //bitmex
  res[2]=sheet.getRange("C2").getValue();
  res[3]=sheet.getRange("C3").getValue();
  ///exmo
  res[4]=sheet.getRange("D2").getValue();
  res[5]=sheet.getRange("D3").getValue();
  /// id
  res[6]=sheet.getRange("E2").getValue();
  ///telegramm
  res[7]=telebot.getRange("B2").getValue();
  res[8]=telebot.getRange("B3").getValue();
  res[9]=telebot.getRange("B4").getValue();
  return res 
}
function sada()
{
  var res=[[]]
  res[0][0]="s"
Logger.log(res[0][0])
}

function BinanceSaveApi(res)
{
  sheet.getRange("B2").setValue(res[0])
  sheet.getRange("B3").setValue(res[1])
  return "done"
}

function BitmexSaveApi(res)
{
 sheet.getRange("C2").setValue(res[0])
 sheet.getRange("C3").setValue(res[1])
  return "done"
}
function ExmoSaveApi(res)
{
 sheet.getRange("D2").setValue(res[0])
 sheet.getRange("D3").setValue(res[1])
  return "done"
}
function iDSaveApi(res)
{
  sheet.getRange("E2").setValue(res[0])
  return "done"
}

function TeleSaveApi(res)
{
  telebot .getRange("B2").setValue(res[0])
  telebot .getRange("B3").setValue(res[1])
  telebot .getRange("B4").setValue(res[2])
  return "done"
}














