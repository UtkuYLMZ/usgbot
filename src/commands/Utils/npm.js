module.exports = class NpmCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'npm',
        categoria: 'ð°ï¸ â¢ Utilidades',
        desc: 'Procura um package no npm'
      },
      en: {
        nome: 'npm',
        categoria: 'ð°ï¸ â¢ Utility',
        desc: 'Search a package in npm'
      },
      aliases: ['node', 'npmjs', 'package'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`â ${ctx.message.author.mention} **|** ${ctx.idioma.mal.term}`)
    const { get } = require('axios')
    await get(`https://api.tovade.xyz/v1/info/npm?package=${encodeURI(ctx.args.join(' '))}`).then(response => {
      const res = response.data
      const embed = new global.star.manager.Ebl()
      embed.title(`${ctx.args.join(' ').toLowerCase()} [ v${res.version} ]`)
      embed.description(res.description)
      embed.field(`ð ${ctx.idioma.npm.licenÃ§a}`, res.license)
      embed.field(`ð ${ctx.idioma.npm.dono}`, res.author)
      embed.field(`ð ${ctx.idioma.npm.contri}`, res.maintainers)
      embed.field('<:st_github:930501194063945728> Source', res.repository)
      embed.thumbnail(global.star.user.avatarURL)
      embed.color('#dd3af0')
      ctx.send(embed.create)
    })
  }
}
