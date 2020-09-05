let apiServer = "http://104.248.224.184:1027/api"
//let apiServer = "http://localhost:1027/api"
var ldrbrd = [];
getLeaderboard();

// === GENERAL ===
var lastIndex, index;
var fadeIns = document.createElement('style');


async function getLeaderboard() {
	try{
		let response = await fetch(apiServer + "/getUsers");
		ldrbrd = await response.json();
		ldrbrd = ldrbrd.users;
		
		orderBoard();
		ldrbrd = ldrbrd.slice(0, 100);
		refactorBoard();
		populateData();
	}
	catch(error){
		console.log(error);
	}
}

function orderBoard() {
	ldrbrd.sort((a,b) => b.stats.score - a.stats.score)
}
function refactorBoard() {
	var rows = [];

	for(var i = 0; i<ldrbrd.length; i++) {
		if(ldrbrd[i].name == "RedPV") {
			console.log("RED", ldrbrd[i].stats);
		}
		row = [ldrbrd[i].name, ldrbrd[i].stats.rank, parseInt(ldrbrd[i].stats.score), 0, parseInt(ldrbrd[i].commTypes)];
		rows.push(row);
	}

	ldrbrd = rows;
	//console.log(ldrbrd);

}

	
function populateData() {
	genStyle();
	populateFirstFour();
	appendGreys();
}

function genStyle() {
	var sheet = document.createElement("style");

	console.log(ldrbrd.length);
	// WebKit hack :(
		sheet.appendChild(document.createTextNode(""));

		// Add the <style> element to the page
		document.head.appendChild(sheet);
	for(var i = 1; i<=ldrbrd.length; i++) {
		var dur = ((ldrbrd.length - i) * 0.2);
		var rule = 	".f"+(i)+ " {opacity: 0; animation: fadeIn ease 1.1s; "+
					"animation-fill-mode: forwards; animation-delay: "+ dur +"s; }";
		//console.log(rule);
		sheet.sheet.insertRule(rule);
	}


}

