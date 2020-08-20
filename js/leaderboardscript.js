var numOfRows;
var usersJSONText = '{"users":[' +
'{"name":"Katsu","rank":"B" },' +
'{"name":"RayJT","rank":"A" },' +
'{"name":"Fatred","rank":"A" },' +
'{"name":"Zarch","rank":"A" },' +
'{"name":"KaseyJoes","rank":"B" },' +

'{"name":"KaseyJoes","rank":"B" },' +
'{"name":"KaseyJoes","rank":"B" },' +
'{"name":"KaseyJoes","rank":"B" },' +
'{"name":"KaseyJoes","rank":"B" },' +
'{"name":"KaseyJoes","rank":"B" },' +
'{"name":"KaseyJoes","rank":"B" },' +
'{"name":"KaseyJoes","rank":"B" },' +
'{"name":"KaseyJoes","rank":"B" },' +

'{"name":"Xanthos","rank":"B" }]}';

obj = JSON.parse(usersJSONText);
numOfRows = obj.users.length;

var one = document.getElementById("one"),
	two = document.getElementById("two"),
	three = document.getElementById("three"),
	four = document.getElementById("four");

var index = numOfRows;
	one.style.zIndex = index--;
	two.style.zIndex = index--;
	three.style.zIndex = index--;
	four.style.zIndex = index--;
	
for(i = 0; index > 0; index--) {
	var grey = document.createElement('div');
	grey.id = 'odd';
	grey.className = "lbrow";
	grey.style.zIndex = index;
	grey.style.background = "linear-gradient(0deg, rgba(40,40,40,1) 0%, rgba(45,45,45,1) 100%)";

	document.getElementById("greys").appendChild(grey);
	console.log("xx" +index);
}
	