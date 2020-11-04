class formula{
    constructor(){
        this.status='false'
        this.answerSheet='0'
        this.rowId=undefined
        this.rowText=undefined
    }
    checkFormulaStatus(){
        this.answerSheet=formulaSheet.getRange("A1").getValue()
        this.status=false;
        if ((formul.answerSheet == 1) || (formul.answerSheet == "1")){
        	this.status=true;
        }
    }
    rowWtire(){
        if (this.rowId!=undefined){
            formulaSheet.getRange(this.rowId).setValue(this.rowText)
            this.rowId=''
            this.rowText=''
        }
    }
}
///////////formula
var formul = new formula();