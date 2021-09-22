# COOLDOM
Fast dom creation

## USAGE
```js
import dom, {domNS} from 'cooldom';

// dom(tagName, className?, style?, attrs?, children?)

dom('div') // <div>
dom('div', 'some-class') // <div class="some-class">
dom('div', {width: 100}) // <div style="width: 100px">
dom('div', {innerText: 'some-text', id: 'some-id'}) // <div id="some-id">somw-text</div>
dom('div', 'some-class', {width: 100}, {id: 'some-id'})
dom('<div>', {id: 'parent'} [dom('span', 'child')]) // <div id="parent"><span class="child"></span></div>
domNS('svg') // <svg>
```
---------------------
The MIT License (MIT).