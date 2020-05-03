const Page = require('../Page');
const components = require('../components');

class DetailPage extends Page {
  constructor(data, renderer, globalConfig) {
    super(data.name, renderer, globalConfig);

    this.data = data;

    this.viewPath = 'detail/detail.html';
  }

  getPreviewButtons(data) {
    return data.livePreviews.map((preview) => new components.PreviewComponent(
      preview.label,
      preview.id,
      preview.path,
    ));
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
          data.subtitle
        ),
      )
      .addComponent(
        new components.TextSectionComponent([
          new components.H3Component('Project description'),
          new components.TextComponent(data.description),
        ]),
      )
      .addComponent(
        new components.DivComponent('live-preview-buttons', this.getPreviewButtons(data))
      )
      .addComponent(
        new components.DivComponent('ufo--p-container-fluid', [
          new components.DivComponent('media-container display-mode--default',
            data.flows.map(url => new components.MobileImageComponent(
              `${this.getPublicPath()}/${url}`,
              'Application flow'
            )),
          )
        ])
      )
      .addComponents(
        data.images.map(image => new components.ImageComponent(
          `${this.getPublicPath()}/${image}`,
          image,
          'Screenshot of Moynooth Furniture'
        ))
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

module.exports = DetailPage;