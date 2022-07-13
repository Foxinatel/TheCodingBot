/*
    TheCodingBot v6
    https://tcb.nekos.tech
*/

import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { App } from './app/cfg/app';
import * as fs from 'fs';

// Version 6 of TheCodingBot
// Can you believe we've come this far?

async function bot (debug: boolean) {
  const startTime = new Date().getTime();
  try {
    console.log(` -- Starting as of ${new Date(startTime).toString()} -- `);

    // change into /src
    process.chdir(__dirname);

    // Import ourselves and other functions
    const app = new App('TheCodingBot', 'TCB', [6, 0, 0, 'A'], debug);
    app.debugMode = debug;
    const { config } = await import('./app/cfg/config');
    app.config = config;
    const { Functions } = await import('./app/func/main');
    app.functions = new Functions(app);

    process.stdin.resume();
    // process.on('exit', app.functions.exitHandler.bind(null, { cleanup: true }));
    // process.on('SIGINT', app.functions.exitHandler.bind(null, { exit: true }));
    // process.on('SIGUSR1', app.functions.exitHandler.bind(null, { exit: true }));
    // process.on('SIGUSR2', app.functions.exitHandler.bind(null, { exit: true }));

    process.on('uncaughtException', (error) => {
      if (app.logger) {
        app.logger.error('SYS', `An uncaught exception just occurred! ${error}\n${error.stack}!`);
      } else {
        console.error(`An uncaught exception just occurred! ${error}\n${error.stack}!`);
      }
    });

    // Import logger (so we look pretty :)
    const { Logger } = await import('./app/func/logger');
    app.logger = new Logger(app);
    // app.logger.setContext(app);
    app.logger.info('SYS', `Hello world of ${app.name}! Logger configured!`);

    // Load dependencies
    app.logger.info('SYS', `Loading ${app.dependencies.length} dependencies...`);
    // app.modules = {};
    // app.functions.loadDependencies(app.dependencies);

    // Import language handler & load languages
    const { LanguageHandler } = await import('./app/lang/LanguageHandler');
    // app.lang.setContext(app);
    const languages = await fs.readdirSync('./app/lang').filter((file: string) => file.endsWith('.lang.js'));
    app.logger.info('SYS', `Loading ${languages.length} languages...`);
    // eslint-disable-next-line new-cap
    await (new LanguageHandler(app)).load(languages);

    // Define our Client lol
    app.logger.info('SYS', 'Loading client...');
    app.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping
      ]
    });

    // Load events
    const events = await fs.readdirSync('./app/evts').filter((file: string) => file.endsWith('.js'));
    app.logger.info('SYS', `Loading ${events.length} events...`);
    await app.functions.loadEvents(events);

    // Load commands
    app.client.slashCommands = new Collection();
    const commands = await fs.readdirSync('./app/cmds').filter((file: string) => file.endsWith('.js'));
    app.logger.info('SYS', `Loading ${commands.length} commands...`);
    await app.functions.loadCommands(commands);

    // Here we gooooooooo!
    app.client
      .login(process.env.DISCORD_BOT_TOKEN)
      .then(() => app.logger.info('DISCORD', 'Logged in!'))
      .catch((err: any) => app.logger.error('DISCORD', err));
  } catch (Ex) {
    console.log('Something terribly went wrong and now I must exit. Until next time. :(');
    console.log(Ex);
  };
}; // hello

// Details on how this works is located in ../index.js.
const cmdArgs = process.argv.slice(2);
bot(cmdArgs[0] === 'true');
