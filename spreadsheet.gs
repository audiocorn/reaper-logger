var SHEET_NAME="Game 64";
function doPost(e) {
  var sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  var values=[e.parameter["time"],e.parameter["user"],e.parameter["raw"],e.parameter["actual"],e.parameter["bonus"]];
  var lock=LockService.getScriptLock();
  lock.waitLock(30000);
  sheet.insertRowBefore(3).getRange(3,1,1,values.length).setValues([values]);
  lock.releaseLock();
}
