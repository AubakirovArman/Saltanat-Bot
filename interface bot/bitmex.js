//Bitmex GET /announcement
function BitmexAnnouncement() {
  var res = Bitmex("/api/v1/announcement",{},"GET",1)
  Logger.log(res)
  return res
}
//Bitmex GET /announcement
function BitmexAnnouncementurgent() {
  var res = Bitmex("/api/v1/announcement/urgent",{},"GET",2)
  Logger.log(res)
  return res
}
//Bitmex GET apikey
function BitmexApiKey() {
  var res = Bitmex("/api/v1/apiKey",{},"GET",2)
  Logger.log(res)
  return res
}
//Bitmex Post apikey
function BitmexApiKeyPost() {
  var res = Bitmex("/api/v1/apiKey",{},"GET",2)
  Logger.log(res)
  return res
} 

//Bitmex Delete apikey
function BitmexApiKeyDelete(apikey) {
  var res = Bitmex("/api/v1/apiKey",{"apiKeyID":apikey},"DELETE",3)
  Logger.log(res)
  return res
} 
//Bitmex Delete apikey
function BitmexApiKeyDisable(apikey) {
  var res = Bitmex("/api/v1/apiKey/disable",{"apiKeyID":apikey},"POST",3)
  Logger.log(res)
  return res
} 

//GET /execution
function BitmexExecution() {
  var res = Bitmex("/api/v1/execution",{},"GET",2)
  Logger.log(res)
  return res
}

//GET /execution/tradeHistory
function BitmexExecutionTradeHistory() {
  var res = Bitmex("/api/v1/tradeHistory",{},"GET",2)
  Logger.log(res)
  return res
}
//GET /funding
function Bitmexfunding() {
  var res = Bitmex("/api/v1/funding",{},"GET",2)
  Logger.log(res)
  return res
}
//GET /instrument
function Bitmexinstrument() {
  var res = Bitmex("/api/v1/instrument",{},"GET",2)
  Logger.log(res)
  return res
}
//GET /instrument/active
function Bitmexinstrumentactive() {
  var res = Bitmex("/api/v1/instrument/active",{},"GET",2)
  Logger.log(res)
  return res
}
//GET /instrument/activeAndIndices
function BitmexinstrumentactiveAndIndices() {
  var res = Bitmex("/api/v1/instrument/activeAndIndices",{},"GET",2)
  Logger.log(res)
  return res
}

//GET /instrument/activeIntervals
function BitmexinstrumentactiveIntervals() {
  var res = Bitmex("/api/v1/instrument/activeIntervals",{},"GET",2)
  Logger.log(res)
  return res
}
//GET /instrument/compositeIndex
function BitmexinstrumentcompositeIndex(symbol) {
  var res = Bitmex("/api/v1/instrument/compositeIndex",'symbol='+symbol,"GET",0)
  Logger.log(res)
  return res
}

//GET /instrument/indices
function Bitmexinstrumentindices() {
  var res = Bitmex("/api/v1/instrument/indices",{},"GET",2)
  Logger.log(res)
  return res
}
//GET /leaderboard
function Bitmexleaderboard(method) {
  var res = Bitmex("/api/v1/leaderboard",'method='+method,"GET",0)
  Logger.log(res)
  return res
}
//GET /leaderboard/name
function Bitmexleaderboardname() {
  
  var res = Bitmex("/api/v1/leaderboard/name",{},"GET",2)
  Logger.log(res)
  return res
}
///liquidation
function Bitmexliquidation() {
  
  var res = Bitmex("/api/v1/liquidation","","GET",2)
  Logger.log(res)
  return res
}
//GET /order

function Bitmexorder() {
  
  var res = Bitmex("/api/v1/order","","GET",2)
  Logger.log(res)
  return res
}
//PUT /order
function BitmexorderPut(orderid) {
  
  var res = Bitmex("/api/v1/order",{"orderID":orderid},"PUT",3)
  Logger.log(res)
  return res
}
//PUT /order
function BitmexorderPost(symbol,side,orderQty,price,stopPx,ordType) {
  if (ordType=="Market"){
    var res = Bitmex("/api/v1/order",{"symbol":symbol,"side":side,"orderQty":orderQty},"POST",3)
    }
  else if (ordType=="Limit"){
    var res = Bitmex("/api/v1/order",{"symbol":symbol,"side":side,"orderQty":orderQty,"ordType":ordType},"POST",3)
    }
  else if (ordType=="Stop"){
    
  }
  else if (ordType=="StopLimit"){
    var res = Bitmex("/api/v1/order",{"symbol":symbol,"side":side,"price":price,"orderQty":orderQty,"stopPx":stopPx,"ordType":ordType},"POST",3)
    }
  else if (ordType=="MarketIfTouched"){
    var res = Bitmex("/api/v1/order",{"symbol":symbol,"side":side,"orderQty":orderQty,"stopPx":stopPx,"ordType":ordType},"POST",3)
  }
  else if (ordType=="LimitIfTouched"){
    var res = Bitmex("/api/v1/order",{"symbol":symbol,"side":side,"price":price,"orderQty":orderQty,"stopPx":stopPx,"ordType":ordType},"POST",3)
  }
  
  Logger.log(res)
  return res
}
//delete order
function BitmexorderDelete(orderid) {
  
  var res = Bitmex("/api/v1/order",{"orderID":orderid},"DELETE",3)
  Logger.log(res)
  return res
}

//DELETE /order/all
function BitmexorderDeleteAll(orderid) {
  
  var res = Bitmex("/api/v1/order/all",{},"DELETE",3)
  Logger.log(res)
  return res
}
//GET /orderBook/L2
function BitmexorderBookL2(symbol) {
  var res = Bitmex("/api/v1/orderBook/L2","symbol="+symbol,"GET",0)
  Logger.log(res)
  return res
}
//GET /position
function BitmexpositionGet(symbol) {
  var res = Bitmex("/api/v1/position","","GET",2)
  Logger.log(res)
  return res
}
//POST /position/isolate?
function BitmexPositionisolate(symbol) {
  var res = Bitmex("/api/v1/position/isolate",{"symbol":symbol},"POST",3)
  Logger.log(res)
  return res
}

























