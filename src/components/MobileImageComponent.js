const Component = require('./Component');

class MobileImageComponent extends Component{
  constructor(src, title) {
    super('mobileImage');

    this.data.title = title;
    this.data.src = src;
  }
}

module.exports = MobileImageComponent;