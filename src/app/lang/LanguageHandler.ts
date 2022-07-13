/*
    TheCodingBot v6
    https://tcb.nekos.tech
*/

import { App } from '../cfg/app';

export class LanguageHandler {
  app: App;

  constructor (app: App) {
    this.app = app;
  }

  load = async (langs: string[], init = true) => {
    if (!this.app) return 'NO APP, NO LANG';
    if (init) { this.app.langs = []; }

    for (let i = 0; i < langs.length; i++) {
      const lang = langs[i].split('.lang.js')[0];
      const startTime = new Date().getTime();
      try {
        this.app.logger.debug('SYS', `Loading language: ${lang}...`);

        const { default: _Language } = await import(`./${lang}.lang`);
        const theLanguage = new _Language();
        this.app.logger.debug('SYS', `[${theLanguage.metadata.langCode}] ${lang} (${theLanguage.metadata.full_name}) v${theLanguage.metadata.version} by ${theLanguage.metadata.translator} loaded.`);

        this.app.langs.push(theLanguage);

        const endTime = new Date().getTime();
        this.app.logger.success('SYS', `Loaded language: ${lang} in ${(endTime - startTime)}ms.`);
      } catch (error: unknown) {
        this.app.logger.error('SYS', `Could not load language: ${lang}.\n\tError Details:\n\t${error}`);
        if (error instanceof Error) {
          console.error(error.stack);
        } else {
          console.error(error);
        }
      }
    };
  };

  // get = (lang, line) => {
  //   if (!this.app) return 'NO APP, NO LANG';

  //   const returnLine = (app: App) => {
  //     if (!app.langs[lang]) {
  //       for (let i = 0; i < app.langs.length; i++) {
  //         const l = app.langs[i];
  //         if (lang === l.metadata.name || lang === l.metadata.full_name) {
  //           return l.translations[line] // Try the language first
  //                   || app.config.langs.English.translations[line] // Then try English
  //                   || line // If all fails, return the line
  //                   || 'TRANSLATION_FAIL_1';
  //         } // and somehow if this executes, that's the world ending.
  //       };
  //       return app.config.langs.English.translations[line] // Then try English
  //               || line // If all fails, return the line
  //               || 'TRANSLATION_FAIL_2'; // and somehow if this executes, that's the world ending.
  //     };

  //     // Return line
  //     return app.config.langs[lang].translations[line] // Try the language first
  //               || app.config.langs.English.translations[line] // Then try English
  //               || line // If all fails, return the line
  //               || 'TRANSLATION_FAIL_3'; // and somehow if this executes, that's the world ending.
  //   };

  //   const translation = returnLine(this.app);
  //   if (typeof translation === 'string') {
  //     return translation.replace('APPNAME', this.app.name).replace('FOOTER', this.app.config.system.footerText);
  //   } else {
  //     return translation;
  //   }
  // };
}
