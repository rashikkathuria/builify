import TTDOM from '../../../common/TTDOM';

export default {
  checkIfBackgroundImageHolderIsNear (target) {
    if (target.getAttribute('data-abccorent')) {
      const { children } = target;

      for (let i = 0; i < children.length; i++) {
        let currentChild = children[i];

        if (currentChild.classList.contains('background-image-holder')) {
          target = currentChild;
          target.setAttribute('data-abcnotremoveable', true);
          break;
        }
      }
    }

    return target;
  },

  hasGridClassnames (elem, elementOptions) {
    const func = (elem, cn) => {
      return !!(elem.className.indexOf(cn) !== -1);
    };

    if (TTDOM.element.is(elem, 'div, p, span, figure, article, img')) {
      if (func(elem, 'col-xs') ||
          func(elem, 'col-sm') ||
          func(elem, 'col-md')) {
        elementOptions.showExpandColumn = true;
        elementOptions.showShrinkColumn = true;
      }
    }

    return elementOptions;
  },

  replaceGridClassnames (element, shrink = false) {
    const { className: text } = element;
    const regex = /(col-)(md|sm|xs)-\d/g;
    var m = null;

    while ((m = regex.exec(text)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      const result = m[0];
      let number = parseInt(result.match(/\d/g).join(''));

      if (number > 0) {
        if (shrink && number <= 12) {
          number--;
        } else if (!shrink && number < 12) {
          number++;
        }
      }

      element.classList.remove(result);
      element.classList.add(result.replace(/(\d){1,2}?$/, number));
    }
  },

  cloneItem (element) {
    const cloneElement = element.cloneNode(true);
    const parent = element.parentNode;

    if (TTDOM.element.is(parent, 'li')) {
      const parentsParent = parent.parentNode;
      const newListItem = document.createElement('li');

      newListItem.appendChild(cloneElement);

      parentsParent.insertBefore(newListItem, parent.nextSibling);
    } else {
      parent.insertBefore(cloneElement, element.nextSibling);
    }
  }
};