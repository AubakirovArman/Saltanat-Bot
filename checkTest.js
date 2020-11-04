function buttonCheckcom() {

  var message = com.getRange("B2").getValue();

  comCommands.message = message;
  comCommands.comCheck();
  message = comCommands.message;

  obrabotkaMesageClass(message)
}

// функция для обновления фильтров 
function updateFilter() {
  // start
  filterSheet.getRange("F2").setValue("start");


  // binance fto filter
  binanceFto.BinanceFilterFutures();
  filterComman.json = binanceFto.binanceConnect();
  filterComman.table = filterSheet.getRange("B2");
  filterComman.jsonFromDictFutures();
  // binance spot filter

  binance.BinanceFilterSpot();
  filterComman.json = binance.binanceConnect();
  filterComman.jsonFromDictSpot()

  // binance ftu filter

  binanceFtu.BinanceFilterFutures();
  filterComman.json = binanceFtu.binanceConnect();
  filterComman.table = filterSheet.getRange("C2");
  filterComman.jsonFromDictFutures();
  // binance fru filter

  binanceFru.BinanceFilterFutures();
  filterComman.json = binanceFru.binanceConnect();
  filterComman.table = filterSheet.getRange("D2");
  filterComman.jsonFromDictFutures();
  // binance fro filter

  binanceFro.BinanceFilterFutures();
  filterComman.json = binanceFro.binanceConnect();
  filterComman.table = filterSheet.getRange("E2");
  filterComman.jsonFromDictFutures();
  // done 
  filterSheet.getRange("F2").setValue("done");
}

