const nunjucks = require('nunjucks');

class Renderer {
  constructor(viewsDir) {
    this.viewsDir = viewsDir;

    this.renderer = nunjucks.configure(this.viewsDir, { autoescape: true });
  }

  render(view, data) {
    return this.renderer.render(view, data);
  }

  renderAsync(view, data) {
    return new Promise((resolve, reject) => {
      this.renderer.render(view, data, function(err, res) {
        if(err) {
          return reject(err);
        }

        return resolve(res);
      });
    })
  }
}

module.exports = Renderer;