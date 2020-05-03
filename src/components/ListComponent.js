const Component = require('./Component');

class ListComponent extends Component{
  constructor(options) {
    super('list');

    this.data.options = options;
  }
}

module.exports = ListComponent;