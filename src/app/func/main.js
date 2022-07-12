/*
    TheCodingBot v6
    https://tcb.nekos.tech
*/

class Main {
  constructor () {
    this.app = null;
  }

  setContext (app) {
    this.app = app;
  }

  clearCache = (module) => {
    if (module == null) { Object.keys(require.cache).forEach(function (key) { delete require.cache[key]; }); } else { delete require.cache[module]; }
  };

  convertTimestamp = (unixTimestamp, getDate, bigHour) => {
    if (bigHour == null) bigHour = false;

    const date = new Date(unixTimestamp * 1); // Create Date from timestamp

    const hours = date.getHours(); // Hours part from the timestamp
    const minutes = '0' + date.getMinutes(); // Minutes part from the timestamp
    const seconds = '0' + date.getSeconds(); // Seconds part from the timestamp

    // Will display time in hh:mm:ss format
    let formattedTime = ((bigHour) ? ((hours > 12) ? (hours - 12) : (hours === 0) ? 12 : hours) : hours) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ((bigHour) ? ((hours < 12) ? ' AM' : ' PM') : '');

    if (getDate) {
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = date.getFullYear();
      formattedTime = mm + '/' + dd + '/' + yyyy + ' ' + formattedTime;
    };

    // Return that bad boy
    return formattedTime;
  };

  isAnimated = (str) => { return str.substring(0, 2) === 'a_'; };
  sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)); };
  getTicks = () => { return ((new Date().getTime() * 10000) + 621355968000000000); };
  getID = (string) => { return string.replace(/[<#@&!>]/g, ''); };

  loadDependencies = (dependencies) => {
    const startTime = new Date().getTime();
    this.app.functions.clearCache();
    dependencies.forEach(dependency => {
      const dependencyName = dependency.name;
      try {
        this.app.logger.debug('SYS', `Loading dependency: ${dependencyName}...`);
        this.app.modules[dependencyName] = require(dependencyName);
        this.app.logger.info('SYS', `Loaded dependency: ${dependencyName} in ${new Date().getTime() - startTime}ms.`);
      } catch (Ex) {
        if (dependency.required) {
          this.app.logger.error('SYS', `Failed to load required dependency: ${dependencyName}. Bailing out!`);
          process.exit(1);
        } else {
          this.app.logger.error('SYS', `Failed to load dependency: ${dependencyName}.`);
        };
      };
    });
  };

  loadEvents = (events) => {
    const startTime = new Date().getTime();
    for (let i = 0; i < events.length; i++) {
      const eventName = events[i].split('.')[0];
      const eventLocation = process.cwd() + '/app/evts/' + eventName;
      try {
        this.app.logger.debug('SYS', `Loading event: ${eventName}...`);
        this.app.functions.clearCache(eventLocation);
        const rqEvent = require(eventLocation);

        this.app.client.on(rqEvent.name, rqEvent.execute.bind(null, this.app));
        this.app.logger.info('SYS', `Loaded event: ${eventName} by ${rqEvent.author.join(', ')} in ${new Date().getTime() - startTime}ms.`);
      } catch (Ex) {
        this.app.logger.error('SYS', `Failed to event: ${eventName}. ${Ex.message}\n${Ex.stack}`);
      };
    };
  };

  loadCommands = (commands) => {
    const startTime = new Date().getTime();
    this.app.client.arrayOfSlashCommands = [];
    for (let i = 0; i < commands.length; i++) {
      const commandName = commands[i].split('.')[0];
      const commandLocation = process.cwd() + '/app/cmds/' + commandName;
      try {
        this.app.logger.debug('SYS', `Loading command: ${commandName}...`);
        this.app.functions.clearCache(commandLocation);
        const rqCommand = require(commandLocation);

        this.app.client.slashCommands.set(rqCommand.name, rqCommand);
        this.app.client.arrayOfSlashCommands.push(rqCommand);
        this.app.logger.info('SYS', `Loaded command: ${commandName} by ${rqCommand.author.join(', ')} in ${new Date().getTime() - startTime}ms.`);
      } catch (Ex) {
        this.app.logger.error('SYS', `Failed to command: ${commandName}. ${Ex.message}\n${Ex.stack}`);
      };
    };
  };

  exitHandler = (options, exitCode) => {
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

// module.exports = main;
module.exports = function () { return new Main(); };
