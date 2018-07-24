///// ping binance
function BinancePing()
{
  var res;
  var ping =Binance("/api/v1/ping","",0);
  return ping;
}

///////////////////
////////Time 
function BinanceTime()
{
  var time = Binance("/api/v1/time","",0);
  return time.serverTime;
}
////////// exchangeInfo 
function BinanceExchangeInfo()
{
  var pair = [];
  pair = ["ETHBTC","LTCBTC","BNBBTC","NEOBTC","QTUMETH","EOSETH","SNTETH","BNTETH","BCCBTC","GASBTC","BNBETH","BTCUSDT","ETHUSDT","HSRBTC","OAXETH","DNTETH","MCOETH","ICNETH","MCOBTC","WTCBTC","WTCETH","LRCBTC","LRCETH","QTUMBTC","YOYOBTC","OMGBTC","OMGETH","ZRXBTC","ZRXETH","STRATBTC","STRATETH","SNGLSBTC","SNGLSETH","BQXBTC","BQXETH","KNCBTC","KNCETH","FUNBTC","FUNETH","SNMBTC","SNMETH","NEOETH","IOTABTC","IOTAETH","LINKBTC","LINKETH","XVGBTC","XVGETH","SALTBTC","SALTETH","MDABTC","MDAETH","MTLBTC","MTLETH","SUBBTC","SUBETH","EOSBTC","SNTBTC","ETCETH","ETCBTC","MTHBTC","MTHETH","ENGBTC","ENGETH","DNTBTC","ZECBTC","ZECETH","BNTBTC","ASTBTC","ASTETH","DASHBTC","DASHETH","OAXBTC","ICNBTC","BTGBTC","BTGETH","EVXBTC","EVXETH","REQBTC","REQETH","VIBBTC","VIBETH","HSRETH","TRXBTC","TRXETH","POWRBTC","POWRETH","ARKBTC","ARKETH","YOYOETH","XRPBTC","XRPETH","MODBTC","MODETH","ENJBTC","ENJETH","STORJBTC","STORJETH","BNBUSDT","VENBNB","YOYOBNB","POWRBNB","VENBTC","VENETH","KMDBTC","KMDETH","NULSBNB","RCNBTC","RCNETH","RCNBNB","NULSBTC","NULSETH","RDNBTC","RDNETH","RDNBNB","XMRBTC","XMRETH","DLTBNB","WTCBNB","DLTBTC","DLTETH","AMBBTC","AMBETH","AMBBNB","BCCETH","BCCUSDT","BCCBNB","BATBTC","BATETH","BATBNB","BCPTBTC","BCPTETH","BCPTBNB","ARNBTC","ARNETH","GVTBTC","GVTETH","CDTBTC","CDTETH","GXSBTC","GXSETH","NEOUSDT","NEOBNB","POEBTC","POEETH","QSPBTC","QSPETH","QSPBNB","BTSBTC","BTSETH","BTSBNB","XZCBTC","XZCETH","XZCBNB","LSKBTC","LSKETH","LSKBNB","TNTBTC","TNTETH","FUELBTC","FUELETH","MANABTC","MANAETH","BCDBTC","BCDETH","DGDBTC","DGDETH","IOTABNB","ADXBTC","ADXETH","ADXBNB","ADABTC","ADAETH","PPTBTC","PPTETH","CMTBTC","CMTETH","CMTBNB","XLMBTC","XLMETH","XLMBNB","CNDBTC","CNDETH","CNDBNB","LENDBTC","LENDETH","WABIBTC","WABIETH","WABIBNB","LTCETH","LTCUSDT","LTCBNB","TNBBTC","TNBETH","WAVESBTC","WAVESETH","WAVESBNB","GTOBTC","GTOETH","GTOBNB","ICXBTC","ICXETH","ICXBNB","OSTBTC","OSTETH","OSTBNB","ELFBTC","ELFETH","AIONBTC","AIONETH","AIONBNB","NEBLBTC","NEBLETH","NEBLBNB","BRDBTC","BRDETH","BRDBNB","MCOBNB","EDOBTC","EDOETH","WINGSBTC","WINGSETH","NAVBTC","NAVETH","NAVBNB","LUNBTC","LUNETH","TRIGBTC","TRIGETH","TRIGBNB","APPCBTC","APPCETH","APPCBNB","VIBEBTC","VIBEETH","RLCBTC","RLCETH","RLCBNB","INSBTC","INSETH","PIVXBTC","PIVXETH","PIVXBNB","IOSTBTC","IOSTETH","CHATBTC","CHATETH","STEEMBTC","STEEMETH","STEEMBNB","NANOBTC","NANOETH","NANOBNB","VIABTC","VIAETH","VIABNB","BLZBTC","BLZETH","BLZBNB","AEBTC","AEETH","AEBNB","RPXBTC","RPXETH","RPXBNB","NCASHBTC","NCASHETH","NCASHBNB","POABTC","POAETH","POABNB","ZILBTC","ZILETH","ZILBNB","ONTBTC","ONTETH","ONTBNB","STORMBTC","STORMETH","STORMBNB","QTUMBNB","QTUMUSDT","XEMBTC","XEMETH","XEMBNB","WANBTC","WANETH","WANBNB","WPRBTC","WPRETH","QLCBTC","QLCETH","SYSBTC","SYSETH","SYSBNB","QLCBNB","GRSBTC","GRSETH","ADAUSDT","ADABNB","CLOAKBTC","CLOAKETH","GNTBTC","GNTETH","GNTBNB","LOOMBTC","LOOMETH","LOOMBNB","XRPUSDT","BCNBTC","BCNETH","BCNBNB","REPBTC","REPETH","REPBNB","TUSDBTC","TUSDETH","TUSDBNB","ZENBTC","ZENETH","ZENBNB","SKYBTC","SKYETH","SKYBNB","EOSUSDT","EOSBNB","CVCBTC","CVCETH","CVCBNB","THETABTC","THETAETH","THETABNB","XRPBNB","TUSDUSDT","IOTAUSDT","XLMUSDT","IOTXBTC","IOTXETH","QKCBTC","QKCETH","AGIBTC","AGIETH","AGIBNB","NXSBTC","NXSETH","NXSBNB","ENJBNB","DATABTC","DATAETH","ONTUSDT","TRXUSDT","ETCUSDT","ETCBNB","ICXUSDT","SCBTC","SCETH","SCBNB","NPXSBTC","NPXSETH","VENUSDT","KEYBTC","KEYETH","NASBTC","NASETH","NASBNB","MFTBTC","MFTETH","MFTBNB","DENTBTC","DENTETH","ARDRBTC","ARDRETH","ARDRBNB","NULSUSDT"]
  var res = Binance("/api/v1/exchangeInfo","",0);
  var timezone =res.timezone;
  var serverTime= res.serverTime;
  var sym;
  for (var i =0;i<374;i++)
  {
    sym=sym+"\""+res.symbols[i].symbol+"\",";
  }
  Logger.log(sym)
}
////////////////
/////////Стакан 
function BinanceDepth(pair,limit)
{
  var res = Binance("/api/v1/depth",("symbol="+pair+"&limit="+limit),1);
  return res

}
///////////////
/////Последние сделки чужие 
function BinanceTrades(pair,limit)
{
  var res = Binance("/api/v1/trades",("symbol="+pair+"&limit="+limit),1);
  return res
}

