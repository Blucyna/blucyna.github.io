const Component = require('./Component');

class MobileImageComponent extends Component{
  constructor(srcs, title, placeholder) {
    super('mobileImage');

    this.data.title = title;
    this.data.placeholder = placeholder;
    this.data.images = srcs.map((src => ({
      src: src,
      type: src.includes('webp') ? 'image/webp' : 'image/jpeg',
    })));
  }
}

module.exports = MobileImageComponent;