///// ping binance
function BinancePing()
{
  var res;
  var ping =Binance("/api/v1/ping","",0);
  Logger.log(ping)
  return ping;
}

///////////////////
////////Time 
function BinanceTime()
{
  var time = Binance("/api/v1/time","",0);
  return time;
}
////////// exchangeInfo 
function BinanceExchangeInfo()
{
  var res = Binance("/api/v1/exchangeInfo","",0);
  return res;
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

/////////////////
//////////история сделок по валютной паре 
function BinanceHistoricalTrades(pair)
{
  var res = Binance("/api/v1/historicalTrades","symbol="+pair,0);
  return res
}

/////////////////////////
////////////Сжатая история сделок
function BinanceAggTrades(pair)
{
  var res = Binance("/api/v1/aggTrades","symbol="+pair,1);
  Logger.log(res)
  return res
}
////////////////////////////////
//////////Данные по свечам
function BinanceKlines(pair,interval)
{
  var res = Binance("/api/v1/klines","symbol="+pair+"&interval="+interval,1);
  Logger.log(res)
  return res
}
///////////////////////////////
//////////////Статистика за 24 часа
function BinanceTicker24hr(pair)
{
  var res = Binance("/api/v1/ticker/24hr","symbol="+pair,1);
  return res
}
//////////////////////////////////
///////////////////Статистика за 24 часа по всем парам 
function BinanceTicker24hrAll()
{
  var res = Binance("/api/v1/ticker/24hr","",0)

  return res
}
////////////////////////////
///////////////Последняя цена по паре
function BinanceTickerPrice(pair)
{
  
  var res = Binance("/api/v3/ticker/price","symbol="+pair,1);
  Logger.log(res)
  return res
}
/////////////////////////////////////
////////////////Лучшие цены покупки/продажи
function BinanceTickerBookTicker(pair)
{
  var res = Binance("/api/v3/ticker/bookTicker","symbol="+pair,1);
  Logger.log(res)
  return res
}
