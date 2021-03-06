const createElement = (
    props = {
        type,
        id,
        parent,
        innerHTML,
        inputProps,
        eventObject,
        attrs,
    }
) => {
    let { type, id, parent, innerHTML, inputProps, eventObject, attrs } = props;

    let inputContainer;

    //TODO bug somewhere causing returns with valid prop types
    if (!type || !parent) {
        return;
    }

    if (typeof parent === 'string') {
        parent = document.getElementById(parent);
    }

    let ele = document.createElement(type);

    if (type === 'input' || type === 'textarea') {
        if (inputProps.checked) {
            ele.checked = inputProps.checked;
        }

        if (type === 'input') {
            ele.type = inputProps.type;

            if (inputProps.value) {
                ele.setAttribute('value', inputProps.value);
            }
        }

        if (inputProps.container) {
            inputContainer = document.createElement(inputProps.container);
            if (inputProps.containerClass) {
                inputContainer.classList.add(inputProps.containerClass);
            }
        } else {
            inputContainer = document.createElement('div');
            inputContainer.classList.add(`${props.id}-container`);
        }

        if (inputProps.name) {
            ele.setAttribute('name', inputProps.name);
        }

        if (inputProps.label && inputProps.for) {
            const label = document.createElement('label');
            label.setAttribute('for', inputProps.for);
            label.innerHTML = inputProps.label;
            inputContainer.appendChild(label);
            parent.appendChild(inputContainer);
            parent = inputContainer;
        }

        if (inputProps.min) {
            ele.setAttribute('min', inputProps.min);
        }

        if (inputProps.max) {
            ele.setAttribute('max', inputProps.max);
        }

        if (inputProps.step) {
            ele.setAttribute('step', inputProps.step);
        }
    }

    if (id) {
        ele.setAttribute('id', `${id}`);
    }

    if (attrs) {
        for (let a = 0; a < attrs.length; a++) {
            ele.setAttribute(attrs[a].attr, attrs[a].value);

            // Hacky fix for disabled=false evaluating to true on HTML elements.
            if (attrs[a].attr === 'disabled' && attrs[a].value === 'false') {
                ele.removeAttribute('disabled');
            }
        }
    }

    if (innerHTML) {
        ele.innerHTML = innerHTML;
    }

    if (eventObject) {
        ele.addEventListener(eventObject.listener, e => {
            eventObject.func(e);
        });
    }

    parent.appendChild(ele);
};

export default createElement;
