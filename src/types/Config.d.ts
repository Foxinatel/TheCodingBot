export interface Config {
  commands: {
    registerToAllServers: boolean,
    registerToServer: string
  },
  system: {
    owners: string[],
    footerText: string,
    defaultLanguage: string,

    APIs: {
      log: string,
      img: string
    },

    embedColors: {
      aqua: number,
      green: number,
      lime: number,
      blue: number,
      purple: number,
      gold: number,
      orange: number,
      red: number,
      yellow: number,
      gray: number,
      navy: number,
      pink: number,
      light_orange: number,
      light_gray: number,
      dark_aqua: number,
      dark_green: number,
      dark_blue: number,
      dark_purple: number,
      dark_gold: number,
      dark_orange: number,
      dark_red: number,
      dark_gray: number,
      darker_gray: number,
      dark_navy: number,
      dark_pink: number
    },

    emotes: {
      lock: string,
      wait: string,

      d_wait: string,
      information: string,
      warning: string,
      error: string,
      question: string,
      success: string,

      osu: {
        osuLogo: string,

        hit300: string,
        hit100: string,
        hit50: string,

        rankXH: string,
        rankSH: string,
        rankS: string,
        rankA: string,
        rankB: string,
        rankC: string,
        rankD: string
      },
      discord: {
        online: string,
        idle: string,
        dnd: string,
        offline: string
      },
      rickroll: string
    }
  }
}
