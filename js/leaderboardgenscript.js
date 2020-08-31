// === FIREBASE ===
var firebaseConfig = {
    apiKey: "AIzaSyDYGLh6DGth87_fSSUjISlPrYZcZsnSCxE",
    authDomain: "alpha-link-beta.firebaseapp.com",
    databaseURL: "https://alpha-link-beta.firebaseio.com",
    projectId: "alpha-link-beta",
    storageBucket: "alpha-link-beta.appspot.com",
    messagingSenderId: "568898366266",
    appId: "1:568898366266:web:3da44acc1e50265bc6be03"
};
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore(app);


// === PARSE ===

Parse.initialize("Tew1hHlIFyCFDgfbL37oSQkLymLjUKaKPpCs9oRp", "BoA8tvIZZtUzTFNjDvnGm34zKF6SpDJ6I3OByQkB"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";
var parseLeaderboard = new Parse.User();
const Leaderboard = Parse.Object.extend("leaderboard");

var emptyEntry = new Leaderboard();
emptyEntry.set("Name", "");
emptyEntry.set("Rank", "");
emptyEntry.set("Score", "");

var rows = [];

// === GENERAL ===
var count = 0;

function temp() {
	db.collection("Users").get().then(function(querySnapshot) {
		
		querySnapshot.forEach(function(doc) {
			var entry = [doc.id, getRank(doc), getScore(doc), getCommTypes(doc)];
			rows.push(entry);
		});
	});

	setTimeout(function() { 
		orderRows(); 
		console.log(rows[0]);
	}, 1000);
}

function grab() {
	db.collection("Users").get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			var entry = [doc.id, getRank(doc), getScore(doc), getCommTypes(doc)];
			rows.push(entry);
		});
	});

	setTimeout(function() { 
		orderRows(); 
		postRows();
	}, 1000);
}

function orderRows() {
	var swapped = true;

	while(swapped) {
		swapped = false;
		for(var i = 0; i<rows.length-1; i++) {
			if(rows[i][2] < rows[i+1][2] ) {
				swapped = true;
				console.log("s");
				var a = rows[i];
				rows[i]  = rows[i+1] ;
				rows[i+1] = a;
			}
		}
	}
}

function postRows() {
	for(var i = 0; i<rows.length; i++) {
		var entry = new Leaderboard();
			entry.set("Name", rows[i][0]);
			entry.set("Rank", rows[i][1]);
			entry.set("Score", ""+rows[i][2]);
			entry.set("Order", ""+i);
			entry.set("CommTypes", ""+rows[i][3]);

		entry.save();
	}

}

function clearLeaderboard() {
	var ldrbrd;
	const query = new Parse.Query(Leaderboard);

	query.find().then((results) => {
		ldrbrd = results;
		results.forEach((row) => {
			const queryt = new Parse.Query(Leaderboard);
			queryt.get(row.id).then((object) => {
					object.destroy();
			});
		  })

	}, (error) => {
	  console.error('Error while fetching ParseObjects', error);
	});
}


// === TAMER ===
function getScore(doc) {
	// Tamer Points
		var tamerWins = getTamerWins(doc), 
			tamerLoss = getTamerLoss(doc), 
			tamerDraw = getTamerDraw(doc);
		
		
		var winLossRatio = 0;
		if(tamerWins == 0 && tamerLoss > 0) winLossRatio = -0.05;
		else if(tamerWins > 0 && tamerLoss == 0) winLossRatio = 1;
		else if (tamerWins == 0 && tamerLoss == 0) winLossRatio = 0;
		else winLossRatio = tamerWins/(tamerWins+tamerLoss);
		
		var tamerPoints = (((tamerWins+tamerLoss) * winLossRatio)*3) +
							((tamerWins+tamerLoss+tamerDraw)/10);
			tamerPoints = tamerPoints<0 ? 0:tamerPoints;
		tamerPoints = Math.floor((tamerPoints/Math.sqrt(3))*10);	
		
		//console.log(doc.id, tamerPoints);
	
	
	// Partner Points
	var slots = [(isObjValid(doc.data().r1) ? doc.data().r1 : ""),
				(isObjValid(doc.data().r2) ? doc.data().r2 : ""),
				(isObjValid(doc.data().r3) ? doc.data().r3 : ""),
				(isObjValid(doc.data().r4) ? doc.data().r4 : ""),
				(isObjValid(doc.data().r5) ? doc.data().r5 : ""),
				(isObjValid(doc.data().r6) ? doc.data().r6 : "") ];
	
		/*
		points from mons (sum result for each mon, discredit locked mons)
		(((mon wins+draws) * mon win:loss ratio) / numberOfMons) + ageInDays/2
		*/
	
		var monPoints = 0, cntr = 0;
	
		for(var i = 0; i<6; i++){
			//if(isObjValid(slots[i])) console.log(i,slotAge(slots[i]));
			if(isSlotValid(slots[i])){
				var wins = getSlotWins(slots[i]),
					loss = getSlotLoss(slots[i]),
					draw = getSlotDraw(slots[i]),
					winLossRatio = 0;
	
				if(wins == 0 && loss > 0) winLossRatio = -0.05;
				else if(wins > 0 && loss == 0) winLossRatio = 1;
				else if (wins == 0 && loss == 0) winLossRatio = 0;
				else winLossRatio = (wins/(wins+loss));
	
				var slotPoints = ((wins+draw) * winLossRatio) + (slotAge(slots[i]));
				monPoints += slotPoints;
				cntr++;
			}
		}
	
		if(cntr != 0) {
			monPoints /= cntr;
			monPoints = Math.floor((monPoints/(Math.sqrt(3)))*3);	
		}
		//console.log(monPoints);
	
		return tamerPoints + monPoints;
		
}

