const fs = require('fs');
const jimp = require('jimp');

const { content } = require('../config');

const FIELDS = [
  'cover',
  'thumbnails',
  'mobileFlow',
  'desktopFlow',
  'mobileShowcase',
  'images',
  'mobileImages',
];

const images = content
  .flatMap((entry) => {
    return FIELDS.map(field => {
      const fieldData = entry[field];

      if( Array.isArray(fieldData)) {
        return fieldData.map(data => data.sources)
      }

      return [fieldData.images];
    })
  })
  .reduce((acc, img) => [...acc, ...img])
  .map(images => images.pop())
  .map(image => `public/${image}`)

const fileExists = (path) => fs.existsSync(path);
const isGif = (path) => path.includes('.gif');

const toResize = images
  .map((image) => {
    const [path, ext] = image.split('.');
    const placeholderName = `${path}-placeholder.${ext}`;

    return [image, placeholderName];
  })
  .filter(([_, placeholder]) => !fileExists(placeholder))
  .filter(([file]) => !isGif(file))
  .map(([fileName, newName]) => {
    return jimp
      .read(fileName)
      .then(image => image.resize(22, jimp.AUTO))
      .then(image => image.writeAsync(newName))
  });

console.log('Images to resize: ', toResize.length);

Promise.all(toResize).then(() => {
  console.log('images resized')
});
