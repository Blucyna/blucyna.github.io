const Component = require('./Component');

class FullImageComponent extends Component{
  constructor(src, title) {
    super('fullImage');

    this.data.title = title;
    this.data.src = src;
  }
}

module.exports = FullImageComponent;