function getRank(doc) {
	var	win = getTamerWins(doc),
		los = getTamerLoss(doc),
		drw = getTamerDraw(doc);

	if(((win+los+drw) >= 1000.0) && ((win / (win+los) >= 0.75))) {
		return "S"; // 1000 battles, 75% win ratio
	}

	else if(((win+los+drw) >= 500.0) && ((win / (win+los) >= 0.7))) {
		return "A"; // 500 battles, 70% win ratio
	}

	else if(((win+los+drw) >= 100.0) && ((win / (win+los) >= 0.6))) {
		return "B"; // 200 battles, 60% win ratio
	}

	else if(((win+los+drw) >= 20.0) && ((win / (win+los) >= 0.5))) {
		return "C"; // 75 battles, 50% win ratio
	}

	else if(((win+los+drw) >= 5.0) && ((win / (win+los) >= 0.4))) {
		return "D"; // 10 battles, 40% win ratio
	}

	else return "E";
}

function getPartnerMon(doc){
	var slot = getpartner(doc);

	switch(getCommType(slot)) {
		case 1: 
			break;
		case 3:
			break;
		case 7:
			break;
	}
}

function getPartner(doc) {
	var slots = [(isObjValid(doc.data().r1) ? doc.data().r1 : ""),
				(isObjValid(doc.data().r2) ? doc.data().r2 : ""),
				(isObjValid(doc.data().r3) ? doc.data().r3 : ""),
				(isObjValid(doc.data().r4) ? doc.data().r4 : ""),
				(isObjValid(doc.data().r5) ? doc.data().r5 : ""),
				(isObjValid(doc.data().r6) ? doc.data().r6 : "") ];

	console.log(doc.id);
	var maxInd = 0;

	for(var i = 0; i<6; i++) {
		if(isObjValid(slots[i])) {
			maxInd = (getSlotEncounters(slots[i]) > slots[maxInd]) ? i:maxInd;
		}
	}

	return slots[maxInd];
}

function getTamerWins(doc) {
	return (isObjValid(doc.data().win)) ? parseInt(doc.data().win, 36) : 0;
}
function getTamerLoss(doc) {
	return (isObjValid(doc.data().los)) ? parseInt(doc.data().los, 36) : 0;

}
function getTamerDraw(doc) {
	return (isObjValid(doc.data().drw)) ? parseInt(doc.data().drw, 36) : 0;	
}

function getCommTypes(doc) {
	var cts = "000000000000000";
	var rec = "";
	var slots = [doc.data().r1,
		doc.data().r2,
		doc.data().r3,
		doc.data().r4,
		doc.data().r5,
		doc.data().r6];

	
	slots.forEach(function(slot) {
		if(slot != ("") && typeof slot !== "undefined") {
			switch(getCommType(slot)) {
				case 1:
					cts = cts.substring(0, 14) + "1";
					break;
				case 3:
					cts = cts.substring(0, 13) + "1" + cts.substring(14);
					break;
				case 7:
					cts = cts.substring(0,12) + "1" + cts.substring(13);
					break;
				default: break;
			}
		}
	});

	return  parseInt(cts, 2).toString(32);
}


// == SLOTS ==
function isSlotValid(slot) {
	if(!isObjValid(slot)) return false;
	
	var date = slot.substring(81, 89);
	var newDate = "20" + date.substring(6, 8) + "-" + date.substring(4,6) + "-" + date.substring(2,4) + 
					"T"+date.substring(0,2)+":00:00";

	var slotDate = Date.parse(newDate),
		dateNow = new Date().getTime();

	var diff = Math.floor(((dateNow - slotDate)/1000) / (3600));

	//console.log(diff);

	return (diff < 72);
}

function slotAge(slot) {
	var birthString = slot.substring(73, 81);
	var birthDateString = "20" + birthString.substring(6, 8) + "-" + birthString.substring(4,6) + "-" + birthString.substring(2,4) + 
					"T"+birthString.substring(0,2)+":00:00";

	var birthDate = Date.parse(birthDateString),
		dateNow = new Date().getTime();

	return Math.floor((((dateNow - birthDate)/1000) / (3600))/24);
}


function getCommType(slot) {
	var ct = slot.substring(109, 111);
	return parseInt(ct, 36);
}

function getSlotEncounters(slot) {
	return 	getSlotWins(slot) +
			getSlotLoss(slot) +
			getSlotDraw(slot);
}
function getSlotWins(slot) {
	return parseInt(slot.substring(103, 105), 36);
}
function getSlotLoss(slot) {
	return parseInt(slot.substring(105, 107), 36);
}
function getSlotDraw(slot) {
	return parseInt(slot.substring(107, 109), 36);
}

// === RomManager ===


// === EXTRA ===
function isObjValid(check) {
	if(check == null || check == 'undefined' || check == "") return false;
	else return true;
}

function leadingZeros(str, length) {
	for(var i = str.length; i<length; i++) str = "0"+str;
	return str;
}