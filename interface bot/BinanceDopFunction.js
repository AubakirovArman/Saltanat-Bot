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

///////////////////////////
///////количество валютных пар для традингвю
function BinancePairСount()
{

  var a = BinanceExchangeInfo()
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
  var res1 = [];
  res1[0]=listPair;
  res1[1]=countB;
  console.log("ss")
  return res1;
}