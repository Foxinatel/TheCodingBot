import { CommandInteraction } from 'discord.js';
import { App } from './App';
import { Language } from './Language';

export interface Command {
  name: string,
  description: string,
  author: string,
  aliases: string[],
  syntax: string[],
  permissions: number,
  cooldown: number,
  guildOnly: boolean,
  hidden: boolean,
  execute: (app: App, lang: Language, interaction: CommandInteraction, args?: any[]) => Promise<void>
}
