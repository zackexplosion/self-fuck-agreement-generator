var canvas_id = 'text-canvas'
var stage
function setup_canvas_size(){
	var canvas = $('#' + canvas_id)
	var parent = canvas.parent()
	var width = parent.outerWidth()
	canvas.attr({
		width: width,
		height: width * 1.5
	})
}

jQuery(document).ready(function($) {
	// focus input box
  $('#name').focus()
  setup_canvas_size()
	stage = new createjs.Stage(canvas_id)
	var circle = new createjs.Shape()
	circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50)
	circle.x = 100;
	circle.y = 100;
	stage.addChild(circle)
	stage.update()
})


$(window).on('resize', function(){
	setup_canvas_size()
	stage.update()
})
          // <p>本人{$name}簽署這份文件，因為您認為高速/快速公路太危險，而且在不合法的情況下騎上去就沒有素質。</p>

          // <p>倘若將來，高速公路開放紅黃牌摩托車行駛，與快速道路開放白牌摩托車行駛，本人___同意絕對不在上敘道路上使用摩托車（如：紅黃牌行駛高速公路，白牌行駛快速公路），若違反的話，願意上傳一支自爆菊花影片到社群網站上，表示個人素質與爆菊花決心。</p>