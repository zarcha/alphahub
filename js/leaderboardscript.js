var numOfRows;
var usersJSONText = '{"users":[' +
'{"name":"Katsu","rank":"B", "wins":"10", "loss":"10", "draw":"10" },' +
'{"name":"RayJT","rank":"A", "wins":"10", "loss":"10", "draw":"10" },' +
'{"name":"Fatred","rank":"A", "wins":"10", "loss":"10", "draw":"10" },' +
'{"name":"Zarch","rank":"A", "wins":"10", "loss":"10", "draw":"10" },' +
'{"name":"KaseyJoes","rank":"B", "wins":"10", "loss":"10", "draw":"10" },' +

'{"name":"KaseyJoes","rank":"B", "wins":"10", "loss":"10", "draw":"10" },' +
'{"name":"KaseyJoes","rank":"B", "wins":"10", "loss":"10", "draw":"10" },' +
'{"name":"KaseyJoes","rank":"B", "wins":"10", "loss":"10", "draw":"10" },' +
'{"name":"KaseyJoes","rank":"B", "wins":"10", "loss":"10", "draw":"10" },' +
'{"name":"KaseyJoes","rank":"B", "wins":"10", "loss":"10", "draw":"10" },' +
'{"name":"KaseyJoes","rank":"B", "wins":"10", "loss":"10", "draw":"10" },' +

'{"name":"Xanthos","rank":"B", "wins":"10", "loss":"10", "draw":"10" }]}';

obj = JSON.parse(usersJSONText);
numOfRows = obj.users.length;

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
	
	//grey.style.background = "linear-gradient(356deg, rgba(39,39,39,1) 40%, rgba(40,40,40,1) 50%)";
	grey.style.backgroundColor = "#292929";
	grey.style.boxShadow = "0px 0.15vh 0.8vh 0px rgba(0,0,0,0.25)";
	grey.innerHTML = "<br><br>wow";
	
	grey.onmouseover = function() {onHoverRowStyleChange(this)};
	grey.onmouseout = function() {onReleaseRowStyleChange(this)};
	
	
	document.getElementById("greys").appendChild(grey);
	console.log("xx" +index);
}
	

function populateFirstFour(arrayEveryone) {
	if(arrayEveryone.length > 0) {
		var rowOne = document.getElementById("one");
		
	}
	if(arrayEveryone.length > 1) {
		var rowTwo = document.getElementById("two");
	}
	if(arrayEveryone.length > 2) {
		var rowThree = document.getElementById("three");
	}
	if(arrayEveryone.length > 3) {
		var rowFour = document.getElementById("four");
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