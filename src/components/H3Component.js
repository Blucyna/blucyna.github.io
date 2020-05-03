const Component = require('./Component');

class H3Component extends Component{
  constructor(text) {
    super('h3');

    this.data.text = text;
  }
}

module.exports = H3Component;