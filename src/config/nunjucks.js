const nunjucks = require("nunjucks");
const i18next = require("i18next");



module.exports = {
  configureNunjucks: (app, viewsPath, url) => {
    const nunjucksEnv = nunjucks.configure(viewsPath, {
      autoescape: true,
      express: app,
      noCache: true
    });

    nunjucksEnv.addGlobal("addLanguageParam", function (language) {
      const parsedUrl = new URL(url);
      parsedUrl.searchParams.set("lng", language);
      console.log(parsedUrl.pathname + parsedUrl.search);
      return parsedUrl.pathname + parsedUrl.search;
    });

    nunjucksEnv.addFilter("translate", function (key, options) {
      const translate = i18next.getFixedT(this.ctx.i18n.language);
      return translate(key, options);
    });

    return nunjucksEnv;
  }
};
