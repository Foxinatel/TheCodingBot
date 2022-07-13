import { Collection } from 'discord.js';
import { Command } from './Command';

declare module 'discord.js' {
  // eslint-disable-next-line no-unused-vars
  interface Client {
    slashCommands: Collection<string, Command>;
  }
}
