/*
Наименование метода:	user_info
Тип запроса:	POST
Входящие параметры:	Отсутствуют
*/
function ExmoUserInfo()
{
  var res = Exmo("user_info/","",1);
  Logger.log(res)
  return res;
}
/*
Наименование метода:	order_create
Тип запроса:	POST
Входящие параметры:	
pair - валютная пара

quantity - кол-во по ордеру

price - цена по ордеру

type - тип ордера, может принимать следующие значения:

buy - ордер на покупку
sell - ордер на продажу
market_buy - ордера на покупку по рынку
market_sell - ордер на продажу по рынку
market_buy_total - ордер на покупку по рынку на определенную сумму
market_sell_total - ордер на продажу по рынку на определенную сумму
*/
function ExmoOrderCreat(pair,count,price,type,method) {
  
  if(method==1)
  {
      var res=Exmo("order_create/","&pair="+pair+"&type="+type+"&quantity="+count+"&price="+price,2);
  }
  else if (method==2)
  {
    var res=Exmo("order_create/","&pair="+pair+"&type="+type+"&quantity="+count+"&price=0",2);
  }
//  var res =Exmo("order_create/","&pair=BTC_USD&type=buy&quantity=0.01&price=5000",2)
  Logger.log(res)
    return res;
}
/*
Наименование метода:	order_cancel
Тип запроса:	POST
Входящие параметры:	order_id - идентификатор ордера
*/
function ExmoOrderCancel(OrderID)
{
 
  var res = Exmo("order_cancel/","order_id="+OrderID,2);
  return res;
}
/*
Наименование метода:	user_open_orders
Тип запроса:	POST
Входящие параметры:	отсутствуют
*/
function ExmoUserOpenOrders()
{
  var res = Exmo("user_open_orders","",1);
  Logger.log(res)
  return res;
}
/*
Наименование метода:	user_trades
Тип запроса:	POST
Входящие параметры:	
pair - одна или несколько валютных пар разделенных запятой (пример BTC_USD,BTC_EUR)

offset - смещение от последней сделки (по умолчанию 0)

limit - кол-во возвращаемых сделок (по умолчанию 100, максимум 10 000)
*/
function ExmoUserTrades(pair,offset,limit)
{
  var res = Exmo("user_trades/?pair="+pair+"&offset="+offset+"&limit="+limit,"",1);

  return res;
}
/*
Наименование метода:	user_cancelled_orders
Тип запроса:	POST
Входящие параметры:	
offset - смещение от последней сделки (по умолчанию 0)

limit - кол-во возвращаемых сделок (по умолчанию 100, максимум 10 000)
*/
function ExmoUserCancelledOrders(offset,limit)
{
  var res = Exmo("user_cancelled_orders/?offset="+offset+"&limit="+limit,"",1);
  return res;
}
/*
Наименование метода:	order_trades
Тип запроса:	POST
Входящие параметры:	
order_id - идентификатор ордера
*/
function ExmoOrderTrades(OrderID)
{
  var res = Exmo("order_trades/?order_id="+OrderID,"",1);
  return res;
}
/*
Наименование метода:	required_amount
Тип запроса:	POST
Входящие параметры:	
pair - валютная пара

quantity - кол-во которое необходимо купить
*/
function ExmoRequiredAmount(pair,quantity)
{
var res = Exmo("required_amount/?pair="+pair+"&quantity="+quantity,"",1)
return res;
}
/*
Наименование метода:	deposit_address
Тип запроса:	POST
Входящие параметры:	отсутствуют
*/
function ExmoDepositAddress()
{
var res = Exmo("deposit_address","",1)
return res;
}



