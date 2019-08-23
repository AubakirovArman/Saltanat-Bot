//////////////////////
//////////Цена продажи топ
function BinanceAskTop(pair) {
  var res =BinanceDepth(pair,5);
  return res.asks[0][0];
}
//////////////////////////
//////// цена покупки топ
function BinanceBidTop(pair) {
  var res =BinanceDepth(pair,5);
  return res.bids[0][0]
}

//////////////////////////////////
////////////Создание ордера на покупку по лимиту 
function BinanceLimitBuy(pair,price,quantity)
{
  var res = BinanceCreatOrder(pair,"BUY","LIMIT","GTC",quantity,price,"ACK","");
  Logger.log(res);
  if (res.msg!=null)
  {
    return res.msg;
  }
  else if (res.orderId!=null)
  {
    return res.orderId;
  }
}
//////////////////////////////////
////////////Создание ордера на продажу по лимиту 
function BinanceLimitSell(pair,price,quantity)
{
  var res = BinanceCreatOrder(pair,"SELL","LIMIT","GTC",quantity,price,"ACK","");
  if (res.msg!=null)
  {
    return res.msg;
  }
  else if (res.orderId!=null)
  {
    return res.orderId;
  }
}
//////////////////////////////
//////// отмена ордера 
function BinanceCanOrder(pair,OrderID)
{
  var res = BinanceCancelOrder(pair,OrderID);
  Logger.log(res)
  if (res.msg!=null)
  {
    return res.msg;
  }
  else if (res.orderId!=null)
  {
    return res.orderId;
  }
}
/////////////////////////
/////////статус ордера
function BinanceStatusOrder(pair,OrderID)
{
  var res = BinanceOrderInfo(pair,OrderID)
  Logger.log(res)
  if (res.msg!=null)
  {
    return res.msg
  }
  else if (res.executedQty!=null)
  {
    if (res.executedQty==res.origQty)
    {
      return "Ордер испольнен польностью"
    }
    else if (res.executedQty=="0.00000000")
    {
      return "Ордер не испольнен"
    }
    else if ((res.executedQty>"0.00000000")&&(res.executedQty<res.origQty))
    {
      return "Ордер испольнен частично"
    }
  }
}

////////////////
////////////инфа о балансе валюты 
function BinanceBalance(symbol)
{
  var res = BinanceAccount()
  for (var i =0; i<15000; i++)
  {
    if (res.balances[i].asset==symbol.toUpperCase())
    {
      return res.balances[i].free
      i=150000;
    }
    else if (res.balances[i]==null)
    {
       return "Такого символа нету"
       i=150000;
    }
  }
}
///////////////////////////////
///////////////// инфо о резерве валюты
function BinanceReserved(symbol)
{
  var res = BinanceAccount()
  for (var i =0; i<15000; i++)
  {
   
    if (res.balances[i]==null)
    {
      return "Такого символа нету"
      i=150000;
    }
    else if (res.balances[i].asset==symbol.toUpperCase())
    {
      return res.balances[i].locked
      i=150000;
    }
  }
}