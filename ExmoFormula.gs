
/////////////////////////////
////// резерв
function ExmoReserved(symbol)
{
    var balance = Exmo("user_info");
    var result = balance['reserved'][symbol]
    return result;
}
/////////////////////////////
////// баланс 
function ExmoBalance(symbol)
{
    var balance = Exmo("user_info");
    var result = balance['balances'][symbol]
    return result;
}
///////////////////////////////
////////// статус ордера

function ExmoStatusOrder(OrderID,pair,count)
{
  return statusBuyOrder(OrderID,pair,count);
}
////////////////////////////////////
/////топ бид
function ExmoPriceBid(pair)
{
    var stakan=Exmo("order_book/?pair="+pair+"&limit=11");
    return stakan[pair].bid[0][0];
}
////////////////////////////////////
/////топ аск
function ExmoPriceAsk(pair)
{
  var stakan=Exmo("order_book/?pair="+pair+"&limit=11");
  return stakan[pair].ask[0][0];
}
///////////////////////////////////////////////
////////Покупка
function ExmoBuy(pair,price,count) 
{
    var proverkaBuy = Exmo("order_create/?pair="+pair+"&quantity="+count+"&price="+price+"&type=buy");
    if (proverkaBuy.result)  
    {       
      openOrder();        return proverkaBuy.order_id   
    }
    else if (!proverkaBuy.result)     
    {   
      return  proverkaBuy.error     
    }
}

///////////////////////////////////////////////
////////Продажа
function ExmoSell(pair,price,count) 
{
    var proverkaBuy = Exmo("order_create/?pair="+pair+"&quantity="+count+"&price="+price+"&type=sell");
    if (proverkaBuy.result)  
    {           
      return proverkaBuy.order_id   
    }
    else if (!proverkaBuy.result)     
    {   
      return  proverkaBuy.error     
    }
    return proverkaBuy.result
}

////////////////////////////////////////////////
///////////отмена ордера 
function ExmoCancelOrder(orderID)
{
  var id = orderID +0;
  var closeOrder = Exmo("order_cancel/?order_id="+id);
  return closeOrder.result
}