/*

	https://github.com/positlabs/sprite-player

*/

const componentName = 'sprite-player'

const lifecycle = {
	created(){
		this._paused = true
		this._frame = 0
		this._prevTime = Date.now()
		this._img = document.createElement('img')
		this._render()
	},
	removed(){
		this._paused = true
	}
}

const accessors = {

	/*
		attributes
	*/
	
	src: {
		attribute: {},
		get(){return this._src},
		set(val){
			this._src = val
			this._img = document.createElement('img')
			xtag.fireEvent(this, 'loadstart')
			this._img.onload = () => {
				xtag.fireEvent(this, 'load')
				this._resize()
				if(this.autoplay) this.play()
			}
			this._img.onerror = () => {
				xtag.fireEvent(this, 'error', {message: 'failed to load ' + this._src})
				this._paused = true
			}
			this._img.src = val
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

	frames: {
		attribute: {},
		get(){
			return this._frames !== undefined ? this._frames : this.rows * this.cols
		},
		set(val){
			this._frames = parseInt(val)
		}
	},
	
	fps: {
		attribute: { def: 30 },
		get(){return this._fps},
		set(val){
			this._fps = parseInt(val)
			this._fpsMillis = 1000 / this._fps
		}
	},
	
	autoplay: { attribute: { boolean: true } },
	
	loop: { attribute: { boolean: true } },
	
	/*
		properties
	*/
	paused: {
		get(){
			return this._paused
		},
		set(val){
			if(this._paused === val) return
			this._paused = val
			if(this._paused){
				xtag.fireEvent(this, 'pause')
			}else {
				xtag.fireEvent(this, 'play')
				this._onFrame()
			}
		},
	},

	duration: {
		get(){ return this.frames / this.fps }
	}
	
}

const methods = {
	play(){
		this.paused = false
	},

	pause(){
		this.paused = true
	},

	reset(){
		this._frame = 0
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

		// fire playing event on first frame
		if(this._frame === 0){ xtag.fireEvent(this, 'playing') }

		this._draw()
		this._frame = (this._frame + 1) % this.frames
		this._prevTime = time

		if(this._frame === 0 && !this.loop){
			this._paused = true
			xtag.fireEvent(this, 'ended')
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

