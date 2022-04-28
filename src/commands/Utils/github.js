module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'github',
        categoria: '🕰️ • Utilidades',
        desc: 'Faça o bot falar'
      },
      en: {
        nome: 'github',
        categoria: '🕰️ • Utility',
        desc: 'The bot say'
      },
      aliases: ['git', 'gh'],
      run: this.run
    }
  }

  async run (ctx) {
    const { get } = require('axios')
    await get(`https://api.github.com/users/${encodeURI(ctx.args.join(' '))}`).then(response => {
      const git = response.data
      const embed = new global.star.manager.Ebl()
      embed.title(`<:st_github:930501194063945728> Github | ${git.login} ${git.site_admin ? '<:st_bots_certified:830834935605624867>' : '<:st_bots_notcertified:830834979726426243>'}`)
      embed.url(git.html_url)
      embed.field('📋 Name:', `\`\`\`${git.name || git.login}\`\`\``)
      embed.field('📚 Bio:', `\`\`\`md\n${git.bio || 'User does not have a biography.'}\`\`\``)
      embed.field('<:ES_membros:815580090225262632> Social:', `\`\`\`md\n# Followers: ${git.followers}\n# Following: ${git.following}\`\`\``)
      embed.color('#dd3af0')
      embed.thumbnail(git.avatar_url || global.star.user.avatarURL)
      ctx.send(embed.create)
    })
  }
}

// ADG, Davi e LRD
