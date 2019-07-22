let startX = null;
let startY = null;
let endX = null;
let endY = null;
let onClick = false;//鼠标是否按下
let drawOrClean = 'draw';

let canvas = document.getElementById('canvas');
let btn = document.getElementById('btn');
let eraser = document.getElementById('eraser');
let remove = document.getElementById('remove');
let ctx = canvas.getContext('2d');
let color = document.getElementsByClassName('color');
let download = document.getElementById('download')
getClient();
window.onresize = function() {
	getClient()
}

for(let i = 0; i < color.length; i++) {
	color[i].onclick = function() {
		for(let j = 0; j < color.length; j++) {
			color[j].className = 'color'
		}
		color[i].className = 'active color'
		ctx.strokeStyle  = color[i].id;
	}
}
//得到当前设备的宽和gao
function getClient() {
	let pageWidth = document.documentElement.clientWidth;
	let pageHeight = document.documentElement.clientHeight;
	canvas.width = pageWidth;
	canvas.height = pageHeight;
}
canvas.onmousedown = function(e) {
	onClick = true;
	if(onClick === true){
		ctx.beginPath();
		startX = e.pageX;
		startY = e.pageY;
		ctx.moveTo(startX, startY);
	}
}

canvas.onmousemove = function(e) {
	if(onClick && drawOrClean === 'draw'){
		endX = e.pageX;
		endY = e.pageY;
		ctx.lineTo(endX, endY);
		ctx.stroke();
		startX = endX;
		startY = endY;
	}else if(onClick && drawOrClean === 'clean'){
		ctx.clearRect(e.pageX-5, e.pageY-5, 10, 10)
	}	
}
canvas.onmouseup = function(e) {
	onClick = false;
}

btn.onclick = function() {
	drawOrClean = 'draw';
	btn.classList.add('active')
	eraser.classList.remove('active')
}
eraser.onclick = function() {
	drawOrClean = 'clean';
	eraser.classList.add('active')
	btn.classList.remove('active')
}
remove.onclick = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}
download.onclick = function(){
	let dataURL = canvas.toDataURL();
	console.log(dataURL, 'dataURL');
	// window.open(dataURL);
	let a = document.createElement('a');
	document.body.appendChild(a);
	a.href = dataURL;
	a.download = '我的画儿'
	a.target = '_blank'
	a.click()
}