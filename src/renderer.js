const nunjucks = require('nunjucks');

class Renderer {
  constructor(viewsDir) {
    this.viewsDir = viewsDir;

    nunjucks.configure(this.viewsDir, { autoescape: true });
  }

  render(view, data) {
    return nunjucks.render(view, data);
  }
}

module.exports = Renderer;