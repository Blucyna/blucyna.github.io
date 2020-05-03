const Component = require('./Component');

class ImageComponent extends Component{
  constructor(src, title) {
    super('image');

    this.data.title = title;
    this.data.src = src;
  }
}

module.exports = ImageComponent;