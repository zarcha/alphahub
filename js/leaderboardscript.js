var numOfRows;
var usersJSONText = '{"users":[' +
'{"name":"Katsu","rank":"B", "wins":"10", "loss":"10", "draw":"10" },' +
'{"name":"RayJT","rank":"A", "wins":"10", "loss":"10", "draw":"10" },' +
'{"name":"Fatred","rank":"A", "wins":"10", "loss":"10", "draw":"10" },' +
'{"name":"Zarch","rank":"A", "wins":"10", "loss":"10", "draw":"10" },' +
'{"name":"KaseyJoes","rank":"B", "wins":"10", "loss":"10", "draw":"10" },' +
'{"name":"Airdramon","rank":"A", "wins":"10", "loss":"10", "draw":"10" },' +

'{"name":"Xanthos","rank":"B", "wins":"10", "loss":"10", "draw":"10" }]}';

obj = JSON.parse(usersJSONText);
numOfRows = obj.users.length;
var arrayAll = obj.users;

scoreEveryone(obj.users);
populateFirstFour(obj.users);

var one = document.getElementById("one"),
	two = document.getElementById("two"),
	three = document.getElementById("three"),
	four = document.getElementById("four");

var index = numOfRows;
	one.style.zIndex = index--;
	two.style.zIndex = index--;
	three.style.zIndex = index--;
	four.style.zIndex = index--;
	
var lastIndex;
	
for(i = 0; index > 0; index--) {
	var grey = document.createElement('div');
	grey.id = 'odd';
	grey.className = "lbrow";
	grey.className += " greyRow";
	grey.style.zIndex = index;
	
	grey.style.backgroundColor = "#292929";
	grey.style.boxShadow = "0px 0.15vh 0.8vh 0px rgba(0,0,0,0.25)";
	grey.style.fontSize = grey.style.height+"px";
	
		var	regionA = document.createElement('div'),
			regionB = document.createElement('div'),
			regionC = document.createElement('div'),
			regionD = document.createElement('div');
			
		regionA.innerHTML = "#"+(numOfRows-index +1);
		regionA.className = "regionA";
		
		regionB.innerHTML = arrayAll[numOfRows - index].name;
		regionB.className = "regionB";
		
		regionC.innerHTML = arrayAll[numOfRows - index].rank;
		regionC.className = "regionC";
		
		regionD.innerHTML = 700;
		regionD.className = "regionD";
			
		grey.appendChild(regionA);
		grey.appendChild(regionB);
		grey.appendChild(regionC);
		grey.appendChild(regionD);

	
	grey.onmouseover = function() {onHoverRowStyleChange(this)};
	grey.onmouseout = function() {onReleaseRowStyleChange(this)};
	
	
	document.getElementById("greys").appendChild(grey);
	console.log("xx" +index);
}
	

function populateFirstFour(arrayEveryone) {
	if(arrayEveryone.length > 0) {
		var rowOne = document.getElementById("one"),
			regionA = document.createElement('div'),
			regionB = document.createElement('div'),
			regionC = document.createElement('div'),
			regionD = document.createElement('div');
			
		regionA.innerHTML = "#1";
		regionA.className = "regionA";
		
		regionB.innerHTML = arrayEveryone[0].name;
		regionB.className = "regionB";
		
		regionC.innerHTML = arrayEveryone[0].rank;
		regionC.className = "regionC";
		
		regionD.innerHTML = 1234;
		regionD.className = "regionD";
			
		rowOne.appendChild(regionA);
		rowOne.appendChild(regionB);
		rowOne.appendChild(regionC);
		rowOne.appendChild(regionD);
		
	}
	if(arrayEveryone.length > 1) {
		var rowTwo = document.getElementById("two"),
			regionA = document.createElement('div'),
			regionB = document.createElement('div'),
			regionC = document.createElement('div'),
			regionD = document.createElement('div');
			
		regionA.innerHTML = "#2";
		regionA.className = "regionA";
		
		regionB.innerHTML = arrayEveryone[1].name;
		regionB.className = "regionB";
		
		regionC.innerHTML = arrayEveryone[1].rank;
		regionC.className = "regionC";
		
		regionD.innerHTML = 999;
		regionD.className = "regionD";
			
		rowTwo.appendChild(regionA);
		rowTwo.appendChild(regionB);
		rowTwo.appendChild(regionC);
		rowTwo.appendChild(regionD);
	}
	if(arrayEveryone.length > 2) {
		var rowThree = document.getElementById("three"),
			regionA = document.createElement('div'),
			regionB = document.createElement('div'),
			regionC = document.createElement('div'),
			regionD = document.createElement('div');
			
		regionA.innerHTML = "#3";
		regionA.className = "regionA";
		
		regionB.innerHTML = arrayEveryone[2].name;
		regionB.className = "regionB";
		
		regionC.innerHTML = arrayEveryone[2].rank;
		regionC.className = "regionC";
		
		regionD.innerHTML = 800;
		regionD.className = "regionD";
			
		rowThree.appendChild(regionA);
		rowThree.appendChild(regionB);
		rowThree.appendChild(regionC);
		rowThree.appendChild(regionD);
	}
	if(arrayEveryone.length > 3) {
		var rowFour = document.getElementById("four"),
			regionA = document.createElement('div'),
			regionB = document.createElement('div'),
			regionC = document.createElement('div'),
			regionD = document.createElement('div');
			
		regionA.innerHTML = "#4";
		regionA.className = "regionA";
		
		regionB.innerHTML = arrayEveryone[3].name;
		regionB.className = "regionB";
		
		regionC.innerHTML = arrayEveryone[3].rank;
		regionC.className = "regionC";
		
		regionD.innerHTML = 700;
		regionD.className = "regionD";
			
		rowFour.appendChild(regionA);
		rowFour.appendChild(regionB);
		rowFour.appendChild(regionC);
		rowFour.appendChild(regionD);
	}
}	
	
	
function scoreEveryone(arrayEveryone) {

	
}	

function onHoverRowStyleChange(x) {
	lastIndex = x.style.zIndex;
	x.style.zIndex = 2000000;
	
	console.log(x.id);
	return;
}

function onReleaseRowStyleChange(x) {
	x.style.zIndex = lastIndex;
	return;
}