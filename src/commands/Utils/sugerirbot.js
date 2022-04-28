module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'sugbot',
        categoria: '🕰️ • Utilidades',
        desc: 'Faça uma sugestão de sistemas ou ideias para o bot'
      },
      en: {
        nome: 'sugbot',
        categoria: '🕰️ • Utility',
        desc: 'Suggest systems or ideas for the bot'
      },
      aliases: ['sugerir', 'sugestao', 'sugestão', 'sugest', 'sug', 'sugerirbot'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.sugestao.nada}`)
    const channel = await global.star.getRESTChannel('930489979409403934')
    const embed = new global.star.manager.Ebl()
    embed.title('💡 Nova Sugestão')
    embed.description(ctx.args.join(' '))
    embed.color('#dd3af0')
    embed.thumbnail(ctx.message.author.avatarURL || global.star.user.avatarURL)
    embed.footer(`💡 Sugestão enviada por: ${ctx.message.author.username}#${ctx.message.author.discriminator}`)
    channel.createMessage(embed.create).then(msg => {
      msg.addReaction('👍')
      msg.addReaction('👎')
      ctx.message.addReaction('✅')
    })
  }
}

// ADG, Davi e LRD
