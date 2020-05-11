class Page {
  constructor(data, renderer, globalConfig) {
    this.name = data.name;

    this.renderer = renderer;

    this.globalConfig = globalConfig;
    this.path = `${this.name.replace(/ /g, '-').toLowerCase()}.html`;
    this.title = `${this.globalConfig.meta.title} - ${this.name}`;

    this.data = data;

    this.subtitle =data.subtitle;

    this.metaData = {
      title: this.title,
      url: `${globalConfig.url}/${this.path}`,
      description: '',
      image: '',
    }

    this.setThumbnails({
      images: data.thumbnails.images.map(thumbnail => `${this.getPublicPath()}/${thumbnail}`),
      placeholder: `${this.getPublicPath()}/${data.thumbnails.placeholder}`
    }

    );

    this.components = [];

    this.styles = [];
    this.scripts = [];

    this.viewPath = 'detail2/detail.html';
  }

  setName(name) {
    this.data.name = name;

    return this;
  }

  setSubtitle(subtitle) {
    this.subtitle = subtitle;

    return this;
  }

  setParentSite(parentSite) {
    this.data.parentSite = parentSite;

    return this;
  }

  setDescription(description) {
    this.description = description;

    this.metaData.description = description;

    return this;
  }

  setThumbnails(thumbnails) {
    this.thumbNails = {
      images: thumbnails.images.map((thumbnail => ({
        src: thumbnail,
        type: thumbnail.includes('webp') ? 'image/webp' : 'image/jpeg',
      }))),
      placeholder: thumbnails.placeholder,
    };

    this.metaData.image = thumbnails.images[thumbnails.images.length-1];

    return this;
  }

  addComponent(component) {
    if (!component) {
      return this;
    }

    this.components.push(component);

    return this;
  }

  addComponents(components) {
    this.components.push(...components);

    return this;
  }

  addStyle(path) {
    this.styles.push(path);

    return this;
  }

  addScript(path, async, defer) {
    this.scripts.push({
      path,
      async: async ? 'async' : '',
      defer: defer ? 'defer' : '',
    });

    return this;
  }

  getName() {
    return this.name;
  }

  getPublicPath() {
    return this.globalConfig.publicPath;
  }

  getThumbnails() {
    return this.thumbNails
  }

  getPath() {
    return this.path;
  }

  getViewPath() {
    return this.viewPath;
  }

  getSubtitle() {
    return this.subtitle;
  }

  getTemplateData() {
    return {
      config: this.globalConfig,
      cacheBuster: new Date().getTime(),
      og: this.metaData,
      components: this.getComponentsData(),
      path: this.path,
      title: this.title,
      scripts: this.scripts,
      styles: this.styles,
    }
  }

  getComponentsData() {
    return this.components.map((component) => ({
      type: component.getType(),
      data: component.getData(),
    }))
  }

  buildPage() {

  }

  render() {
    this.buildPage(this.data);

    return this.renderer.render(
      this.getViewPath(),
      this.getTemplateData()
    )
  }
}

module.exports = Page;