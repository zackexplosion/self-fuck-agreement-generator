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

jQuery(document).ready(function($) {
	// focus input box
  $('#name').focus()

  // setup_canvas_size()

	stage = new createjs.Stage(canvas_id)
	// var circle = new createjs.Shape()
	// circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50)
	// circle.x = 100;
	// circle.y = 100;
	// stage.addChild(circle)
	

	var text = new createjs.Text("Hello World", "20px Arial", "#ff7700");
	text.x = 100;
	text.y = 100;
	text.textBaseline = "alphabetic";
	stage.addChild(text)
	update()
})


$(window).on('resize', function(){
	update()
})
          // <p>本人{$name}簽署這份文件，因為您認為高速/快速公路太危險，而且在不合法的情況下騎上去就沒有素質。</p>

          // <p>倘若將來，高速公路開放紅黃牌摩托車行駛，與快速道路開放白牌摩托車行駛，本人___同意絕對不在上敘道路上使用摩托車（如：紅黃牌行駛高速公路，白牌行駛快速公路），若違反的話，願意上傳一支自爆菊花影片到社群網站上，表示個人素質與爆菊花決心。</p>