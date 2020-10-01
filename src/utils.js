const debounceFrame = (fn) => {
  let frame;
  return (...params) => {
    if (frame) { 
      cancelAnimationFrame(frame);
    }
    frame = requestAnimationFrame(() => {
      fn(...params);
    });
  } 
};

function debounce(func, wait, context = this) {
        let timeout = null;
        return function (...args) {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => func.apply(context, args), wait);
        }
 }

export {debounce, debounceFrame};