function populateFirstFour() {
	index = ldrbrd.length;

	if(ldrbrd.length > 0) {
		var one = document.createElement('div');
		one.className = "lbrow f"+index;
		one.id = "one";
		one.style.zIndex = index--;
		one.onmouseover = function() {onHoverRowStyleChange(this)};
		one.onmouseout = function() {onReleaseRowStyleChange(this)};

		var regionA = document.createElement('div'),
			regionB = document.createElement('div'),
			regionC = document.createElement('div'),
			regionD = document.createElement('div'),
			regionE = document.createElement('div');
			
		regionA.innerHTML = "#1";
		regionA.className = "regionA";
		regionA.style.fontWeight = "1000";
		
		regionB.innerHTML = ldrbrd[0][0];
		regionB.className = "regionB";
		
		regionC.innerHTML = ldrbrd[0][1];
		regionC.className = "regionC";
		
		regionD.innerHTML = ldrbrd[0][2];
		regionD.className = "regionD";
			
		regionE.className = "regionE";

		var flags = leadingZeros(ldrbrd[0][4].toString(2), 15);
		//console.log("fl", flags);

		if(flags.substring(12, 13) == "1") {
			// DMOG
			var pill = document.createElement("div");
			pill.id = "dmogpill";
			pill.className = "pill";
			pill.innerHTML = "DMOG";
			regionE.appendChild(pill);
		}
		if(flags.substring(13, 14) == "1") {
			// DM20
			var pill = document.createElement("div");
			pill.id = "dmtpill";
			pill.className = "pill";
			pill.innerHTML = "DM20";
			regionE.appendChild(pill);
		}
		if(flags.substring(14, 15) == "1") {
			// Pen20
			var pill = document.createElement("div");
			pill.id = "pentpill";
			pill.className = "pill";
			pill.innerHTML = "Pen20";
			regionE.appendChild(pill);
		}
		
		one.appendChild(regionE);
		one.appendChild(regionA);
		one.appendChild(regionB);
		one.appendChild(regionC);
		one.appendChild(regionD);
		
		document.getElementById("topfour").appendChild(one);
	}
	if(ldrbrd.length > 1) {
		var two = document.createElement('div');
		two.className = "lbrow f"+index;
		two.id = "two";
		two.style.zIndex = index--;
		two.onmouseover = function() {onHoverRowStyleChange(this)};
		two.onmouseout = function() {onReleaseRowStyleChange(this)};

		var regionA = document.createElement('div'),
			regionB = document.createElement('div'),
			regionC = document.createElement('div'),
			regionD = document.createElement('div'),
			regionE = document.createElement('div');
			
		regionA.innerHTML = "#2";
		regionA.className = "regionA";
		regionA.style.fontWeight = "1000";
		regionA.style.color = "#ffcb63";
		
		regionB.innerHTML = ldrbrd[1][0];
		regionB.className = "regionB";
		
		regionC.innerHTML = ldrbrd[1][1];
		regionC.className = "regionC";
		
		regionD.innerHTML = ldrbrd[1][2];
		regionD.className = "regionD";
			
		regionE.className = "regionE";

		var flags = leadingZeros(ldrbrd[1][4].toString(2), 15);
		//console.log("fl", flags);

		if(flags.substring(12, 13) == "1") {
			// DMOG
			var pill = document.createElement("div");
			pill.id = "dmogpill";
			pill.className = "pill";
			pill.innerHTML = "DMOG";
			regionE.appendChild(pill);
		}
		if(flags.substring(13, 14) == "1") {
			// DM20
			var pill = document.createElement("div");
			pill.id = "dmtpill";
			pill.className = "pill";
			pill.innerHTML = "DM20";
			regionE.appendChild(pill);
		}
		if(flags.substring(14, 15) == "1") {
			// Pen20
			var pill = document.createElement("div");
			pill.id = "pentpill";
			pill.className = "pill";
			pill.innerHTML = "Pen20";
			regionE.appendChild(pill);
		}
		
		two.appendChild(regionE);
		two.appendChild(regionA);
		two.appendChild(regionB);
		two.appendChild(regionC);
		two.appendChild(regionD);

		document.getElementById("topfour").appendChild(two);
	}
	if(ldrbrd.length > 2) {
		var three = document.createElement('div');
		three.className = "lbrow f"+index;
		three.id = "three";
		three.style.zIndex = index--;
		three.onmouseover = function() {onHoverRowStyleChange(this)};
		three.onmouseout = function() {onReleaseRowStyleChange(this)};

		var regionA = document.createElement('div'),
			regionB = document.createElement('div'),
			regionC = document.createElement('div'),
			regionD = document.createElement('div'),
			regionE = document.createElement('div');
			
		regionA.innerHTML = "#3";
		regionA.className = "regionA";
		regionA.style.fontWeight = "1000";
		regionA.style.color = "#777";
		
		regionB.innerHTML = ldrbrd[2][0];
		regionB.className = "regionB";
		
		regionC.innerHTML = ldrbrd[2][1];
		regionC.className = "regionC";
		
		regionD.innerHTML = ldrbrd[2][2];
		regionD.className = "regionD";

		regionE.className = "regionE";
	
		var flags = leadingZeros(ldrbrd[0][4].toString(2), 15);
		//console.log("fl", flags);

		if(flags.substring(12, 13) == "1") {
			// DMOG
			var pill = document.createElement("div");
			pill.id = "dmogpill";
			pill.className = "pill";
			pill.innerHTML = "DMOG";
			regionE.appendChild(pill);
		}
		if(flags.substring(13, 14) == "1") {
			// DM20
			var pill = document.createElement("div");
			pill.id = "dmtpill";
			pill.className = "pill";
			pill.innerHTML = "DM20";
			regionE.appendChild(pill);
		}
		if(flags.substring(14, 15) == "1") {
			// Pen20
			var pill = document.createElement("div");
			pill.id = "pentpill";
			pill.className = "pill";
			pill.innerHTML = "Pen20";
			regionE.appendChild(pill);
		}
		
		three.appendChild(regionE);
			
		three.appendChild(regionA);
		three.appendChild(regionB);
		three.appendChild(regionC);
		three.appendChild(regionD);

		document.getElementById("topfour").appendChild(three);
	}
	if(ldrbrd.length > 3) {
		var four = document.createElement('div');
		four.className = "lbrow f"+index;
		four.id = "four";
		four.style.zIndex = index--;
		four.onmouseover = function() {onHoverRowStyleChange(this)};
		four.onmouseout = function() {onReleaseRowStyleChange(this)};

		var regionA = document.createElement('div'),
			regionB = document.createElement('div'),
			regionC = document.createElement('div'),
			regionD = document.createElement('div'),
			regionE = document.createElement('div');
			
		regionA.innerHTML = "#4";
		regionA.className = "regionA";
		regionA.style.fontWeight = "1000";
		regionA.style.color = "#c29b76";
		
		regionB.innerHTML = ldrbrd[3][0];
		regionB.className = "regionB";
		
		regionC.innerHTML = ldrbrd[3][1];
		regionC.className = "regionC";
		
		regionD.innerHTML = ldrbrd[3][2];
		regionD.className = "regionD";

		regionE.className = "regionE";
	
		var flags = leadingZeros(ldrbrd[0][4].toString(2), 15);
		//console.log("fl", flags);

		if(flags.substring(12, 13) == "1") {
			// DMOG
			var pill = document.createElement("div");
			pill.id = "dmogpill";
			pill.className = "pill";
			pill.innerHTML = "DMOG";
			regionE.appendChild(pill);
		}
		if(flags.substring(13, 14) == "1") {
			// DM20
			var pill = document.createElement("div");
			pill.id = "dmtpill";
			pill.className = "pill";
			pill.innerHTML = "DM20";
			regionE.appendChild(pill);
		}
		if(flags.substring(14, 15) == "1") {
			// Pen20
			var pill = document.createElement("div");
			pill.id = "pentpill";
			pill.className = "pill";
			pill.innerHTML = "Pen20";
			regionE.appendChild(pill);
		}
		
		four.appendChild(regionE);
			
		four.appendChild(regionA);
		four.appendChild(regionB);
		four.appendChild(regionC);
		four.appendChild(regionD);

		document.getElementById("topfour").appendChild(four);
	}
}	

