/*
  TheCodingBot v6
  https://tcb.nekos.tech
*/

import { Guild } from 'discord.js';
import { App } from '../cfg/app';
import { Event } from 'src/types/Event';

export default class GuildUnavailable implements Event<'guildUnavailable'> {
  name = 'guildUnavailable';
  description = 'Emits when a guild goes poof!';
  author = 'Aisuruneko';

  execute = async (app: App, guild: Guild) => {
    app.logger.warn('DISCORD', `[${guild.id}] --> ${guild.name} is now Unavailable!`);
  };
};
