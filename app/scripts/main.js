/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||function(e){"use strict";if(typeof e==="undefined"||typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),o="download"in r,i=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},a=/constructor/i.test(e.HTMLElement),f=/CriOS\/[\d]+/.test(navigator.userAgent),u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},d="application/octet-stream",s=1e3*40,c=function(e){var t=function(){if(typeof e==="string"){n().revokeObjectURL(e)}else{e.remove()}};setTimeout(t,s)},l=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var o=e["on"+t[r]];if(typeof o==="function"){try{o.call(e,n||e)}catch(i){u(i)}}}},p=function(e){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)){return new Blob([String.fromCharCode(65279),e],{type:e.type})}return e},v=function(t,u,s){if(!s){t=p(t)}var v=this,w=t.type,m=w===d,y,h=function(){l(v,"writestart progress write writeend".split(" "))},S=function(){if((f||m&&a)&&e.FileReader){var r=new FileReader;r.onloadend=function(){var t=f?r.result:r.result.replace(/^data:[^;]*;/,"data:attachment/file;");var n=e.open(t,"_blank");if(!n)e.location.href=t;t=undefined;v.readyState=v.DONE;h()};r.readAsDataURL(t);v.readyState=v.INIT;return}if(!y){y=n().createObjectURL(t)}if(m){e.location.href=y}else{var o=e.open(y,"_blank");if(!o){e.location.href=y}}v.readyState=v.DONE;h();c(y)};v.readyState=v.INIT;if(o){y=n().createObjectURL(t);setTimeout(function(){r.href=y;r.download=u;i(r);h();c(y);v.readyState=v.DONE});return}S()},w=v.prototype,m=function(e,t,n){return new v(e,t||e.name||"download",n)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(e,t,n){t=t||e.name||"download";if(!n){e=p(e)}return navigator.msSaveOrOpenBlob(e,t)}}w.abort=function(){};w.readyState=w.INIT=0;w.WRITING=1;w.DONE=2;w.error=w.onwritestart=w.onprogress=w.onwrite=w.onabort=w.onerror=w.onwriteend=null;return m}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if(typeof define!=="undefined"&&define!==null&&define.amd!==null){define([],function(){return saveAs})}

var canvas_id = 'text-canvas'
var export_image_id = 'export-image'
var stage

function update(argument) {
	stage.update()
	var canvas = $('#' + canvas_id)
	var data = canvas[0].toDataURL()
	var img = $('#' + export_image_id)
	img.attr('src', data)
}

function wraping_text(options){
	var wording = options.wording
	var current_cut = options.current_cut || 1
	var c_cut_start = options.c_cut_start || 0
	var row = options.row || 0
	var c_wording = options.c_wording || wording
	var paragraph = options.paragraph || 0
	var font_size = 36
	var canvas_width = 800
	var text = new createjs.Text(c_wording, font_size + "px Arial");
	text.lineWidth = canvas_width


	var w = text.getMeasuredWidth()
	// console.log(w)

	if(w >= canvas_width){
		// console.log('too long')
		c_wording = wording.substr(c_cut_start, wording.length - current_cut)
		// debugger
		return wraping_text({
			wording: wording,
			c_wording: c_wording,
			c_cut_start: c_cut_start,
			current_cut: current_cut + 1,
			row: row,
			paragraph: paragraph
		})
	}else{

		var y = row * font_size * 1.3
		if(paragraph > 0){
			// debugger
			y = y + (paragraph * font_size * 3)
		}
		// console.log('y', y)
		text.y = y
		stage.addChild(text)
		var next_cut_start = wording.indexOf(c_wording) + c_wording.length
		// console.log('next_cut_start', next_cut_start)
		// console.log('wording.length', wording.length)
		if(next_cut_start !== wording.length){
			return wraping_text({
				wording: wording,
				c_wording: false,
				c_cut_start: next_cut_start,
				current_cut: false,
				row: row + 1,
				paragraph: paragraph
			})
		}

		return row
	}

	// stage.addChild(text)
}

function on_text_change(name){
	var name = name || '高速公路好可怕'
	var d = new Date()
	var now = `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`
	// debugger
	var wording = `
本人${name}願意簽署這份文件，因為高速公路及快速公路實在太危險，不適合現階段(${now})沒有路權的二輪車輛行駛。並且認為在不合法的情況下，騎乘上去非常沒有素質。
倘若將來，高速公路開放紅黃牌摩托車行駛，與快速道路開放白牌摩托車行駛，本人${name}同意絕對不在上敘道路上使用摩托車（如：紅黃牌行駛高速公路，白牌行駛快速公路），若違反的話，願意上傳一支自爆菊花影片到社群網站上，表示個人素質與爆菊花決心。
`
	wording = wording.trim().split('\n')


	stage.removeAllChildren();
	var d1 = new Date().getTime()
	console.time('wraping_text');

	var row = 0
	for (var i = 0; i < wording.length; i++) {
		row = wraping_text({
			wording: wording[i],
			row: row,
			paragraph: i
		})
		// debugger
	}

	console.timeEnd('wraping_text');

	update()
}

jQuery(document).ready(function($) {
	// focus input box
  $('#name').focus()

  $('.download').on('click', function(e){
	  e.preventDefault()
		var canvas = document.getElementById(canvas_id),
				ctx = canvas.getContext("2d")

		canvas.toBlob(function(blob) {
			saveAs(blob, "pretty image.png");
		})
		// window.open(img.src)
  })

  $('#name').on('keyup', function(e){
  	var name = $(this).val()
  	on_text_change(name)
  })

	stage = new createjs.Stage(canvas_id)
	on_text_change()

})


$(window).on('resize', function(){
	update()
})
