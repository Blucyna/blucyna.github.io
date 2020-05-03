const Page = require('../Page');
const components = require('../components');

class MobileMockupsPreview extends Page {
  constructor(data, renderer, globalConfig) {
    super(data.name, renderer, globalConfig);

    this.data = data;

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
          data.parentSite,
        ),
      )
      .addComponent(
        new components.TextSectionComponent([
          new components.H3Component('Mobile mockups'),
        ]),
      )
      .addComponent(
        new components.SectionComponent(
          data.mobileImages.map(image =>
            new components.MobileImageComponent(
              `${this.getPublicPath()}/${image}`,
              image,
              'Mobile screenshot of Moynooth Furniture'
            )
          )
        )
      )
  }
}

module.exports = MobileMockupsPreview;