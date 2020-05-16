const Component = require('./Component');

class ImageComponent extends Component{
  constructor(srcs, title, placeholder) {
    super('image');

    this.data.title = title;
    this.data.placeholder = placeholder;
    this.data.images =  srcs.map((src => ({
      src: src,
      type: src.includes('webp') ? 'image/webp' : 'image/jpeg',
    })));
  }
}

module.exports = ImageComponent;