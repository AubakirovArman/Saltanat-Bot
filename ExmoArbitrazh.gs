function ExmoArbitrash() 
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ExmoArbitrazh");
  var procent=  sheet.getRange("N4").getValue()/100;
  ExmoArbiClear()
  var number = [];
  var listPair = [];
  listPair = ExmoCurrency();
  var b = ExmoTicker(); 
  var one = [];
  var two=[];
  var tri= [];
  var numOne=0;
  var numTwo=0;
  var numTri=0;
  var i = 21951;
  var count =  sheet.getRange("N3").getValue();
  var allBook = ExmoAllOrderBookPair()
  for (var i =0; i<21952; i++)
  {  
    numOne=i%28
    one[i] = listPair[numOne];
    numTwo = ((Math.floor((i-(i%28))/28))%28);
    two[i] = listPair[numTwo];
    numTri = (Math.floor(((Math.floor((i-numOne)/28))-numTwo)/28))%28
    tri[i] = listPair[numTri];
    ExmoArbiCheck(one[i],two[i],tri[i],count,b,allBook,procent)
  } 
}
////////////////////////////////
//////////////// очистка списка 
function ExmoArbiClear()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ExmoArbitrazh");
  var numer2 = sheet.getRange("A1").getValue();
  for (var numer1=2; numer1<=numer2;numer1++)
  {
   
    sheet.getRange("B"+numer1).setValue("");
    sheet.getRange("C"+numer1).setValue("");
    sheet.getRange("D"+numer1).setValue("");
      
    sheet.getRange("E"+numer1).setValue("");
    sheet.getRange("F"+numer1).setValue("");
    sheet.getRange("G"+numer1).setValue("");
    sheet.getRange("H"+numer1).setValue("");
    sheet.getRange("I"+numer1).setValue("");
    sheet.getRange("J"+numer1).setValue("");
    sheet.getRange("K"+numer1).setValue("");
  }
  sheet.getRange("A1").setValue(1);
}
////////////////////////////////////////
///////////////проверка арбитража
function ExmoArbiCheck(one,two,tri,count1,b,allBook,procent)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ExmoArbitrazh");
  var check=[];
  var askBid =[]
  var count= 0;
  if (b[one+"_"+two]!=null)
  {
    check[count]=one+"_"+two;
    askBid[count]="ask"
    count++
  }
  else if (b[two+"_"+one]!=null)
  {
    check[count]=two+"_"+one
      askBid[count]="bid"
    count++
  }
  
  if (b[two+"_"+tri]!=null)
  {
    check[count]=two+"_"+tri
    askBid[count]="ask"
    count++
  }  
  else if (b[tri+"_"+two]!=null)
  {
    check[count]=tri+"_"+two;
    askBid[count]="bid"
    count++
  } 
  
  if (b[one+"_"+tri]!=null)
  {
    check[count]=one+"_"+tri;
    askBid[count]="bid"
    count++
  }
  else if (b[tri+"_"+one]!=null)
  {
    check[count]=tri+"_"+one;
    askBid[count]="ask"
    count++
  }
  if (count==3)
  {
    var arCount =count1;
    var ask = 0;
    var bid =0;
    var price = [];
    var ask =0;
    var bid =0;
    for (var i = 0; i<3;i++)
    {
      ask = (allBook[check[i]].ask_top*1)*(1-procent);
      bid = (allBook[check[i]].bid_top*1)*(1+procent);
      ask=ask.toFixed(8);
      bid=bid.toFixed(8);
      if (askBid[i]=="ask")
      {
        arCount=(arCount*bid)*0.998
        arCount=arCount.toFixed(8);
        price[i]=bid;
      }
      else if (askBid[i]=="bid")
      {
        arCount=(arCount/ask)*0.998
        arCount=arCount.toFixed(8);
        price[i]=ask;
      }
    }
    if (arCount>=count1)
    {
      Logger.log(arCount+">="+count1+"   pair1="+check[0]+"   pair2="+check[1]+"   pair3="+check[2]);
      var numer1 = sheet.getRange("A1").getValue();
      numer1++;
      sheet.getRange("A1").setValue(numer1);
      sheet.getRange("B"+numer1).setValue(check[0]);
      sheet.getRange("C"+numer1).setValue(check[1]);
      sheet.getRange("D"+numer1).setValue(check[2]);
      
      sheet.getRange("E"+numer1).setValue(askBid[0]);
      sheet.getRange("F"+numer1).setValue(askBid[1]);
      sheet.getRange("G"+numer1).setValue(askBid[2]);
      sheet.getRange("H"+numer1).setValue(price[0]);
      sheet.getRange("I"+numer1).setValue(price[1]);
      sheet.getRange("J"+numer1).setValue(price[2]);
      sheet.getRange("K"+numer1).setValue(arCount);
    }
  }
}
//////////////////////////////////////////////
///////////////////возвращает все книги ордеров по всем парам на данный момент 
function ExmoAllOrderBookPair()
{
  var a = ExmoCurrency();
  var b = ExmoTicker(); 
  var countA = 0;
  var countB = 0;
  var pair;
  var listPair=[];
  for (var i=0;i<15000;i++)
  {
    if (a[i]!=null)
    {
      countA++;
    }
    else if (a[i]==null)
    {
      break;
    }
  }
  var text =""
  for (var i =0;i<=countA;i++)
  {
    for(var i2=0;i2<=countA;i2++)
    {
      pair=a[i]+"_"+a[i2];
      if (b[pair]!=null)
      {
        listPair[countB]=pair;
        text=text+","+pair;
        countB++;
      }
    }
  }

  var res = ExmoOrderBook(text);
  return res;
}