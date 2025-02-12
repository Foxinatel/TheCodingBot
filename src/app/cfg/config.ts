/*
  TheCodingBot v6
  https://tcb.nekos.tech
*/

import { Config } from 'src/types/Config';

export const config = new class implements Config {
  commands = {
    registerToAllServers: false, // TRUE will register to ALL, FALSE will register to Server ID below.
    registerToServer: '788391989460205571' // Set this to the Server ID you want. (See above for details)
  };

  system = {
    owners: ['YOUR USERID HERE'],
    footerText: 'Made with ❤️ by Netro Corporation. ©️ 2022.',
    defaultLanguage: 'English (en_US)',

    APIs: {
      log: 'https://tcb.nekos.tech/bot/',
      img: 'https://api.netrocorp.net/v1/imgs/'
    },

    embedColors: {
      aqua: 1752220,
      green: 3066993,
      lime: 65280,
      blue: 3447003,
      purple: 10181046,
      gold: 15844367,
      orange: 15105570,
      red: 15158332,
      yellow: 16312092,
      gray: 9807270,
      navy: 3426654,
      pink: 16580705,
      light_orange: 16098851,
      light_gray: 12370112,
      dark_aqua: 1146986,
      dark_green: 2067276,
      dark_blue: 2123412,
      dark_purple: 7419530,
      dark_gold: 12745742,
      dark_orange: 11027200,
      dark_red: 10038562,
      dark_gray: 9936031,
      darker_gray: 8359053,
      dark_navy: 2899536,
      dark_pink: 12320855
    },

    emotes: {
      lock: ':lock:',
      wait: ':hourglass:',

      d_wait: ':arrows_counterclockwise:',
      information: ':information_source:',
      warning: ':warning:',
      error: ':x:',
      question: ':question:',
      success: ':white_check_mark:',

      osu: {
        osuLogo: ':o:',

        hit300: ':three::zero::zero:',
        hit100: ':one::zero::zero:',
        hit50: ':five::zero:',

        rankXH: ':regional_indicator_s::bust_in_silhouette:',
        rankSH: ':regional_indicator_s::regional_indicator_s::bust_in_silhouette:',
        rankS: ':regional_indicator_s:',
        rankA: ':regional_indicator_a:',
        rankB: ':regional_indicator_b:',
        rankC: ':regional_indicator_c:',
        rankD: ':regional_indicator_d:'
      },
      discord: {
        online: ':green_circle:',
        idle: ':yellow_circle:',
        dnd: ':red_circle:',
        offline: ':black_circle:'
      },

      rickroll: ':up:'

    }
  };
}();
