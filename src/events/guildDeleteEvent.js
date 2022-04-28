module.exports = class GuildDelete {
  constructor () {
    return {
      nome: 'guildDelete',
      run: this.run
    }
  }

  async run (guild) {
    const system = require('../config/system')
    const ch = await global.star.getRESTChannel('930489944969994240')
    ch.edit({
      name: `🧭 → Servers [${global.star.guilds.size}]`
    })

    const moment = require('moment')
    const owner = await global.star.getRESTUser(guild.ownerID)

    await global.star.executeWebhook(system.gdelete.id, system.gdelete.token, {
      avatarURL: global.star.user.avatarURL,
      username: global.star.user.username,
      embeds: [{
        color: 14498544,
        title: `<:zu_info:911303533859590144> GuildDelete | ${global.star.user.username}`,
        description: '😔 Fui removida de um servidor!',
        fields: [
          {
            name: `<:st_website:830841154203025439> GuildInfo | ${guild.name}`,
            value: `🧭 **ID:** \`${guild.id} [${guild.shard.id}]\`\n<:st_owner:847812042467573761> **Owner:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\n<:ES_membros:815580090225262632> **Members:** \`${guild.memberCount} members\`\n<a:st_booster:830837674104979488> **Boosts:** \`${guild.premiumSubscriptionCount} boosts\`\n:calendar: **Created at:** \`${moment(guild.createdAt).format('📆 DD/MM/YY')} | ${moment(guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Region:** \`${guild.region}\``
          }
        ]
      }]
    })
  }
}
