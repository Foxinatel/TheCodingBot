/*
    TheCodingBot v6
    https://tcb.nekos.tech
*/

import { App } from '../cfg/app';

const loggingcolors = {
  Reset: '\x1b[0m',

  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',

  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m'
};

class Locations {
  SYS = loggingcolors.FgGreen;
  DISCORD = loggingcolors.FgMagenta;
  WEB = loggingcolors.FgBlue;
  DB = loggingcolors.FgYellow;
};

class Types {
  X = loggingcolors.FgRed;
  i = loggingcolors.FgBlue;
  '!' = loggingcolors.FgYellow;
  S = loggingcolors.FgGreen;
  D = loggingcolors.FgMagenta;
};

const knownLocations = new Locations();
const knownTypes = new Types();

// Okay, the legit function begin here.
export class Logger {
  app: App;

  constructor (app: App) {
    this.app = app;
  }

  getTimestamp = () => { return `${loggingcolors.Reset}[${loggingcolors.FgCyan}${this.app.functions.convertTimestamp(new Date().getTime(), true, true)}${loggingcolors.Reset}] `; };

  log = (type: keyof Types) => (location: keyof Locations, message: string, useTimeStamp = true, logToFile = true) => {
    const typecolor = knownTypes[type] || loggingcolors.FgWhite;
    const locationcolor = knownLocations[location] || loggingcolors.FgWhite;
    console.log(`${((useTimeStamp) ? this.getTimestamp() : '')}${loggingcolors.Reset}[${typecolor}${type}${loggingcolors.Reset}] [${locationcolor}${location}${loggingcolors.Reset}] ${message}`);
  };

  error = this.log('X');
  info = this.log('i');
  warn = this.log('!');
  success = this.log('S');
  debug = this.log('D');
  bigWarn = async (message: string, useTimeStamp = true, logToFile = true) => {
    console.log(`${((useTimeStamp) ? this.getTimestamp() : '')}${loggingcolors.BgRed}WARNING: ${message}${loggingcolors.Reset}`);
  };
}
