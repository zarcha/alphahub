var renderer	= new THREE.WebGLRenderer({
    antialias	: true
});
/* Fullscreen */
renderer.setSize( window.innerWidth, window.innerHeight );
/* Append to HTML */
document.getElementById("bg").appendChild( renderer.domElement );
var onRenderFcts= [];
var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(25, window.innerWidth /    window.innerHeight, 0.01, 1000);
/* Play around with camera positioning */
camera.position.z = 15; 
camera.position.y = 2;
/* Fog provides depth to the landscape*/
scene.fog = new THREE.Fog(0xCCCCCC, 0, 45);
;(function(){
    var light	= new THREE.AmbientLight( 0x202020 )
    scene.add( light )
    var light	= new THREE.DirectionalLight('white', 5)
    light.position.set(0.5, 0.0, 2)
    scene.add( light )
    var light	= new THREE.DirectionalLight('white', 0.75*2)
    light.position.set(-50, -50, -200)
    scene.add( light )		
})()
var heightMap	= THREEx.Terrain.allocateHeightMap(256,256)
THREEx.Terrain.simplexHeightMap(heightMap)	
var geometry	= THREEx.Terrain.heightMapToPlaneGeometry(heightMap)
THREEx.Terrain.heightMapToVertexColor(heightMap, geometry)
/* Wireframe built-in color is white, no need to change that */
var material	= new THREE.MeshBasicMaterial({
    wireframe: true
});
var mesh	= new THREE.Mesh( geometry, material );
scene.add( mesh );
mesh.lookAt(new THREE.Vector3(0,1,0));
/* Play around with the scaling */
mesh.scale.y	= 40;
mesh.scale.x	= 40;
mesh.scale.z	= 2;
mesh.scale.multiplyScalar(10);
mesh.position.y = -7;
mesh.position.z = -50;
mesh.position.x = -50;
mesh.rotation.x += 0.2;
/* Play around with the camera */
onRenderFcts.push(function(delta, now){
    // console.log(mesh);
    mesh.rotation.z += -0.04 * delta;	
    mesh.position.z += 0.5 * delta;	
    mesh.position.y += -0.29 * delta;	
})
onRenderFcts.push(function(){
    renderer.render( scene, camera );		
})
var lastTimeMsec= null
requestAnimationFrame(function animate(nowMsec){
    requestAnimationFrame( animate );
    lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
    var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
    lastTimeMsec	= nowMsec
    onRenderFcts.forEach(function(onRenderFct){
        onRenderFct(deltaMsec/1000, nowMsec/1000)
    })
})