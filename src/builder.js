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
  path: `${entry.name.replace(/ /g, '-').toLowerCase()}.html`,
  title: `${globalConfig.meta.title} - ${entry.name}`,
  cover: withPublicPath(entry.cover),
  miniCover: withPublicPath(entry.miniCover),
  images: entry.images.map(image => ({
    ...image,
    path: withPublicPath(image.path)
  })),
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
  cacheBuster: new Date().getTime(),
};

const getOgTags = (title=globalConfig.meta.title, url= globalConfig.url, description= globalConfig.description) => ({
  og: {
    title,
    url,
    description
  }
});

nunjucks.configure('src/views', { autoescape: true });

const index = generatePage('index/index.html', {...viewData, ...getOgTags()});
const details = new Map(
  entries.map(
    (entry) => [
      entry.path,
      generatePage('detail/detail.html', {
        ...viewData,
        ...getOgTags(entry.name, `${globalConfig.url}/${entry.path}`, entry.description),
        entry,
      }),
    ]
  )
);

//const contact = generatePage('contact/contact.html', viewData);

saveToFile('index.html', index);
Array.from(details.keys()).map(path => saveToFile(path, details.get(path)));
//saveToFile('contact.html', contact);