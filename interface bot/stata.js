function uploadStata()
{
  var ss2 = SpreadsheetApp.getActiveSpreadsheet();    
  var sheet = ss2.getSheetByName("tradingview");  
  var sheet1 =ss2.getSheetByName("Stata");
  var orderCount=sheet.getRange("R1").getValue();
  var s= sheet1.getRange("M1").getValue();
  
  if (orderCount>0)
  {
    for (var i=1; i<=orderCount; i++)
    {
      var market= sheet.getRange("B"+((i*1)+8)).getValue();
      var pair =sheet.getRange("C"+((i*1)+8)).getValue();
      var count = sheet.getRange("D"+((i*1)+8)).getValue();
      var price =sheet.getRange("E"+((i*1)+8)).getValue();
      var sum =sheet.getRange("F"+((i*1)+8)).getValue();
      var type = sheet.getRange("G"+((i*1)+8)).getValue();
      var id = sheet.getRange("H"+((i*1)+8)).getValue();
      var orderId=sheet.getRange("I"+((i*1)+8)).getValue();
      if (type=="buy")
      {
        for (var i1=i;i1<=orderCount; i1++)
        {
          var market1= sheet.getRange("B"+((i1*1)+8)).getValue();
          var pair1 =sheet.getRange("C"+((i1*1)+8)).getValue();
          var count1 = sheet.getRange("D"+((i1*1)+8)).getValue();
          var price1 =sheet.getRange("E"+((i1*1)+8)).getValue();
          var sum1 =sheet.getRange("F"+((i1*1)+8)).getValue();
          var type1 = sheet.getRange("G"+((i1*1)+8)).getValue();
          var id1 = sheet.getRange("H"+((i1*1)+8)).getValue();
          var orderId1=sheet.getRange("I"+((i1*1)+8)).getValue();
          if ((type1=="sell")&&(pair==pair1)&&(id==id1))
          {
            s++;
            sheet1.getRange("A"+((s*1)+1)).setValue(market);
            sheet1.getRange("B"+((s*1)+1)).setValue(pair);
            sheet1.getRange("C"+((s*1)+1)).setValue(count);
            sheet1.getRange("D"+((s*1)+1)).setValue(price);
            sheet1.getRange("E"+((s*1)+1)).setValue(sum);
            sheet1.getRange("F"+((s*1)+1)).setValue(type);
            sheet1.getRange("G"+((s*1)+1)).setValue(id);
            sheet1.getRange("H"+((s*1)+1)).setValue(orderId);
            var komi=(sum*1)*0.075/100;
            sheet1.getRange("I"+((s*1)+1)).setValue(komi);
            var summa= (sum*1)- (komi*1);
            sheet1.getRange("J"+((s*1)+1)).setValue(summa);
            s++;
            sheet1.getRange("A"+((s*1)+1)).setValue(market1);
            sheet1.getRange("B"+((s*1)+1)).setValue(pair1);
            sheet1.getRange("C"+((s*1)+1)).setValue(count1);
            sheet1.getRange("D"+((s*1)+1)).setValue(price1);
            sheet1.getRange("E"+((s*1)+1)).setValue(sum1);
            sheet1.getRange("F"+((s*1)+1)).setValue(type1);
            sheet1.getRange("G"+((s*1)+1)).setValue(id1);
            sheet1.getRange("H"+((s*1)+1)).setValue(orderId1);
            var komi1=sum1*0.075/100;
            sheet1.getRange("I"+((s*1)+1)).setValue(komi1);
            var summa1= (sum1*1)- (komi*1);
            sheet1.getRange("J"+((s*1)+1)).setValue(summa1);
            i1=(orderCount*1)+4;
            sheet1.getRange('K'+((s*1))+':'+'K'+((s*1)+1)).mergeVertically();
            sheet1.getRange('L'+((s*1))+':'+'L'+((s*1)+1)).mergeVertically();
            var priD =(summa1*1)-(summa*1);
            sheet1.getRange("K"+((s*1))).setValue(priD)
            sheet1.getRange("L"+((s*1))).setValue(priD/summa)
          }
        }
      }
    }
    sheet1.getRange("M1").setValue(s);
  }
}