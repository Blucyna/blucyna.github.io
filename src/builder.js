const fs = require('fs');

const {global, content} = require('../config');

const Renderer = require('./renderer');

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
  images: entry.images.map(withPublicPath),
  carouselImages: entry.carouselImages.map(withPublicPath),
  mobileImages: entry.mobileImages.map(withPublicPath),
  flows: entry.flows.map(withPublicPath),
}));

const saveToFile = (view, content) => {
  return fs.writeFileSync(`${outputPath}/${view}`, content)
}

const viewData = {
  config: globalConfig,
  entries,
  cacheBuster: new Date().getTime(),
};

const getOgTags = (
  title= globalConfig.meta.title,
  url= globalConfig.url,
  description= globalConfig.description,
  image=globalConfig.avatar,
) => ({
  og: {
    title,
    url,
    description,
    image: `${globalConfig.url}/${image}`
  }
});

const renderer = new Renderer('src/views');

const index = renderer.render('index/index.html', {...viewData, ...getOgTags()});
const details = new Map(
  entries.map(
    (entry) => [
      entry.path,
      renderer.render('detail/detail.html', {
        ...viewData,
        ...getOgTags(
          entry.name,
          `${globalConfig.url}/${entry.path}`,
          entry.description,
          entry.miniCover,
        ),
        entry,
      }),
    ]
  )
);

//const contact = renderer.render('contact/contact.html', viewData);

saveToFile('index.html', index);
Array.from(details.keys()).map(path => saveToFile(path, details.get(path)));
//saveToFile('contact.html', contact);
