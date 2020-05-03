const Component = require('./Component');

class CoverComponent extends Component{
  constructor(path, name, subtitle, coverTextColor, parentSite) {
    super('cover');

    this.data.path = path;
    this.data.name = name;
    this.data.subtitle = subtitle;
    this.data.parentSite = parentSite;
    this.data.additionalStyles = coverTextColor ? `color:${coverTextColor}` : '';
  }
}

module.exports = CoverComponent;