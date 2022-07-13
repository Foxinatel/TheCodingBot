/*
  TheCodingBot v6
  https://tcb.nekos.tech
*/

import { CommandInteraction } from 'discord.js';
import { Command } from 'src/types/Command';
import { Language } from 'src/types/Language';
import { App } from '../cfg/app';

export default class Test implements Command {
  name = 'test';
  description = 'Test command.';
  author = 'Aisuruneko';
  aliases = [];
  syntax = [];
  permissions = 0;
  cooldown = 2;
  guildOnly = false;
  hidden = false;
  execute = async (app: App, lang: Language, interaction: CommandInteraction) => {
    interaction.followUp({ content: lang.translations['commands.test.test'] });
  };
};
