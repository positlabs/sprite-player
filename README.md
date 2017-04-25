# &lt;sprite-player&gt;
Web component for controlling sprite sheet animations.

[![npm version](https://badge.fury.io/js/sprite-player.svg)](https://www.npmjs.com/package/sprite-player)

	npm install --save sprite-player

## Demo

https://positlabs.github.io/sprite-player/examples/

![run animation](https://media.giphy.com/media/xUPGcttIpo6nPrNgpG/giphy.gif)

## Quickstart

	<!-- load the x-tag lib -->
	<script src='https://cdnjs.cloudflare.com/ajax/libs/x-tag/1.5.11/x-tag-core.js'></script>

	<!-- load sprite-player component -->
	<script src='node_modules/sprite-player/docs/sprite-player.js'></script>

	<!-- use it! -->
	<sprite-player src="./assets/run.png" rows="1" cols="8" fps="12" autoplay loop></sprite-player>
	
## Documentation

### Attributes

**src**: (`string`) Path to sprite image.

**frames**: (`int`) Number of frames in the animation. Defaults to `rows * cols`.

**rows**: (`int`) Number of rows in the sprite.

**cols**: (`int`) Number of columns in the sprite.

**fps**: (`Number`) Frames per second.

**autoplay**: (`Boolean`) Automatically play the animation as soon as the `src` is loaded.

**loop**: (`Boolean`) Automatically replay the animation when it ends.

### Properties

Note: All attributes are accessible as properties.

**paused**: (`Boolean`) State of the animation.

**duration**: (`Number`) Duration of animation in seconds.

### Methods

**play**: Plays the animation. Sets `paused` to `false`.
**pause**: Pauses the animation. Sets `paused` to `true`.

### Events

**play**: Sent when playback of the media starts after having been paused; that is, when playback is resumed after a prior pause event.

**playing**: Sent when the media begins to play (either for the first time, after having been paused, or after ending and then *restarting*).

**pause**: Sent when playback is paused.

**ended**: Sent when playback completes.

**loadstart**: Sent when loading of the media begins.

**load**: Sent when media is loaded.

**error**: Sent when media failed to load

