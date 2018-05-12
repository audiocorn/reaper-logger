# Auto Reaper
Scripts to automatically play and log the AoPS Reaper game.

### Files
###### logger.js
Logs all reaps real-time into a Google Spreadsheet: http://tiny.cc/reaperlog

###### reaper.js
Main script to automatically reap at a set time. Use Tampermonkey to inject the script.

###### spreadsheet.gs
Google Apps Script to manage incoming real-time reap logs in the spreadsheet.

### Instructions for using the auto-reaper script
#### Easy Way
1. Open `reaper.js` and copy everything after the gray lines (lines 1-8).
2. Open [Reaper](www.aops.com/reaper), enter a game, and open the console. (⌘⌥J, ⌃⇧J)
3. Paste in the code into the console. Remember to change the values for reap times.
4. To change the values later, type `time1="MM minutes, SS seconds";` into the console.
#### Proper Way
1. Open `reaper.js` and copy everything.
2. Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) and create a new userscript.
3. Replace all the existing stuff with the code you copied and change the values for reap times.
4. Open [Reaper](www.aops.com/reaper) and you're done. To change the values later, simply go to the userscript you created and then reload Reaper.
