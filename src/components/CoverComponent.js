const Component = require('./Component');

class CoverComponent extends Component{
  constructor(imageData, name, subtitle, coverTextColor, parentSite) {
    super('cover');

    this.data.imageData = {
      placeholder: imageData.placeholder,
      images: imageData.images.map((src => ({
        src: src,
        type: src.includes('webp') ? 'image/webp' : 'image/jpeg',
      })))
    };
    this.data.name = name;
    this.data.subtitle = subtitle;
    this.data.parentSite = parentSite;
    this.data.additionalStyles = coverTextColor ? `color:${coverTextColor}` : '';
  }
}

module.exports = CoverComponent;