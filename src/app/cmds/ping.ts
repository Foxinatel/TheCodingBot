/*
  TheCodingBot v6
  https://tcb.nekos.tech
*/

import { Client, CommandInteraction } from 'discord.js';
import { Command } from 'src/types/Command';
import { Language } from 'src/types/Language';
import { App } from '../cfg/app';

export default class Ping implements Command {
  name = 'ping';
  description = 'Status for TheCodingBot.';
  author = 'Aisuruneko';
  aliases = [];
  syntax = [];
  permissions = 0;
  cooldown = 2;
  guildOnly = false;
  hidden = false;

  execute = async (app: App, lang: Language, interaction: CommandInteraction) => {
    try {
      const shard = app.client.shard!;
      const results = await shard.broadcastEval((client: Client) => [client.shard!.ids, client.ws.status, client.ws.ping, client.guilds.cache.size]);
      const eFields = results.map((data) => ({
        name: `Shard ${data[0]}/${shard.count}`,
        value:
            `📶 **${lang.translations['commands.ping.status']}**: ${lang.translations['commands.ping.statusTypes'][data[1] as number]}\n`
            + `🏓 **${lang.translations['commands.ping.ping']}**: ${data[2]}ms\n`
            + `🖥️ **${lang.translations['commands.ping.servers']}**: ${data[3]}\n`,
        inline: true
      }));

      const embed = {
        title: lang.translations['commands.ping.title'],
        description: `Shards: ${shard.count}\n`,
        color: app.config.system.embedColors.blue,
        fields: eFields,
        footer: { text: app.config.system.footerText }
      };
      const message = await interaction.followUp({ embeds: [embed] });
      embed.fields[0].value += `\n📝 **${lang.translations['commands.ping.latency']}**: ${(message.createdTimestamp - interaction.createdTimestamp)}ms\n`;
      message.edit({ embeds: [embed] });
    } catch (error: unknown) {
      console.error(error);
    };
  };
};
