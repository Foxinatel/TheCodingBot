import { Client } from 'discord.js';
import { Config } from 'src/types/Config';
import { Language } from 'src/types/Language';
import { Logger } from '../func/logger';
import { Functions } from '../func/main';

class BuildType {
  A = 'ALPHA';
  B = 'BETA';
  R = 'RELEASE';
}

class Version {
  major: number;
  minor: number;
  revision: number;
  buildType: string;

  constructor (major: number, minor: number, revision: number, buildType: keyof BuildType) {
    this.major = major;
    this.minor = minor;
    this.revision = revision;
    this.buildType = buildType;
  }

  toString = () => {
    const major = this.major;
    const minor = this.minor;
    const revision = this.revision;
    return `${major}.${minor}.${revision}`;
  };

  toBuildString = () => {
    switch (this.buildType) {
      case 'A': return 'ALPHA';
      case 'B': return 'BETA';
      case 'R': return 'RELEASE';
    }
  };

  toFullString = () => `${this.toString()} ${this.toBuildString}`;
}

export class App {
  name: string;
  shortName: string;
  version: Version;
  debugMode: boolean;
  config!: Config;
  logger!: Logger;
  functions!: Functions;
  client!: Client;
  langs!: Language[];

  constructor (name: string, shortName: string, version: [number, number, number, keyof BuildType], debugMode: boolean) {
    this.name = name;
    this.shortName = shortName;
    this.version = new Version(...version);
    this.debugMode = debugMode;
  }

  dependencies = [
    { name: 'fs', required: true },
    { name: 'path', required: true },
    { name: 'util', required: true },
    { name: 'node-fetch', required: false },
    { name: 'discord.js', required: true },
    { name: 'sequelize', required: true },
    { name: 'canvas', required: false },
    { name: 'os', required: true }
  ];
}
