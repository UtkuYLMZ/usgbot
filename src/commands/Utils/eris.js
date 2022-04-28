module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'eris',
        categoria: '🕰️ • Utilidades',
        desc: 'Veja alguma coisa na documentação do eris'
      },
      en: {
        nome: 'eris',
        categoria: '🕰️ • Utility',
        desc: 'See something in the eris documentation'
      },
      aliases: ['eris.js', 'erisjs'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`❌ ${ctx.message.author.mention} **|** ${ctx.idioma.mal.term}`)
    const { get } = require('axios')
    await get(`https://eris-docs-api.herokuapp.com/?query=${encodeURI(ctx.args.join(' '))}`).then(response => {
      const res = response.data
      const embed = new global.star.manager.Ebl()
      embed.title('Eris Docs')
      embed.color('#dd3af0')
      embed.thumbnail(global.star.user.avatarURL)
      if (!res.embed.fields) {
        embed.description(`>>> 📘 ${res.embed.description}`)
        ctx.send(embed.create)
      } else {
        res.embed.fields.forEach(resu => {
          embed.description(`>>> 📘 ${res.embed.description}`)
          embed.field(resu.name, resu.value)
        })
        ctx.send(embed.create)
      }
    })
  }
}

// ADG, Davi e LRD
