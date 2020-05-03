const fs = require('fs');

const {global, content} = require('../config');

const Renderer = require('./renderer');
const DetailPage = require('./pages/NewDetailPage');
const MobileMockupsPreview = require('./pages/MobileMockupsPreview');
const DesktopMockupsPreview = require('./pages/DesktopMockupsPreview');

const publicPath = 'public';
const outputPath = 'build';

const withPublicPath = (path) => `${publicPath}/${path}`;

const globalConfig = {
  ...global,
  publicPath,
  avatar: withPublicPath(global.avatar),
  cvFile: withPublicPath(global.cvFile),
};

const saveToFile = (view, content) => {
  return fs.writeFileSync(`${outputPath}/${view}`, content)
}

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

const mobilePreviews = content.map((entry) =>
  new MobileMockupsPreview(
    {...entry, name: `${entry.name} mobile mockups`},
    renderer,
    globalConfig
  ).setName(entry.name)
);

const desktopPreviews = content.map((entry) => new DesktopMockupsPreview(
    {...entry, name: `${entry.name} desktop mockups`},
    renderer,
    globalConfig
  ).setName(entry.name)
);

const details = content.map((entry, index) => new DetailPage(
  {
    ...entry,
    mobileMockupsPreview: {
      ...entry.mobileMockupsPreview,
      url: mobilePreviews[index].getPath(),
    },
    desktopMockupsPreview: {
      ...entry.desktopMockupsPreview,
      url: desktopPreviews[index].getPath(),
    },
  },
  renderer,
  globalConfig
));


const indexViewData = {
  config: globalConfig,
  projects: details.map((page) => ({
    path: page.getPath(),
    name: page.getName(),
    subtitle: page.getSubtitle(),
    thumbnail: page.getThumbnail(),
  })),
  cacheBuster: new Date().getTime(),
  ...getOgTags()
};

const index = renderer.render('index/index.html', indexViewData);

//const contact = renderer.render('contact/contact.html', viewData);

saveToFile('index.html', index);

details.forEach(page => {
  saveToFile(page.getPath(), page.render())
});

mobilePreviews.forEach((page, index) => {
  saveToFile(
    page.getPath(),
    page
      .setParentSite(details[index].getPath())
      .render()
  )
});

desktopPreviews.forEach((page, index) => {
  saveToFile(
    page.getPath(),
    page
      .setParentSite(details[index].getPath())
      .render()
  )
});

//saveToFile('contact.html', contact);
