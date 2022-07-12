/*
  TheCodingBot v6
  https://tcb.nekos.tech
*/

module.exports = {
  name: 'ping',
  description: 'Status for TheCodingBot.',
  author: ['Aisuruneko'],

  execute: async (app, interaction) => {
    const eFields = [];

    await app.client.shard.broadcastEval(client => [client.shard.ids, client.ws.status, client.ws.ping, client.guilds.cache.size]).then((results) => {
      results.map((data) => {
        eFields.push(
          {
            name: `Shard ${data[0]}/${app.client.shard.count}`,
            value:
            `📶 **${app.lang.get(interaction.userInfo.preferredLanguage, 'commands.ping.status')}**: ${app.lang.get(interaction.userInfo.preferredLanguage, 'commands.ping.statusTypes')[data[1]]}\n`
            + `🏓 **${app.lang.get(interaction.userInfo.preferredLanguage, 'commands.ping.ping')}**: ${data[2]}ms\n`
            + `🖥️ **${app.lang.get(interaction.userInfo.preferredLanguage, 'commands.ping.servers')}**: ${data[3]}\n`,
            inline: true
          }
        );
      });

      interaction.followUp({
        embeds: [{
          title: app.lang.get(interaction.userInfo.preferredLanguage, 'commands.ping.title'),
          description: `Shards: ${app.client.shard.count}\n`,
          color: app.config.system.embedColors.blue,
          fields: eFields,
          footer: { text: app.config.system.footerText }
        }]
      }).then(message => {
        const newEmbeds = message.embeds;
        newEmbeds[0].fields[0].value += `\n📝 **${app.lang.get(interaction.userInfo.preferredLanguage, 'commands.ping.latency')}**: ${(message.createdTimestamp - interaction.createdTimestamp)}ms\n`;
        interaction.editReply({ embeds: newEmbeds });
      });
    }).catch((error) => {
      console.error(error);
    });
  }
};
