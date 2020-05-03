const Page = require('../Page');
const components = require('../components');

class DesktopMockupsPreview extends Page {
  constructor(data, renderer, globalConfig) {
    super(data, renderer, globalConfig);

    this.viewPath = 'detail/detail.html';
  }

  buildPage(data) {
    this
      .setThumbnail(`${this.getPublicPath()}/${data.thumbnail}`)
      .setDescription(data.description)
      .setSubtitle(data.subtitle)
      .addComponent(
        new components.CoverComponent(
          `${this.getPublicPath()}/${data.cover}`,
          data.name,
          data.subtitle,
          data.coverTextColor,
          data.parentSite,
        ),
      )
      .addComponent(
        new components.TextSectionComponent([
          new components.H3Component('Desktop mockups'),
        ]),
      )
      .addComponents(
        data.images.map(image => new components.FullImageComponent(
          `${this.getPublicPath()}/${image}`,
          'Screenshot of Moynooth Furniture'
        ))
      )
  }
}

module.exports = DesktopMockupsPreview;