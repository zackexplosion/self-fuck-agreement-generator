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
	// debugger
	// text.x = 0
	// text.y = 0
	// text.textBaseline = "alphabetic";
	// stage.addChild(text)

	update()
}

jQuery(document).ready(function($) {
	// focus input box
  $('#name').focus()

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
          // <p>本人{$name}簽署這份文件，因為您認為高速/快速公路太危險，而且在不合法的情況下騎上去就沒有素質。</p>

          // <p>倘若將來，高速公路開放紅黃牌摩托車行駛，與快速道路開放白牌摩托車行駛，本人___同意絕對不在上敘道路上使用摩托車（如：紅黃牌行駛高速公路，白牌行駛快速公路），若違反的話，願意上傳一支自爆菊花影片到社群網站上，表示個人素質與爆菊花決心。</p>