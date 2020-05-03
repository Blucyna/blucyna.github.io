const Component = require('./Component');

class CoverComponent extends Component{
  constructor(path, name, subtitle, parentSite) {
    super('cover');

    this.data.path = path;
    this.data.name = name;
    this.data.subtitle = subtitle;
    this.data.parentSite = parentSite;
  }
}

module.exports = CoverComponent;