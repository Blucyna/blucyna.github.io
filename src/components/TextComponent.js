const Component = require('./Component');

class TextComponent extends Component{
  constructor(text) {
    super('text');

    this.data.text = text;
  }
}

module.exports = TextComponent;