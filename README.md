# peekaboo

A JavaScript helper for viewport based CSS animations

## About

Peekaboo is a minimal 2k library for viewport animations.

Peekaboo uses IntersectionObserver to check `data-peekaboo` items and adds a `.peekabooed` class if they are visible. For browsers without support it relies on requestAnimationFrame.

Peekaboo only works in one direction, with animated items being removed from the observer.

## Install

```bash
$ npm install peekaboo-anim
```

## Usage

#### Add the markup

Setup the items to observe with the `data-peekaboo` attribute.

```html
<div data-peekaboo></div>
```

#### Import Peekaboo

```js
// ES6 modules
import Peekaboo from 'peekaboo-anim';

// CommonJS modules
const Peekaboo = require('Peekaboo');
```

#### Initialize Peekaboo

```js
const peekaboo = new Peekaboo();
```

## Animations

By default peekaboo doesn't provide any animations, so to animate you have to extend the `.peekabooed` class to animate visible items.

Since Peekaboo relies on CSS for the animations you can work with attribute values or with CSS classes.

```html
<div data-peekaboo class="fade-in"></div>
<div data-peekaboo="fadeIn"></div>
```

## Options

### Markup Options

#### data-peekaboo-delay

A number in ms to delay the observer's callback. Relies on `setTimeout` for the delay.

```html
<div data-peekaboo data-peekaboo-delay="500"></div>
```

If you prefer you can set delays with CSS.

### JS Options

```js
var peekaboo = new Peekaboo({
  root: null, //defaults to viewport
  threshold: 0.25, //the percentage visible to trigger the finishedClass
  finishedClass: 'peekabooed'
});
```

#### root

Same as [IntersectionObserver.root](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root).

The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if `null`.

#### threshold

Based on [IntersectionObserver.thresholds](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds).

A single number which indicates at what percentage of the target's visibility the observer's callback should be executed.

#### finishedClass

The CSS class to add to the target after it becomes visible.

## Licensing

MIT © 2021 [Ana Vicente](https://anavicente.me)
