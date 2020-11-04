class comCommand {
  constructor() {
    this.comrow = undefined;
    this.comlist = "com";
    this.commassiv = undefined;
    this.message = "";
    this.status = "выкл";
  }
  comCheck() {
    if (this.status == "вкл") {
      this.message = this.message.toLowerCase();
      let massiv = this.message.split(';');
      let dictCommandCom = new Map();

      for (let index in massiv) {
        dictCommandCom[massiv[index].split('=')[0]] = massiv[index].split('=')[1];
      }
      if (dictCommandCom['comrow'] != undefined) {
        this.comrow = dictCommandCom['comrow'].toUpperCase();
      }
      if (dictCommandCom['comlist'] != undefined) {
        this.comlist = dictCommandCom['comlist'].toLowerCase();
      }
      if (dictCommandCom['commassiv'] != undefined) {
        this.commassiv = dictCommandCom['commassiv'].toUpperCase();
      }

      if (this.comrow != undefined) {
        this.message = ss.getSheetByName(this.comlist).getRange(this.comrow).getValue();

      } else if (this.commassiv != undefined) {
        let t = ss.getSheetByName(this.comlist).getRange(this.commassiv).getValues();
        this.message = '';

        for (let mes in t) {
          this.message = this.message + t[mes] + "::";
        }

      }

    }
  }
}
////// com
var comCommands = new comCommand();
comCommands.status = settingSheet.getRange("B2").getValue();