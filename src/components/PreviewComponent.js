const Component = require('./Component');

class PreviewComponent extends Component {
  constructor(label, url, id) {
    super('preview');

    this.data.label = label;
    this.data.url = url;
    this.data.id = id;
  }
}

module.exports = PreviewComponent;