# Reaper Logger
Scripts to log AoPS Reaper into a real-time Google Sheet.

### Files
###### logger.js
Logs all reaps real-time into a Google Spreadsheet: [link to be added later]

###### spreadsheet.gs
Google Apps Script to manage incoming real-time reap logs in the spreadsheet.

### How to use the spreadsheet script
[to follow]

### How to use the logger script
#### Easy Way
1. Open `logger.js` and copy everything after the gray lines (lines 1-8).
2. Open [Reaper](www.aops.com/reaper), enter a game, and open the console. (⌘⌥J, ⌃⇧J)
3. Paste the code into the console.
#### Proper Way (not recently tested)
1. Open `logger.js` and copy everything.
2. Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) and create a new userscript.
3. Replace all the existing stuff with the code you copied.
4. Open [Reaper](www.aops.com/reaper) and you're done.
   
##### IMPORTANT:
You must keep your laptop on and the browser tab open if you want the logger to continue running.

I am not responsible for any consequences you incur by using this script.
