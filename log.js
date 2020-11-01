class logi{
    constructor() {
        this.messageTradingview = "";
        this.messageAnswerExchange = "";
        this.countLog = 0;
        this.statusLog = false;
    }
    ///добавления логов
    addLog() {
        if (this.statusLog=="вкл") {
            this.countLog=logiSheet.getRange("A1").getValue();
            logiSheet.getRange("C" + Number(this.countLog + 2)).setValue(this.messageTradingview);
            logiSheet.getRange("B" + Number(this.countLog + 2)).setValue(this.messageAnswerExchange);
            this.countLog += 1;
            logiSheet.getRange("A1").setValue(Number(this.countLog));
        }
    }
}


//////log
var loggi = new logi();
loggi.statusLog=settingSheet.getRange("B1").getValue();