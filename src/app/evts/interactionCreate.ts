/*
    TheCodingBot v6
    https://tcb.nekos.tech
*/

import { ApplicationCommandOptionType, Interaction } from 'discord.js';
import { App } from '../cfg/app';
import { Event } from 'src/types/Event';

export default class InteractionCreate implements Event<'interactionCreate'> {
  name = 'interactionCreate';
  description = 'Fired when a new interaction (slash command usually) is received.';
  author = 'Aisuruneko';

  execute = async (app: App, interaction: Interaction) => {
    // Slash Command
    if (interaction.isChatInputCommand()) {
      await interaction.deferReply({ ephemeral: false }).catch(() => {});

      const lang = app.langs[Math.floor(Math.random() * app.langs.length)];

      const cmd = app.client.slashCommands.get(interaction.commandName);
      if (!cmd) {
        await interaction.followUp({ content: lang.translations['errors.commands.genric'] });
        return;
      }

      const args: any[] = [];

      for (const option of interaction.options.data) {
        if (option.type === ApplicationCommandOptionType.Subcommand) {
          if (option.name) args.push(option.name);
          if (option.options) {
            option.options.forEach((x) => {
              if (x.value) args.push(x.value);
            });
          }
        } else if (option.value) args.push(option.value);
      };

      cmd.execute(app, lang, interaction, args);

      return;
    }

    // Context Menu
    if (interaction.isContextMenuCommand()) {
      await interaction.deferReply({ ephemeral: false });
      const command = app.client.slashCommands.get(interaction.commandName);
      // TODO: fix language support
      if (command) command.execute(app, app.langs[0], interaction);
    }
  };
};
