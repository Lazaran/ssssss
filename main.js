// import * as THREE from 'three';

const faceRes = 3200

// Canvas and Renderer
const scene = new THREE.Scene();
const canv = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer( { canvas: canv, alpha:true, antialias:true, preserveDrawingBuffer:true} );
renderer.setSize( faceRes, faceRes, false);
// scene.background = new THREE.Color(0xffffff);

// Camera
// const percamera = new THREE.PerspectiveCamera( 75, canv.clientWidth / canv.clientHeight, 0.1, 1000 );
const camScale = 700;
const ortcamera = new THREE.OrthographicCamera( canv.clientWidth / - camScale, canv.clientWidth / camScale, canv.clientHeight / camScale, canv.clientHeight / - camScale, 1, 1000 );
// renderer.setViewport(100,0,100,200)


function letters(canvas,ctx,text){
    canvas.width = faceRes; canvas.height = faceRes;
    ctx.lineWidth = faceRes/10;
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0,0,canvas.width, canvas.height);
    ctx.font = String(faceRes) + "px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(text.toUpperCase(), canvas.width/2, (canvas.height/2)*1.7);
}

// Dice Face Creation and Updating; Front, Side, Top
const fCanvas = document.createElement('canvas')
const fctx = fCanvas.getContext('2d');
const fTexture = new THREE.CanvasTexture(fCanvas);
const fMat = new THREE.MeshBasicMaterial({ map: fTexture });
fTexture.minFilter = THREE.LinearFilter;

const sCanvas = document.createElement('canvas')
const sctx = sCanvas.getContext('2d');
const sTexture = new THREE.CanvasTexture(sCanvas);
const sMat = new THREE.MeshBasicMaterial({ map: sTexture });
sTexture.minFilter = THREE.LinearFilter;

const tCanvas = document.createElement('canvas')
const tctx = tCanvas.getContext('2d');
const tTexture = new THREE.CanvasTexture(tCanvas);
const tMat = new THREE.MeshBasicMaterial({ map: tTexture });
tTexture.minFilter = THREE.LinearFilter;

// Set dice faces to placeholder value
letters(fCanvas,fctx,document.getElementById('frontface').getAttribute("placeholder"))
letters(sCanvas,sctx,document.getElementById('sideface').getAttribute("placeholder"))
letters(tCanvas,tctx,document.getElementById('topface').getAttribute("placeholder"))

// 3D Application of Canvas
const geo = new THREE.BoxGeometry(1, 1, 1);
const mesh = new THREE.Mesh( geo, [sMat,sMat,tMat,tMat,fMat,fMat]);
scene.add(mesh);

// Camera Positioning
ortcamera.lookAt(mesh.position)
ortcamera.position.z = 10;


// Animate Rotation
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, ortcamera );
}
animate();


//Input Even Handlers
// Face Inputs
//  Front Face
document.querySelector('#frontface').addEventListener('input', frontUpdate);
function frontUpdate(e){
    if (e.target.value == ""){
        letters(fCanvas,fctx,document.getElementById('frontface').getAttribute("placeholder"))
    }
    else {
        letters(fCanvas,fctx,e.target.value);
    }
    fTexture.needsUpdate = true;
};

//  Side Face
document.querySelector('#sideface').addEventListener('input', sideUpdate);
function sideUpdate(e){
    if (e.target.value == ""){
        letters(sCanvas,sctx,document.getElementById('sideface').getAttribute("placeholder"))
    }
    else {
        letters(sCanvas,sctx,e.target.value);
    }
    sTexture.needsUpdate = true;
};

//  Top Face
document.querySelector('#topface').addEventListener('input', topUpdate);
function topUpdate(e){
    if (e.target.value == ""){
        letters(tCanvas,tctx,document.getElementById('topface').getAttribute("placeholder"))
    }
    else {
        letters(tCanvas,tctx,e.target.value);
    }
    tTexture.needsUpdate = true;
};


// Rotation Input
//  X Rotation
document.querySelector('#xRotInput').addEventListener('input', xRotation);
document.querySelector('#xRotRange').addEventListener('input', xRotation);
function xRotation(e){
    mesh.rotation.x = e.target.value*(Math.PI/180)
};

//  Y Rotation
document.querySelector('#yRotInput').addEventListener('input', yRotation);
document.querySelector('#yRotRange').addEventListener('input', yRotation);
function yRotation(e){
    mesh.rotation.y = e.target.value*(Math.PI/180)
};

//  Z Rotation
document.querySelector('#zRotInput').addEventListener('input', zRotation);
document.querySelector('#zRotRange').addEventListener('input', zRotation);
function zRotation(e){
    mesh.rotation.z = e.target.value*(Math.PI/180)
};


//End of Input Event Handlers

document.getElementById('downloadimg').addEventListener('click', saveImg);

function saveImg(e){
    renderer.render( scene, ortcamera );
    let canvasUrl = canv.toDataURL();
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = checkFilename();
    createEl.click();
    createEl.remove();
}

function checkFilename(){
    if (document.getElementById('filename').value == ""){
        return document.getElementById('filename').getAttribute("placeholder")
    }
    else {
        return document.getElementById('filename').value
    }
}