let startX = null;
let startY = null;
let endX = null;
let endY = null;
let onClick = false;//鼠标是否按下
let drawOrClean = 'draw';
let lineWidth = 10
let canvas = document.getElementById('canvas');
let btn = document.getElementById('btn');
let eraser = document.getElementById('eraser');
let remove = document.getElementById('remove');
let ctx = canvas.getContext('2d');
let color = document.getElementsByClassName('color');
let download = document.getElementById('download');
let line = document.getElementsByClassName('line');

getClient();
window.onresize = function() {
	getClient()
}
// 画笔粗细切换
for(let i = 0; i < line.length; i++) {
	line[i].onclick = function() {
		for(let j = 0; j < line.length; j++)  {
			line[j].className = 'line';
		}
		line[i].className = 'line active';
		if(i === 0) {
			lineWidth = 10;
		}else{
			lineWidth = 5
		}
	}
}
// 画笔颜色切换
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
// 点击事件
function clickEvent(e, pageX, pageY) {
	onClick = true;
	if(onClick === true){
		ctx.beginPath();
		startX = pageX;
		startY = pageY;
		ctx.moveTo(startX, startY);
	}
}
// 滑动事件
function slide(e, pageX, pageY) {
	ctx.lineWidth = lineWidth;
	if(onClick && drawOrClean === 'draw'){
		endX = pageX;
		endY = pageY;
		ctx.lineTo(endX, endY);
		ctx.stroke();
		startX = endX;
		startY = endY;
	}else if(onClick && drawOrClean === 'clean'){
		ctx.clearRect(e.pageX-5, e.pageY-5, 10, 10)
	}	
}
// 鼠标移开事件
function withdraw() {
	onClick = false;
}
if(document.body.ontouchstart === undefined) {
	canvas.onmousedown = function(e) {
		console.log(e,'eeeee')
		clickEvent(e, e.pageX, e.pageY)
	}
	canvas.onmousemove = function(e) {
		slide(e, e.pageX, e.pageY);
	}
	canvas.onmouseup = function(e) {
		withdraw(e);
	}
}else {
	canvas.ontouchstart = function(e) {
		console.log(e,'eeeee')
		clickEvent(e, e.touches[0].pageX, e.touches[0].pageY)
	}
	canvas.ontouchmove = function(e) {
		slide(e, e.touches[0].pageX, e.touches[0].pageY);
	}
	canvas.ontouchend = function(e) {
		withdraw(e);
	}
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