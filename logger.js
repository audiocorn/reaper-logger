// ==UserScript==
// @name         Reaper Logger
// @namespace    http://www.artofproblemsolving.com/reaper
// @version      2.0
// @description  Saves all incoming reaps into the Google Sheet.
// @copyright    2018 Bowen Yin (revised 2024 by audiocorn)
// @match        *artofproblemsolving.com/reaper/reaper.php?id=*
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @downloadURL  https://raw.githubusercontent.com/BowenYin/auto-reaper/master/logger.js
// ==/UserScript==

var callback=function(mutationsList) {
  var reap=document.getElementById("recent-reaps").getElementsByTagName("p")[0].innerText;
  reap=reap.replace(",","").replace(" reaped on ","/").replace(" and gained ","/");
  var array=reap.split("/");
  if (array[2].indexOf(" Double")!=-1)
	array[3]=2;
  else if (array[2].indexOf(" Triple")!=-1)
	array[3]=3;
  else if (array[2].indexOf(" Quadruple")!=-1)
	array[3]=4;
  else if (array[2].indexOf(" Quintuple")!=-1)
	array[3]=5;
  else if (array[2].indexOf(" octuple")!=-1)
	array[3]=8;
  var times=array[2].split(",");
  var seconds=0;
  for (var i in times) {
	var time=times[i].trim();
	var n=parseInt(time);
	if (time.indexOf("ay")!=-1)
	  seconds+=n*60*60*24;
	else if (time.indexOf("our")!=-1)
	  seconds+=n*60*60;
	else if (time.indexOf("inute")!=-1)
	  seconds+=n*60;
	else if (time.indexOf("econd")!=-1)
	  seconds+=n;
  }
  console.log(seconds);
  array[2]=Math.floor(seconds/3600)+":"+Math.floor(seconds%3600/60)+":"+seconds%60;
  seconds=Math.round(seconds/(array[3]||1));
  array[4]=Math.floor(seconds/3600)+":"+Math.floor(seconds%3600/60)+":"+seconds%60;
  if (!array[3]) array[3]="";
  var request;
  if (request) request.abort();
  var data="time="+array[1]+"&user="+array[0]+"&raw="+array[4]+"&actual="+array[2]+"&bonus="+array[3];
  console.log(data);
  request=$.ajax( {
	url: "https://script.google.com/macros/s/AKfycbxVhiQPkvCxkJFLZN7m6WQd92eXV4WGAIyw7iFRYEpoTBHyE7lBz_9plRtk3nQf_qQLIA/exec",
	method: "GET",
	data: data
  });
};
new MutationObserver(callback).observe(document.getElementById("recent-reaps"), {childList: true});
