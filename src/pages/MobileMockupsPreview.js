const Page = require('../Page');
const components = require('../components');

class MobileMockupsPreview extends Page {
  constructor(data, renderer, globalConfig) {
    super(data, renderer, globalConfig);

    this.viewPath = 'detail/detail.html';
  }

  buildPage(data) {
    this
      .setDescription(data.description)
      .setSubtitle(data.subtitle)
      .addStyle(`${this.getPublicPath()}/css/detail.css`)
      .addScript(`${this.getPublicPath()}/js/detail.js`, false, true)
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
          new components.H3Component('Mobile mockups'),
        ]),
      )
      .addComponent(
        new components.SectionComponent(
          data.mobileImages.map(image =>
            new components.MobileImageComponent(
              image.sources.map(src => `${this.getPublicPath()}/${src}`),
              image.title,
              `${this.getPublicPath()}/${image.placeholder}`
            )
          )
        )
      )
  }
}

module.exports = MobileMockupsPreview;