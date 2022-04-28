module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'discordjs',
        categoria: '🕰️ • Utilidades',
        desc: 'Veja alguma coisa na documentação do discord.js'
      },
      en: {
        nome: 'discordjs',
        categoria: '🕰️ • Utility',
        desc: 'See something in the discord.js documentation'
      },
      aliases: ['discord.js', 'djs'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`❌ ${ctx.message.author.mention} **|** ${ctx.idioma.mal.term}`)
    const { get } = require('axios')
    await get(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURI(ctx.args.join(' '))}`).then(response => {
      const res = response.data
      const embed = new global.star.manager.Ebl()
      embed.title('Discord.js Docs')
      embed.color('#dd3af0')
      embed.thumbnail(global.star.user.avatarURL)
      if (!res.fields) {
        embed.description(`${res.description}`)
        ctx.send(embed.create)
      } else {
        res.fields.forEach(resu => {
          if (resu.value.includes('View source')) return
          embed.description(`>>> 📘 ${res.description}`)
          embed.field(resu.name, resu.value)
        })
        ctx.send(embed.create)
      }
    })
  }
}

// ADG, Davi e LRD