function appendGreys() {
	var numOfRows = ldrbrd.length;

	for(i = 0; index > 0; index--) {
		var grey = document.createElement('div');
		grey.id = 'odd';
		grey.className = "lbrow f"+index;
		grey.className += " greyRow";
		grey.style.zIndex = index;
		
		grey.style.backgroundColor = "#292929";
		grey.style.boxShadow = "0px 0.15vh 0.8vh 0px rgba(0,0,0,0.25)";
		grey.style.fontSize = grey.style.height+"px";
		
			var	regionA = document.createElement('div'),
				regionB = document.createElement('div'),
				regionC = document.createElement('div'),
				regionD = document.createElement('div'),
				regionE = document.createElement('div');
				
			regionA.innerHTML = "#"+(numOfRows-index +1);
			regionA.className = "regionA";
			
			regionB.innerHTML = ldrbrd[numOfRows - index][0];
			regionB.className = "regionB";
			
			regionC.innerHTML = ldrbrd[numOfRows - index][1];
			regionC.className = "regionC";
			
			regionD.innerHTML = ldrbrd[numOfRows - index][2];
			regionD.className = "regionD";

			regionE.className = "regionE";
	
			var flags = leadingZeros(ldrbrd[numOfRows - index][4].toString(2), 15);
			//console.log("fl", flags);

			if(flags.substring(12, 13) == "1") {
				// DMOG
				var pill = document.createElement("div");
				pill.id = "dmogpill";
				pill.className = "pill";
				pill.innerHTML = "DMOG";
				regionE.appendChild(pill);
			}
			if(flags.substring(13, 14) == "1") {
				// DM20
				var pill = document.createElement("div");
				pill.id = "dmtpill";
				pill.className = "pill";
				pill.innerHTML = "DM20";
				regionE.appendChild(pill);
			}
			if(flags.substring(14, 15) == "1") {
				// Pen20
				var pill = document.createElement("div");
				pill.id = "pentpill";
				pill.className = "pill";
				pill.innerHTML = "Pen20";
				regionE.appendChild(pill);
			}
			
			grey.appendChild(regionE);
				
			grey.appendChild(regionA);
			grey.appendChild(regionB);
			grey.appendChild(regionC);
			grey.appendChild(regionD);

		
		grey.onmouseover = function() {onHoverRowStyleChange(this)};
		grey.onmouseout = function() {onReleaseRowStyleChange(this)};
		
		
		document.getElementById("greys").appendChild(grey);
		//console.log("xx" +index);
	}
}


function onHoverRowStyleChange(x) {
	lastIndex = x.style.zIndex;
	x.style.zIndex = 2000000;

	var e = x.childNodes[0];
	e.style.opacity = "1";
	
	//console.log(x.id);
	return;
}

function onReleaseRowStyleChange(x) {
	x.style.zIndex = lastIndex;

	var e = x.childNodes[0];
	e.style.opacity = "0";

	return;
}

function leadingZeros(str, length) {
	for(var i = str.length; i<length; i++) str = "0"+str;
	return str;
}