/*
            'historicalTrades': {'url': 'api/v1/historicalTrades', 'method': 'GET', 'private': False},*/
function BinanceHistoricalTrades(pair)
{
  var res = Binance("/api/v1/historicalTrades","symbol=XRPBNB",2);
  Logger.log(res)
  return res
}

/*
            'aggTrades':        {'url': 'api/v1/aggTrades', 'method': 'GET', 'private': False},*/
function BinanceAggTrades(pair)
{
  var res = Binance("/api/v1/aggTrades","symbol="+pair,1);
  Logger.log(res)
  return res
}
/*
            'klines':           {'url': 'api/v1/klines', 'method': 'GET', 'private': False},*/
function BinanceKlines(pair,interval)
{
  var res = Binance("/api/v1/klines","symbol="+pair+"&interval="+interval,1);
  Logger.log(res)
  return res
}
/*
            'ticker24hr':       {'url': 'api/v1/ticker/24hr', 'method': 'GET', 'private': False},*/
function BinanceTicker24hr(pair)
{
  var res = Binance("/api/v1/ticker/24hr","symbol="+pair,1);
  Logger.log(res)
  return res
}
/*
            'tickerPrice':      {'url': 'api/v3/ticker/price', 'method': 'GET', 'private': False},*/
function BinanceTickerPrice(pair)
{
  var res = Binance("/api/v3/ticker/price","symbol="+pair,1);
  Logger.log(res)
  return res
}
/*
            'tickerBookTicker': {'url': 'api/v3/ticker/bookTicker', 'method': 'GET', 'private': False}*/
function BinanceTickerBookTicker(pair)
{
  var res = Binance("/api/v3/ticker/bookTicker","symbol="+pair,1);
  Logger.log(res)
  return res
}
