const {global, content} = require('../config');

const publicPath = 'public/';
const outputPath = '';

const withPublicPath = (path) => `${publicPath}${path}`;

const globalConfig = {
  ...global,
  avatar: withPublicPath(global.avatar),
  cvFile: withPublicPath(global.cvFile),
  socials: global.socials.map(social => ({
    ...social,
    icon: withPublicPath(social.icon),
  }))
};

const entries = content.map(entry => ({
  ...entry,
  path: entry.title.replace(/ /g, '-'),
  cover: withPublicPath(entry.cover),
  miniCover: withPublicPath(entry.miniCover),
  images: entry.images.map(withPublicPath),
}));

const generatePage = (view, data) => {

};

const index = generatePage('views/index', global);
const details = entries.map((data) => generatePage('view/detail', {global, data}));
const contact = generatePage('view/contact', global);

