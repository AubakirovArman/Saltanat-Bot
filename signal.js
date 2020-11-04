class signalClass {
    constructor() {
        this.signalNumber = 0;
        this.status = false;
        this.signalCount = 0;
        this.signalID = 0;
    }
    signalStart() {
        let found = 0;
        this.status = false;
        for (let i = 1; i <= this.signalNumber; i++) {
            let signalSheetID = signalSheet.getRange("B" + i).getValue();

            if (signalSheetID == this.signalID) {
                let signalCountSheet = signalSheet.getRange("C" + i).getValue()
                signalCountSheet++
                signalSheet.getRange("C" + i).setValue(signalCountSheet)
                found = 1
                if (signalCountSheet >= Number(this.signalCount)) {
                    this.status = true
                    for (let i1 = i + 1; i1 <= this.signalNumber; i1++) {
                        signalSheet.getRange("B" + (i1 - 1)).setValue(signalSheet.getRange("B" + i1).getValue())
                        signalSheet.getRange("C" + (i1 - 1)).setValue(signalSheet.getRange("C" + i1).getValue())
                    }
                    signalSheet.getRange("B" + this.signalNumber).setValue("")
                    signalSheet.getRange("C" + this.signalNumber).setValue("")
                    this.signalNumber--
                    signalSheet.getRange("A1").setValue(this.signalNumber)
                }
                break
            }
        }
        if (found == 0) {
            this.signalNumber++
            signalSheet.getRange("C" + this.signalNumber).setValue(1)
            signalSheet.getRange("B" + this.signalNumber).setValue(this.signalID)
            signalSheet.getRange("A1").setValue(this.signalNumber)
        }
    }

}
/////signal
var signalCommand= new signalClass();