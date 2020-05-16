const Page = require('../Page');
const components = require('../components');

class DetailPage extends Page {
  constructor(data, renderer, globalConfig) {
    super(data, renderer, globalConfig);

    this.viewPath = 'detail/detail.html';
  }

  getPreviewButtons(data) {
    return data.livePreviews.map((preview) => new components.PreviewComponent(
      preview.label,
      preview.url,
      preview.id,
    ));
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
          this.globalConfig.url
        ),
      )
      .addComponent(
        new components.TextSectionComponent([
          new components.H3Component('Persona'),
          new components.TextComponent(data.persona),
        ]),
      )
      .addComponent(
        new components.TextSectionComponent([
          new components.H3Component('Goal'),
          new components.TextComponent(data.goal),
        ]),
      )
      .addComponent(
        new components.DivComponent('live-preview-buttons', this.getPreviewButtons(data))
      )
      .addComponent(
        new components.TwoColumnsComponent(
          new components.MobileImageComponent(
            data.mobileFlow.images.map(src => `${this.getPublicPath()}/${src}`),
            data.mobileFlow.title,
            `${this.getPublicPath()}/${data.mobileFlow.placeholder}`
          ),
          new components.DivComponent('text-container', [
            new components.DivComponent('text', [
              new components.H3Component('Project decisions'),
              new components.TextComponent(data.projectDescription),
              data.projectDescriptionBulletPoints ? new components.ListComponent(data.projectDescriptionBulletPoints) : null
            ].filter(i => !!i))
          ])
        )
      )
      .addComponent(
        new components.TwoColumnsComponent(
          new components.DivComponent('text-container', [
            new components.DivComponent('text', [
              new components.H3Component('What have I learned from this project?'),
              new components.ListComponent(data.learnedThings)
            ])
          ]),
          new components.ImageComponent(
            data.desktopFlow.images.map(src => `${this.getPublicPath()}/${src}`),
            data.desktopFlow.title,
            `${this.getPublicPath()}/${data.desktopFlow.placeholder}`
          )
        )
      )
      .addComponent(
          new components.FullImageComponent(
            data.mobileShowcase.images.map(src => `${this.getPublicPath()}/${src}`),
            data.mobileShowcase.title,
            `${this.getPublicPath()}/${data.mobileShowcase.placeholder}`,
          )
      )
      .addComponent(
        new components.DivComponent('live-preview-buttons', [
          new components.PreviewComponent(
            data.mobileMockupsPreview.label,
            data.mobileMockupsPreview.url,
            data.mobileMockupsPreview.id,
          ),
          new components.PreviewComponent(
            data.desktopMockupsPreview.label,
            data.desktopMockupsPreview.url,
            data.desktopMockupsPreview.id,
          )
        ])
      )
  }
}

module.exports = DetailPage;