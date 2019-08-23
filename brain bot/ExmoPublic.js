//////// https://api.exmo.com/v1/trades/?pair=BTC_USD	
////////////////
function ExmoTrades(pair)
{
var res = Exmo("trades/?pair="+pair,"",1)
return res
}
/*
https://api.exmo.com/v1/order_book/?pair=BTC_USD
/////////
*/
function dasd(){
  var res =ExmoOrderBook("DOGE_USD")
  Logger.log(res)
}
function ExmoOrderBook(pair)
{
var res = Exmo("order_book/","pair="+pair,2)
return res
}
/*
https://api.exmo.com/v1/ticker/
*/
function ExmoTicker()
{
  var res = Exmo("ticker/","",1)
 
  return res;
}
/*
//////////////////////
https://api.exmo.com/v1/pair_settings/
*/
function ExmoPairSettings()
{
  var res = Exmo("pair_settings/","",1)
  return res;
}
/*
/////////////////////////////////
https://api.exmo.com/v1/currency/*/
function ExmoCurrency()
{
  var res = Exmo("currency","",1)
  return res;
}

