/*
    TheCodingBot v6
    https://tcb.nekos.tech
*/

module.exports = {
  name: 'TheCodingBot',
  shortName: 'TCB',

  version: {
    major: 6,
    minor: 0,
    revision: 0,
    buildType: 'A',
    toString: () => {
      const major = this.version.major;
      const minor = this.version.minor;
      const revision = this.version.revision;
      return `${major}.${minor}.${revision}`;
    },
    toBuildString: () => {
      switch (this.version.buildType) {
        case 'A': return 'ALPHA';
        case 'B': return 'BETA';
        case 'R': return 'RELEASE';
      }
    },
    toFullString: () => `${this.version.toString()} ${this.version.toBuildString}`
  },
  dependencies: [
    { name: 'fs', required: true },
    { name: 'path', required: true },
    { name: 'util', required: true },
    { name: 'node-fetch', required: false },
    { name: 'discord.js', required: true },
    { name: 'sequelize', required: true },
    { name: 'canvas', required: false },
    { name: 'os', required: true }
  ]
};
