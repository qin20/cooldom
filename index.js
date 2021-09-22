import css from 'dom-css';
import prefixStyle from 'prefix-style';

export function domNS(el, ...args) {
    if (!isElement(el)) {
        el = document.createElementNS('http://www.w3.org/2000/svg', el);
        el.setAttribute('data-is-ns', true);
    }
    return dom(el, ...args);
}

export default function dom(el, className, style, attrs, child) {
    const element = isElement(el) ? el : (
        el === 'svg' ?
            document.createElementNS('http://www.w3.org/2000/svg', 'svg') :
            document.createElement(el)
    );
    let attributes = {};

    if (className) {
        if (isString(className)) {
            attributes.className = className;
        } else if (isStyle(className)) {
            attributes.style = className;
        } else if (isAttr(element, className)) {
            attributes = {...className, ...attributes};
        } else if (isChild(className)) {
            attributes.children = className;
        }
    }

    if (style) {
        if (isStyle(style)) {
            attributes.style = style;
        } else if (isAttr(element, style)) {
            attributes = {...style, ...attributes};
        } else if (isChild(style)) {
            attributes.children = style;
        }
    }

    if (attrs) {
        if (isAttr(element, attrs)) {
            attributes = {...attrs, ...attributes};
        } else if (isChild(attrs)) {
            attributes.children = attrs;
        }
    }

    if (child) {
        attributes.children = child;
    }

    setAttributes(element, attributes);
    return element;
}

function isAttr(element, attrs) {
    const isObj = String(attrs) === '[object Object]';
    if (isObj) {
        const keys = Object.keys(attrs);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] in element) {
                return true;
            }
        }
    }
    return false;
}

function isString(s) {
    return typeof s === 'string';
}

function isElement(el) {
    return !!el.nodeType;
}

function isChild(el) {
    return el instanceof Array || isElement(el);
}

function isStyle(style) {
    const isObj = String(style) === '[object Object]';
    if (isObj) {
        const keys = Object.keys(style);
        for (let i = 0; i < keys.length; i++) {
            if (prefixStyle(keys[i])) {
                return true;
            }
        }
    }
    return false;
}

function isSvg(element) {
    return element.getAttribute('data-is-ns');
}

function setAttributes(element, attributes) {
    const {className, style, children, ...attrs} = attributes;
    if (className) {
        if (isSvg(element)) {
            element.className.baseVal = className;
        } else {
            element.className = className;
        }
    }
    if (style) {
        css(element, style);
    }

    if (children) {
        if (children instanceof Array) {
            children.forEach((c) => c && element.append(c));
        } else {
            element.append(children);
        }
    }

    Object.keys(attrs).forEach((name) => {
        if (isSvg(element)) {
            element.setAttribute(name, attrs[name]);
        } else {
            element[name] = attrs[name];
        }
    });
}
