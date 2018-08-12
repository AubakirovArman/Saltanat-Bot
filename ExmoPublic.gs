//////// https://api.exmo.com/v1/trades/?pair=BTC_USD	
////////////////
function ExmoTrades(pair)
{
var res = Exmo("trades/?pair="+pair)
return res
}
/*
https://api.exmo.com/v1/order_book/?pair=BTC_USD
/////////
*/
function ExmoOrderBook(pair)
{
var res = Exmo("order_book/?pair="+pair)
return res
}
/*
https://api.exmo.com/v1/ticker/
*/
function ExmoTicker()
{
  var res = Exmo("ticker/")
  return res;
}
/*
//////////////////////
https://api.exmo.com/v1/pair_settings/
*/
function ExmoPairSettings()
{
  var res = Exmo("pair_settings/")
  return res;
}
/*
/////////////////////////////////
https://api.exmo.com/v1/currency/*/
function ExmoCurrency()
{
  var res = Exmo("currency")
  return res;
}

