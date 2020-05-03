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
      preview.url,
      preview.id,
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
          data.subtitle,
          this.globalConfig.url
        ),
      )
      .addComponent(
        new components.TextSectionComponent([
          new components.H3Component('Persona'),
          new components.TextComponent(data.description),
        ]),
      )
      .addComponent(
        new components.TextSectionComponent([
          new components.H3Component('Goal'),
          new components.TextComponent(data.description),
        ]),
      )
      .addComponent(
        new components.DivComponent('live-preview-buttons', this.getPreviewButtons(data))
      )
      .addComponent(
        new components.TwoColumnsComponent(
          new components.MobileImageComponent(
            `${this.getPublicPath()}/${data.mobileFlow}`,
            'Mobile application flow'
          ),
          new components.DivComponent('', [
            new components.H3Component('Project description'),
            new components.TextComponent(data.projectDescription),
            new components.ListComponent(data.projectDescriptionBulletPoints)
          ])
        )
      )
      .addComponent(
        new components.TwoColumnsComponent(
          new components.DivComponent('', [
            new components.H3Component('Project description'),
            new components.TextComponent(data.projectDescription),
            new components.ListComponent(data.projectDescriptionBulletPoints)
          ]),
          new components.ImageComponent(
            `${this.getPublicPath()}/${data.desktopFlow}`,
            'Mobile application flow'
          )
        )
      )
      .addComponent(
        new components.TwoColumnsComponent(
          new components.ImageComponent(
            `${this.getPublicPath()}/${data.mobileShowcase}`,
            'Mobile application flow'
          ),
          new components.DivComponent('', [
            new components.H3Component('What I learn from this project:'),
            new components.ListComponent(data.learnedThings)
          ]),
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