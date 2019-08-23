var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName("API");
var exmopairFiltr = ss.getSheetByName("ExmoSettingPair");
var binancepairFiltr = ss.getSheetByName("BinanceSettingPair");
var bitmexpairFiltr = ss.getSheetByName("BitmexSettingPair");
//////////////

function exmoPairCount() {
  var a = ExmoCurrency();
  var b = ExmoTicker(); 
  var c= ExmoPairSettings();
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
        exmopairFiltr.getRange("T"+((countB*1)+1)).setValue(pair);
        exmopairFiltr.getRange("B"+((countB*1)+1)).setValue(pair);
        sheet.getRange("D"+((countB*1)+4)).setValue(pair);
        exmopairFiltr.getRange("U"+((countB*1)+1)).setValue(c[pair].min_quantity);
        exmopairFiltr.getRange("V"+((countB*1)+1)).setValue(c[pair].max_quantity);
        exmopairFiltr.getRange("W"+((countB*1)+1)).setValue(c[pair].min_price);
        exmopairFiltr.getRange("X"+((countB*1)+1)).setValue(c[pair].max_price);
        exmopairFiltr.getRange("Y"+((countB*1)+1)).setValue(c[pair].max_amount);
        exmopairFiltr.getRange("Z"+((countB*1)+1)).setValue(c[pair].min_amount);
      }
    }
  }
  sheet.getRange("D4").setValue(countB)
  exmopairFiltr.getRange("A1").setValue(countB);
}

/////////////////
function BinanceUpdatePair()
{
  var a = BinanceExchangeInfo()
  var b = BinanceAccount()
  var countA = 0;
  var countB = 0;
  var pair;
  var listPair=[];
  Logger.log(a)
  for (var i=0; i<15000;i++)
  {
    if (a.symbols[i]!=null)
    {
      listPair[countB]=a.symbols[i].symbol;
      countB++;
      binancepairFiltr.getRange("Е"+(i+2)).setValue(a.symbols[i].symbol);
      binancepairFiltr.getRange("B"+(i+2)).setValue(a.symbols[i].symbol);
      sheet.getRange("B"+(i+5)).setValue(a.symbols[i].symbol);
      binancepairFiltr.getRange("U"+(i+2)).setValue(a.symbols[i].status);
      binancepairFiltr.getRange("V"+(i+2)).setValue(a.symbols[i].filters[0].minPrice);
      binancepairFiltr.getRange("W"+(i+2)).setValue(a.symbols[i].filters[0].maxPrice);
      binancepairFiltr.getRange("X"+(i+2)).setValue(a.symbols[i].filters[0].tickSize);
      binancepairFiltr.getRange("Y"+(i+2)).setValue(a.symbols[i].filters[2].minQty);
      binancepairFiltr.getRange("Z"+(i+2)).setValue(a.symbols[i].filters[2].maxQty);
      binancepairFiltr.getRange("AA"+(i+2)).setValue(a.symbols[i].filters[2].stepSize);
      binancepairFiltr.getRange("AB"+(i+2)).setValue(a.symbols[i].filters[3].minNotional);
      binancepairFiltr.getRange("AC"+(i+2)).setValue(a.symbols[i].baseAsset);
      binancepairFiltr.getRange("AD"+(i+2)).setValue(a.symbols[i].quoteAsset);
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
  sheet.getRange("B4").setValue(countB)
  binancepairFiltr.getRange("A1").setValue(countB);
  var res1 = [];
  res1[0]=listPair;
  res1[1]=countB;
  
}
////////////////////

function BitmexUpdatePair()
{
  var s = UrlFetchApp.fetch("https://www.bitmex.com/api/v1/instrument?filter=%7B%22state%22%3A%20%22Open%22%7D")
  var res = JSON.parse(s.getContentText())
  var count = 0
  for (var i = 0;i<4000;i++)
  {
    if (res[i]!=undefined){
      count++;
      sheet.getRange("C"+(i+5)).setValue(res[i].symbol)
      bitmexpairFiltr.getRange("X"+(i+2)).setValue(res[i].symbol)
      bitmexpairFiltr.getRange("Y"+(i+2)).setValue(res[i].maxOrderQty) 
      bitmexpairFiltr.getRange("Z"+(i+2)).setValue(res[i].maxPrice)
      bitmexpairFiltr.getRange("AA"+(i+2)).setValue(res[i].lotSize)
      bitmexpairFiltr.getRange("AB"+(i+2)).setValue(res[i].tickSize)
      bitmexpairFiltr.getRange("B"+(i+2)).setValue(res[i].symbol)
    }
    else{
      i=4002
      sheet.getRange("C4").setValue(count)
      bitmexpairFiltr.getRange("A1").setValue(count)
    
    }
  }
  
}








