// ==UserScript==
// @name         Auto-Reaper Lite
// @namespace    http://www.bowenyin.tk
// @version      1.0
// @description  Automatically reaps when current time is a set amount.
// @match        *artofproblemsolving.com/reaper/reaper.php?id=*
// @copyright    2018 Bowen Yin
// ==/UserScript==
setInterval(autoreap,800);
function autoreap() {
	try {
    var time1="9 minutes, 16 seconds"; // REGULAR REAP TIME: change this value
		// You must follow the format shown on the reaper clock.
		var time2="19 minutes, 43 seconds"; // FREE REAP TIME: will reap at this time if you have free reaps.
		// Free reap time should always be greater than regular reap time.
		var counter=document.getElementById("last-reap").innerHTML;
		if (counter.indexOf(time1)!=-1)
			document.getElementById("reap-button").click();
		else if (counter.indexOf(time2)!=-1)
			document.getElementById("free-reap-container").click();
	} catch(err) {
		console.error(err);
	}
}
