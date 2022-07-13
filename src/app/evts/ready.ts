/*
  TheCodingBot v6
  https://tcb.nekos.tech
*/

import { App } from '../cfg/app';
import { Event } from 'src/types/Event';

export default class Ready implements Event<'ready'> {
  name = 'ready';
  description = 'Runs when the Gateway does something.';
  author = 'Aisuruneko';

  execute = async (app: App) => {
    app.logger.info('SYS', `[${app.client.user!.tag}] Connected to Discord!`);
    app.config.system.footerText = app.config.system.footerText.replace('APPNAME', app.name);

    // Fetch all members for initially available guilds
    try {
      app.logger.info('SYS', `Found ${app.client.guilds.cache.size} servers to cache. [It may be spammy!!]`);

      const promises = app.client.guilds.cache.map(async guild => {
        app.logger.debug('SYS', `[${guild.id}] --> Cache members...`);
        if (guild.available) await guild.members.fetch();
        app.logger.debug('SYS', `[${guild.id}] --> Members cached: ${guild.members.cache.size}`);
        app.logger.debug('SYS', `[${guild.id}] --> Cached members.`);

        app.logger.debug('SYS', `[${guild.id}] --> Cache roles...`);
        if (guild.available) await guild.roles.fetch();
        app.logger.debug('SYS', `[${guild.id}] --> Roles cached: ${guild.roles.cache.size}`);
        app.logger.debug('SYS', `[${guild.id}] --> Cached roles.`);

        app.logger.info('SYS', `Cache complete from ${guild.id}!`);
      });
      await Promise.all(promises);
    } catch (err) {
      if (err instanceof Error) {
        app.logger.error('SYS', `Failed to cache from all servers! ${err}\n${err.stack}`);
      } else {
        app.logger.error('SYS', `Failed to cache from all servers! ${err}\n`);
      }
    } finally {
      const registeringToAll = app.config.commands.registerToAllServers;
      try {
        if (registeringToAll) {
          await app.client.application!.commands.set([...app.client.slashCommands.values()]);
        } else {
          await app.client.guilds.cache.get(app.config.commands.registerToServer)?.commands.set([...app.client.slashCommands.values()]);
        }
        // app.client.slashCommands = null;
      } catch (err) {
        if (err instanceof Error) {
          app.logger.error('SYS', `Failed to register to slash commands! ${err}\n${err.stack}`);
        } else {
          app.logger.error('SYS', `Failed to register to slash commands! ${err}\n`);
        }
      } finally {
        // Should this be empty?
      };
    };
  };
};
