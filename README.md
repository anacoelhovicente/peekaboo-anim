# peekaboo

A JavaScript helper for viewport based CSS animations

## About

Peekaboo is a minimal 2k library for viewport animations.

Peekaboo uses IntersectionObserver to check `data-peekaboo` items and adds a `.peekabooed` class if they are visible. For browsers without support it relies on requestAnimationFrame.

With that, you can do all the animations you want, controlling them with CSS.

## Install

```bash
$ npm install peekaboo-anim
```
Once you have installed Peekaboo you need to include the JavaScript.

```js
// ES6 modules
import Peekaboo from 'peekaboo-anim';

// CommonJS modules
var Peekaboo = require('Peekaboo');
```

## Usage

Setup the items to observe with the `data-peekaboo` attribute.

```html
<div data-peekaboo></div>
<div data-peekaboo data-peekaboo-delay="500"></div>
<div data-peekaboo="fadeIn" data-peekaboo-delay="500"></div>
```

Then initialize Peekaboo.
```js
var peekaboo = new Peekaboo();
```

## Animations

By default peekaboo doesn't provide any animations, so to animate you have to extend the `.peekabooed` class to animate visible items.

You can delay the setting of the `.peekabooed` class with the `data-peekaboo-delay` attribute. Or if you prefer you can set delays in the CSS.

## Options

```js
var peekaboo = new Peekaboo({
  root: null, //defaults to viewport
  threshold: 0.25, //the percentage visible to trigger the finishedClass
  finishedClass: 'peekabooed'
});
```

## Licensing

MIT © 2018 [Ana Vicente](http://anavicente.me)
