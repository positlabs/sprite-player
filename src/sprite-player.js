
const componentName = 'sprite-player'

const lifecycle = {
	created(){
		this.paused = true
		this._frame = 0
		this._prevTime = Date.now()
		this._img = document.createElement('img')
		this._render()
	},
	inserted(){
		if(this.autoplay) this.play()
	},
	removed(){
		this.paused = true
	}
}

const accessors = {
	src: {
		attribute: {},
		get(){return this._src},
		set(val){
			this._src = val
			this._img = document.createElement('img')
			this._img.src = val
			this._img.onload = () => {this._resize()}
		}
	},
	frames: {
		attribute: {},
		get(){
			return this._frames !== undefined ? this._frames : this.rows * this.cols
		},
		set(val){
			this._frames = parseInt(val)
		}
	},
	rows: {
		attribute: {},
		get(){return this._rows},
		set(val){this._rows = parseInt(val)}
	},
	cols: {
		attribute: {},
		get(){return this._cols},
		set(val){this._cols = parseInt(val)}
	},
	fps: {
		attribute: {
			def: 30
		},
		get(){return this._fps},
		set(val){
			this._fps = parseInt(val)
			this._fpsMillis = 1000 / this._fps
		}
	},
	autoplay: { attribute: { boolean: true } },
	loop: { attribute: { boolean: true } },
	paused: { attribute: { boolean: true } }
	
}

const methods = {
	play(){
		this.paused = false
		this._onFrame()
	},

	_render (){
		xtag.innerHTML(this, `
			<canvas></canvas>
		`)
		this._canvas = this.querySelector('canvas')
		this._context = this._canvas.getContext('2d')
	},

	_resize(){
		this._canvas.width = this._img.width / this.cols
		this._canvas.height = this._img.height / this.rows
	},

	_onFrame(){
		if(this._paused) { return }
		requestAnimationFrame(this._onFrame.bind(this))

		// fps throttling
		var time = Date.now()
		if(time - this._prevTime < this._fpsMillis){ return }

		this._draw()
		this._frame = (this._frame + 1) % this.frames
		this._prevTime = time

		if(this._frame === 0 && !this.loop){
			this._paused = true
		}

	},

	_draw(){
		this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
		var x = (this._frame % this._cols) * this._canvas.width
		var y = Math.floor(this._frame / this._cols) * this._canvas.height
		this._context.drawImage(this._img, x, y, this._canvas.width, this._canvas.height, 0, 0, this._canvas.width, this._canvas.height)
	}
}

module.exports = xtag.register(componentName, {
	lifecycle, accessors, methods
})

