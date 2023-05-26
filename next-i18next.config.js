// next-i18next.config.js
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'], // Adicione mais idiomas se necessário
  },
  localePath: path.resolve('./public/locales'), // Diretório onde serão armazenados os arquivos de tradução
};
