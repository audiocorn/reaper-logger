# Reaper Logger
Scripts to log AoPS Reaper into a real-time Google Sheet.

### Files

###### source-logger.py
Logs all reaps real-time into a Google Spreadsheet by accessing Reaper's source code. All data uses server-side time and is precise to the millisecond, as well as being more resistant to intermittent Internet outages.

###### logger.js
Logs all reaps real-time into a Google Spreadsheet by running a script on the Reaper page.

No longer recommended for use (reap times are only precise to the second, and times displayed are client-side -- see notes on `source-logger.py` for more information).

###### spreadsheet.gs
Google Apps Script to manage incoming real-time reap logs in the spreadsheet.

Here is a current example: http://tiny.cc/90log

Here are some past examples: 
https://docs.google.com/spreadsheets/d/1sekvFCe-6kVCPxH5vcg26MdL4GARJ3MGEtd30QrwfN0 (Game 77)
https://docs.google.com/spreadsheets/d/1HrJOX0t6R956lTl_nwRuj7uyhuD6LsXdOBC4cUATCHg (Game 75)
https://tiny.cc/reaperlog (Games 64-66)

### How to use the spreadsheet script
1. On the Google Sheet that you would like to use to log reaps, navigate to Extensions in the toolbar and click on Apps Script.
2. Paste the contents of `spreadsheet.gs` into `Code.gs`.
3. Click Deploy -> New deployment, and select Web app from the list of deployment types.
4. (Important if you wish to protect the sheet to prevent others from editing reaps!) Set the web app to execute as "Me".
5. Click Deploy and grant the script access to your spreadsheets (this will open in a new window).
6. Copy the Web app URL and paste it into the logger of your choice.

### How to use the new logger script
1. Save `source-logger.py` onto your computer / virtual machine / online IDE, and enter your Web app URL and AoPS account credentials.
2. Download the necessary packages.
3. Run the file.

### How to use the old logger script
#### Easy Way
1. Open `logger.js`, paste in the Web app URL, and copy everything after the gray lines (lines 1-8).
2. Open [Reaper](www.aops.com/reaper), enter a game, and open the console. (⌘⌥J, ⌃⇧J)
3. Paste the code into the console.
#### Proper Way (not recently tested)
1. Open `logger.js` and copy everything.
2. Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) and create a new userscript.
3. Replace all the existing stuff with the code you copied.
4. Open [Reaper](www.aops.com/reaper) and you're done.
   
##### IMPORTANT:
You must keep your computer on if you want the logger to continue running.

I am not responsible for any consequences you incur by using this script.
