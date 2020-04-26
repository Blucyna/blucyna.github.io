const nunjucks = require('nunjucks');
const fs = require('fs');

const {global, content} = require('../config');

const publicPath = 'public';
const outputPath = 'build';

const withPublicPath = (path) => `${publicPath}/${path}`;

const globalConfig = {
  ...global,
  avatar: withPublicPath(global.avatar),
  cvFile: withPublicPath(global.cvFile),
};

const entries = content.map(entry => ({
  ...entry,
  path: entry.name.replace(/ /g, '-'),
  title: `${globalConfig.meta.title} - ${entry.name}`,
  cover: withPublicPath(entry.cover),
  miniCover: withPublicPath(entry.miniCover),
  images: entry.images.map(withPublicPath),
}));

const generatePage = (view, data) => {
  return nunjucks.render(view, data);
};

const saveToFile = (view, content) => {
  return fs.writeFileSync(`${outputPath}/${view}`, content)
}


const viewData = {
  config: globalConfig,
  entries,
};

nunjucks.configure('src/views', { autoescape: true });

const index = generatePage('index/index.html', viewData);
const details = new Map(
  entries.map(
    (entry) => [
      entry,
      //generatePage('detail/detail.html', {viewData, entry}),
    ]
  )
);
const contact = generatePage('contact/contact.html', viewData);

saveToFile('index.html', index);
saveToFile('contact.html', contact);
