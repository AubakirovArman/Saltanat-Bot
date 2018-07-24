/////////////////////////////////
//////Создание ордера 
function BinanceCreatOrder(pair,side,type,timeInForce,quantity,price,newOrderRespType,stopPrice)
{
  var param;
  if (type=="LIMIT")
  {
    param = "symbol="+pair+"&side="+side+"&type="+type+"&timeInForce="+timeInForce+"&quantity="+quantity+"&price="+price+"&newOrderRespType="+newOrderRespType;
  }
  else if (type=="MARKET")
  {
    param = "symbol="+pair+"&side="+side+"&type="+type+"&quantity="+quantity+"&newOrderRespType="+newOrderRespType;
  }
  else if ((type=="STOP_LOSS")||(type=="TAKE_PROFIT"))
  {
    param = "symbol="+pair+"&side="+side+"&type="+type+"&quantity="+quantity+"&stopPrice"+stopPrice+"&newOrderRespType="+newOrderRespType;
  }
  else if ((type=="STOP_LOSS_LIMIT")||(type=="TAKE_PROFIT_LIMIT"))
  {
    param = "symbol="+pair+"&side="+side+"&type="+type+"&timeInForce="+timeInForce+"&quantity="+quantity+"&price="+price+"&stopPrice"+stopPrice+"&newOrderRespType="+newOrderRespType;  
  }
  else if (type=="LIMIT_MAKER ")
  {
     param = "symbol="+pair+"&side="+side+"&type="+type+"&quantity="+quantity+"&price="+price+"&newOrderRespType="+newOrderRespType; 
  }
  var res = Binance("/api/v3/order",param,3)
  return res;
}

//////////////////////////
//////////// тест ордера
function BinanceTestOrder(pair,side,type,timeInForce,quantity,price,newOrderRespType,stopPrice)
{
  var param;
  if (type=="LIMIT")
  {
    param = "symbol="+pair+"&side="+side+"&type="+type+"&timeInForce="+timeInForce+"&quantity="+quantity+"&price="+price+"&newOrderRespType="+newOrderRespType;
  }
  else if (type=="MARKET")
  {
    param = "symbol="+pair+"&side="+side+"&type="+type+"&quantity="+quantity+"&newOrderRespType="+newOrderRespType;
  }
  else if ((type=="STOP_LOSS")||(type=="TAKE_PROFIT"))
  {
    param = "symbol="+pair+"&side="+side+"&type="+type+"&quantity="+quantity+"&stopPrice"+stopPrice+"&newOrderRespType="+newOrderRespType;
  }
  else if ((type=="STOP_LOSS_LIMIT")||(type=="TAKE_PROFIT_LIMIT"))
  {
    param = "symbol="+pair+"&side="+side+"&type="+type+"&timeInForce="+timeInForce+"&quantity="+quantity+"&price="+price+"&stopPrice"+stopPrice+"&newOrderRespType="+newOrderRespType;  
  }
  else if (type=="LIMIT_MAKER ")
  {
     param = "symbol="+pair+"&side="+side+"&type="+type+"&quantity="+quantity+"&price="+price+"&newOrderRespType="+newOrderRespType; 
  }
  var res = Binance("/api/v3/order/test",param,3)
  return res;
}
/////////////////////////////////
/////////инфа об ордере
function BinanceOrderInfo(pair,OrderID)
{
  var res = Binance("/api/v3/order","&symbol="+pair+"&orderId="+OrderID,2)
  return res;
}


//////////////////////
///////отмена ордера
function BinanceCancelOrder(pair,OrderID)
{
  var res = Binance("/api/v3/order","&symbol="+pair+"&orderId="+OrderID,4)
  return res;
}

//////////////////////////////////
///////////открытые ордера
function BinanceOpenOrders(pair)
{
  var res;
  if (pair==null)
  {
    res = Binance("/api/v3/openOrders","",2)
  }
  else
  {
    res = Binance("/api/v3/openOrders","&symbol="+pair,2)
  }
  return res
    
}


//////////////////////////////
/////////Все ордера по выбранной валюте 
function BinanceAllOrders(pair)
{
  var res = Binance("/api/v3/allOrders","&symbol="+pair,2)
  Logger.log(res)
  return res;
}

//////////////////////////////////////
////////Инфо об Аккаунте
function BinanceAccount()
{
  var res = Binance("/api/v3/account","",2)
  return res;
}
//////////////////////////////////////
///////////////Метод позволяет получить историю торгов авторизованного пользователя по указанной паре.

function BinanceMyTrades(pair)
{
  var res = Binance("/api/v3/myTrades","&symbol="+pair,2)
  return res;
}