
export const UNSPLASH_IT = 'https://unsplash.it';
export const LOREM_PIXEL = 'http://lorempixel.com';


const INT_DEFAULTS = { min: 0, max: 10 };

export function randomInt(options) {
  const { min, max } = {...options, ...INT_DEFAULTS};
  return Math.floor(Math.random() * max) + min;
}

const IMAGE_DEFAULTS = {
  height: 40,
  width: 40,
  section: '',
};

export function randomImage(options = {}) {
  if (typeof options.height === 'undefined' && typeof options.width !== 'undefined') {
    options.height = options.width;
  }

  const { height, width, section } = {...options, ...IMAGE_DEFAULTS};
  const size = `${width}/${height}`;
  if (section) {
    return `${LOREM_PIXEL}/${size}/${section}`;
  }

  return `${UNSPLASH_IT}/${size}?random&time=${randomInt()}`;
}

export function randomImages(num, options = { width: 40 }) {
  return Array.from(Array(num)).map(() => randomImage(options));
}


