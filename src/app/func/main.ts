/*
    TheCodingBot v6
    https://tcb.nekos.tech
*/

import { Collection } from 'discord.js';
import { App } from '../cfg/app';
import { Event } from 'src/types/Event';
import { Command } from 'src/types/Command';

export class Functions {
  app: App;

  constructor (app: App) {
    this.app = app;
  }

  clearCache = (module: string | null) => {
    if (module === null) {
      Object.keys(require.cache).forEach((key) => {
        delete require.cache[key];
      });
    } else {
      delete require.cache[module];
    }
  };

  convertTimestamp = (unixTimestamp: number, getDate: boolean, bigHour: boolean) => {
    const date = new Date(unixTimestamp); // Create Date from timestamp

    const hours = date.getHours(); // Hours part from the timestamp
    const minutes = '0' + date.getMinutes(); // Minutes part from the timestamp
    const seconds = '0' + date.getSeconds(); // Seconds part from the timestamp

    // Will display time in hh:mm:ss format
    let formattedTime = ((bigHour) ? ((hours > 12) ? (hours - 12) : (hours === 0) ? 12 : hours) : hours) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ((bigHour) ? ((hours < 12) ? ' AM' : ' PM') : '');

    if (getDate) {
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = date.getFullYear();
      formattedTime = `${mm}/${dd}/${yyyy} ${formattedTime}`;
    };

    // Return that bad boy
    return formattedTime;
  };

  isAnimated = (str: string) => { return str.substring(0, 2) === 'a_'; };
  sleep = (ms: number) => { return new Promise(resolve => setTimeout(resolve, ms)); };
  getTicks = () => { return ((new Date().getTime() * 10000) + 621355968000000000); };
  getID = (string: string) => { return string.replace(/[<#@&!>]/g, ''); };

  // loadDependencies = async (dependencies: { name: any; required: any; }[]) => {
  //   const startTime = new Date().getTime();
  //   this.app.functions.clearCache(null);
  //   dependencies.forEach(async (dependency: { name: any; required: any; }) => {
  //     const dependencyName = dependency.name;
  //     try {
  //       this.app.logger.debug('SYS', `Loading dependency: ${dependencyName}...`);
  //       this.app.modules[dependencyName] = await import(dependencyName);
  //       this.app.logger.info('SYS', `Loaded dependency: ${dependencyName} in ${new Date().getTime() - startTime}ms.`);
  //     } catch (Ex) {
  //       if (dependency.required) {
  //         this.app.logger.error('SYS', `Failed to load required dependency: ${dependencyName}. Bailing out!`);
  //         process.exit(1);
  //       } else {
  //         this.app.logger.error('SYS', `Failed to load dependency: ${dependencyName}.`);
  //       };
  //     };
  //   });
  // };

  loadEvents = async (events: string[]) => {
    const startTime = new Date().getTime();
    for (let i = 0; i < events.length; i++) {
      const eventName = events[i].split('.')[0];
      const eventLocation = `../evts/${eventName}`;
      try {
        this.app.logger.debug('SYS', `Loading event: ${eventName}...`);
        // this.app.functions.clearCache(eventLocation);
        const { default: _Event } = await import(eventLocation);
        const rqEvent: Event = new _Event();

        this.app.client.on(rqEvent.name, rqEvent.execute.bind(null, this.app));
        this.app.logger.info('SYS', `Loaded event: ${eventName} by ${rqEvent.author} in ${new Date().getTime() - startTime}ms.`);
      } catch (Ex: unknown) {
        if (Ex instanceof Error) {
          this.app.logger.error('SYS', `Failed to event: ${eventName}. ${Ex.message}\n${Ex.stack}`);
        } else {
          this.app.logger.error('SYS', `Failed to event: ${eventName}. ${Ex}\n`);
        }
      };
    };
  };

  loadCommands = async (commands: string[]) => {
    const startTime = new Date().getTime();
    this.app.client.slashCommands = new Collection();
    for (let i = 0; i < commands.length; i++) {
      const commandName = commands[i].split('.')[0];
      const commandLocation = `../cmds/${commandName}`;
      try {
        this.app.logger.debug('SYS', `Loading command: ${commandName}...`);
        // this.app.functions.clearCache(commandLocation);
        const { default: _Command } = await import(commandLocation);
        const rqCommand: Command = new _Command();

        this.app.client.slashCommands.set(rqCommand.name, rqCommand);
        this.app.logger.info('SYS', `Loaded command: ${commandName} by ${rqCommand.author} in ${new Date().getTime() - startTime}ms.`);
      } catch (Ex: unknown) {
        if (Ex instanceof Error) {
          this.app.logger.error('SYS', `Failed to command: ${commandName}. ${Ex.message}\n${Ex.stack}`);
        } else {
          this.app.logger.error('SYS', `Failed to command: ${commandName}. ${Ex}\n`);
        }
      };
    };
  };

  exitHandler = (options: { cleanup: boolean; exit: boolean; }, _exitCode: number) => {
    if (options.cleanup) {
      if (this.app.client != null) {
        if (this.app.client.user != null) {
          this.app.logger.info('DISCORD', 'Logging out...');
          this.app.client.destroy();
        }
      };
    };
    // The next line is a no-op?
    // if (exitCode || exitCode === 0) {}
    if (options.exit) process.exit();
  };
}
