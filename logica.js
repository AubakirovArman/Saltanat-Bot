
///////////////обработка сообщение 
function obrabotkaMesageClass(mesage) {
  mesage = mesage.toLowerCase()
  var t = mesage.split("::")
  loggi.countLog = logiSheet.getRange("A1").getValue();
  for (var i = 0; i < t.length; i++) {
    loggi.messageTradingview = t[i];
    teleg.text = t[i];

    let massiv = t[i].split(';')

    let dictCommand = new Map()
    for (index in massiv) {
      dictCommand[massiv[index].split('=')[0]] = massiv[index].split('=')[1]
    }
    let formula = "false";
    if (dictCommand['formula'] != undefined) { formula = dictCommand['formula']; }
    let rowid = dictCommand['rowid'];
    let rowText = dictCommand['rowtext'];
    if (dictCommand['market'] != undefined) {
      let market = dictCommand['market'];

      let marketClass = marketDict[market];
      if (dictCommand['symbol'] != undefined) {
        marketClass.pair = dictCommand['symbol'].toUpperCase();
      }
      if (dictCommand['side'] != undefined) {
        marketClass.side = dictCommand['side'].toUpperCase();
      }
      if (dictCommand['ordertype'] != undefined) {
        marketClass.type = dictCommand['ordertype'].toUpperCase();
      }
      marketClass.timeInForce = "GTC";
      if (dictCommand['timeinforce'] != undefined) { marketClass.timeInForce = dictCommand['timeinforce']; }
      marketClass.quantity = dictCommand['quantity'];
      marketClass.price = dictCommand['price'];
      marketClass.newOrderRespType = "ACK";
      if (dictCommand['neworderresptype'] != undefined) { marketClass.newOrderRespType = dictCommand['neworderresptype']; }
      marketClass.stopPrice = dictCommand['stopprice'];
      marketClass.quoteOrderQty = dictCommand['quoteorderqty'];
      marketClass.callbackRate = 0.5;
      if (dictCommand['callbackrate'] != undefined) { marketClass.callbackRate = dictCommand['callbackrate']; }

      marketClass.leverage = 0;
      if (dictCommand['leverage'] != undefined) { marketClass.leverage = dictCommand['leverage'].toUpperCase(); }
      marketClass.reduceOnly = "false";
      if (dictCommand['reduceonly'] != undefined) { marketClass.reduceOnly = dictCommand['reduceonly']; }
      marketClass.closePosition = "false";
      if (dictCommand['closeposition'] != undefined) { marketClass.closePosition = dictCommand['closeposition']; }
      marketClass.allClose = "false";
      if (dictCommand['allclose'] != undefined) { marketClass.allClose = dictCommand['allclose']; }
      let signalCount = dictCommand['signalcount'];
      let signalID = dictCommand['signalid'];




      if (formula == "true") {
        formul.rowId = rowid;
        formul.rowText = rowText;
        formul.rowWtire();
        formul.checkFormulaStatus();
        if (formul.status) {
          let res = marketClass.binanceStart();
          loggi.answerMarket = res;
          loggi.addLog();
          teleg.answerMarket = res;
          teleg.telegramSendLog();

        }

      }
      else if (signalID != undefined) {

        signalCommand.signalID = signalID;
        signalCommand.signalCount = signalCount;
        signalCommand.signalNumber=signalSheet.getRange("A1").getValue();
        signalCommand.signalStart();
        if (signalCommand.status) {
          let res = marketClass.binanceStart();
          loggi.answerMarket = res;
          loggi.addLog();
          teleg.answerMarket = res;
          teleg.telegramSendLog();
        }
      }
      else {

        let res = marketClass.binanceStart();

        loggi.answerMarket = res;
        loggi.addLog();
        teleg.answerMarket = res;
        teleg.telegramSendLog();
      }
    }
    else if (formula == "true") {
      formul.rowId = rowid;
      formul.rowText = rowText;
      formul.rowWtire();
    }
  }
}
