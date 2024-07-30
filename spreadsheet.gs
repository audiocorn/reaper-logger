// original from: http://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/
// original gist: https://gist.github.com/willpatera/ee41ae374d3c9839c2d6 

// we're now using GET requests
function doGet(e){
  return handleResponse(e);
}

//  sheet name to write data to
        var SHEET_NAME = "Sheet1";

function handleResponse(e) {
  // following comments from hawksey:
  // shortly after my original solution Google announced the LockService[1]
  // this prevents concurrent access overwritting data
  // [1] http://googleappsdeveloper.blogspot.co.uk/2011/10/concurrency-and-google-apps-script.html
  // we want a public lock, one that locks for all invocations
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);  // wait 30 seconds before conceding defeat.
  
  try {

  // define the sheet we're writing to
  var sheet1=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  // unwrap the reap details
  var values=[e.parameter["time"],e.parameter["user"],e.parameter["raw"],e.parameter["actual"],e.parameter["bonus"]];
  
  var lock=LockService.getScriptLock();

  // check that we're not inserting a duplicate reap -- lines 34 to 57 can simply be replaced with the following line if duplicate reaps are not an issue:
  // sheet1.insertRowBefore(3).getRange(3,1,1,values.length).setValues([values])

  // read off the last reap from the sheet
  var data=sheet1.getRange(3,1,1,2).getValues();
  var lastreap=data;

  
  var timestamp=new Date (values[0]);

  // only add the new reap if the two reaps are not the same
  var equal = "T";

  if (values[1] !== lastreap[0][1]) {var equal = "F";
  
  
  // user not equal
  }
  
    else if (timestamp.toISOString() !== JSON.parse(JSON.stringify(lastreap[0][0]))) {var equal = "F";
    
    // timestamp not equal
    };


  // insert reap if it's not a duplicate
  if (equal === "F") {sheet1.insertRowBefore(3).getRange(3,1,1,values.length).setValues([values])};
  } finally { //release lock
    lock.releaseLock();
  }
}


// original code, now deprecated due to CORS restrictions on POST requests. comment out
function doPost(e) {
  var sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  var values=[e.parameter["time"],e.parameter["user"],e.parameter["raw"],e.parameter["actual"],e.parameter["bonus"]];
  var lock=LockService.getScriptLock();
  lock.waitLock(30000);
  sheet.insertRowBefore(3).getRange(3,1,1,values.length).setValues([values]);
  lock.releaseLock();
}
