class Page {
  constructor(data, renderer, globalConfig) {
    this.name = data.name;

    this.renderer = renderer;

    this.globalConfig = globalConfig;
    this.path = `${this.name.replace(/ /g, '-').toLowerCase()}.html`;
    this.title = `${this.globalConfig.meta.title} - ${this.name}`;

    this.data = data;

    this.thumbNail = `${this.getPublicPath()}/${data.thumbnail}`;
    this.subtitle =data.subtitle;

    this.metaData = {
      title: this.title,
      url: `${globalConfig.url}/${this.path}`,
      description: '',
      image: '',
    }

    this.components = [];

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

  setThumbnail(path) {
    this.thumbNail = path;

    this.metaData.image = path;

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

  getName() {
    return this.name;
  }

  getPublicPath() {
    return this.globalConfig.publicPath;
  }

  getThumbnail() {
    return this.thumbNail
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