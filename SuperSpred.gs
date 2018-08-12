
function SuperSpred() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("superspred");
  var countA = 0;
  var countB = 0;
  var pair;
  var listPair=[];
  var listVol =[];
  var stok="";
  var market = sheet.getRange("H1").getValue();
  var cou =  sheet.getRange("H3").getValue();
  SpredDelete(cou);
  if (market=="exmo")
  {
    var a = ExmoCurrency();
    var b = ExmoTicker(); 
    ExmoSuperSpred(countA,pair,a,b,stok,listPair,countB,listVol,sheet);
  }
  else if (market=="binance")
  {
    BinanceSuperSpred(sheet)
  }
 
}
/////////////////////////////////////////////
///////////////////расчет спреда для биржы binance 
function BinanceSuperSpred(sheet)
{
  var AllIn =BinanceExchangeInfo();
  var stat = BinanceTicker24hrAll();
  Logger.log(stat[0])
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
  var profit = sheet.getRange("H2").getValue();
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
  var krug=1;
  var mat;
  for (var i =0;i<countA;i++)
  {
    if (spred[i]>profit)
    {
      
        mat = BinanceRashet(i,pair,ask,bid,vol,avg,stat,fPair,tPair,vol2)
        sheet.getRange("A"+(1+krug)).setValue(pair[i])
        sheet.getRange("B"+(1+krug)).setValue(ask[i]);
        sheet.getRange("C"+(1+krug)).setValue(bid[i]);
        sheet.getRange("D"+(1+krug)).setValue(mat);
        sheet.getRange("E"+(1+krug)).setValue(spred[i]);
        sheet.getRange("F"+(1+krug)).setValue(vol[i]);
        krug++;
    }
  }
  sheet.getRange("H3").setValue(krug);
  
  
}
/////////////////////
/////////////////расчет обьема в btc binance
function BinanceRashet(i,pair,ask,bid,vol,avg,stat,fPair,tPair,vol2)
{
  var result;
  if (fPair[i]=="BTC")
  {
    result=vol[i];
  }
  else if (tPair[i]=="BTC")
  {
   result=vol2[i];
  }
  else if ((fPair[i]!="BTC")&&(tPair[i]!="BTC"))
  {
    if (pair.indexOf(fPair[i]+"BTC")!=-1)
    {
      result=vol[i]*avg[pair.indexOf(fPair[i]+"BTC")];
    }
    else if (pair.indexOf("BTC"+fPair[i])!=-1)
    {
      result=vol[i]/avg[pair.indexOf("BTC"+fPair[i])];
    }
  }
  return result;
}

////////////////////////////////////////
////////////расчет спреда для биржы  exmo
function ExmoSuperSpred(countA,pair,a,b,stok,listPair,countB,listVol,sheet)
{
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
          stok=stok+pair+",";
          listPair[countB]=pair;
          listVol[countB]=b[pair].vol;
          countB++;
        }
      }
    }
    var res = Exmo("order_book/?pair="+stok+"&limit=1");
    var mat;
    var ask; 
    var bid;  
    var krug=1;
    var spred;
    var profit = sheet.getRange("H2").getValue();
    for (var i=0; i<countB;i++)
    {
      ask = res[listPair[i]].ask_top
      bid = res[listPair[i]].bid_top 
      mat =((ask-bid)/bid)*listVol[i]; 
      spred=100/(bid/(ask-bid));
      
      if (spred>profit) 
      {  
        mat = ExmoRaschet(res,b,listPair[i],mat,listVol[i])
        sheet.getRange("A"+(1+krug)).setValue(listPair[i])
        sheet.getRange("B"+(1+krug)).setValue(ask);
        sheet.getRange("C"+(1+krug)).setValue(bid);
        sheet.getRange("D"+(1+krug)).setValue(mat);
        sheet.getRange("E"+(1+krug)).setValue(spred);
        sheet.getRange("F"+(1+krug)).setValue(listVol[i]);
        krug++;
      }
    }
    sheet.getRange("H3").setValue(krug);
}
//////////////////////////////////////////
////////////////удаления 
function SpredDelete(cou)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("superspred");
  for (var i =2; i<=cou;i++)
  {
    
    sheet.getRange("A"+i).setValue("")
    sheet.getRange("B"+i).setValue("");
    sheet.getRange("C"+i).setValue("");
    sheet.getRange("D"+i).setValue("");
    sheet.getRange("E"+i).setValue("");
    sheet.getRange("F"+i).setValue("");
  }
  
}
//////////////////////////////////////
////////////////расчет обьема btc exmo
function ExmoRaschet(res,b,pair,mat,vol)
{
  var fPair= pair.substring(0,pair.indexOf("_"));
  var tPair = pair.substring(pair.indexOf("_")+1,pair.length);
  
  if (b[fPair+"_BTC"]!=null)
  {
    mat = vol*b[fPair+"_BTC"].avg
  }
  else if (b[fPair+"_USD"]!=null)
  {
    mat = vol*b[fPair+"_USD"].avg;
    mat = mat/b["BTC_USD"].avg;
  }
  else if (b[fPair+"_RUB"]!=null)
  {
    mat = vol*b[fPair+"_RUB"].avg;
    mat = mat/b["BTC_RUB"].avg;
  }
  return mat;
}
