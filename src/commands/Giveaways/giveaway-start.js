module.exports = class GivawayStart {
  constructor () {
    return {
      permissoes: {
        membro: ['manageGuild'], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'giveaway-start',
        categoria: '🎁 • Giveaway',
        desc: 'Inicia um sorteio'
      },
      en: {
        nome: 'giveaway-start',
        categoria: '🎁 • Giveaway',
        desc: 'Start a giveaway'
      },
      aliases: ['gstart', 'gsetup', 'sorteio-start', 'sorteio-iniciar'],
      run: this.run
    }
  }

  async run (ctx) {
    const ms = require('ms')
    if (!ctx.args[0] || !ctx.args[1] || !ctx.args[2]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.giveaway.start.replace('%p', ctx.prefix)}`)
    global.star.giveawaysManager.start(ctx.message.channel, {
      time: ms(ctx.args[0]),
      winnerCount: parseInt(ctx.args[1]),
      prize: ctx.args.slice(2).join(' '),
      messages: {
        inviteToParticipate: ctx.idioma.giveaway.addReaction,
        timeRemaining: `${ctx.idioma.giveaway.restante} **{duration}**`,
        winMessage: '🎁 ' + ctx.idioma.giveaway.wins,
        noWinner: ctx.idioma.giveaway.no,
        winners: ctx.idioma.giveaway.win,
        endedAt: ctx.idioma.giveaway.term,
        hostedBy: ctx.idioma.giveaway.host,
        units: {
          seconds: ctx.idioma.giveaway.sec,
          minutes: ctx.idioma.giveaway.min,
          hours: ctx.idioma.giveaway.hrs,
          days: ctx.idioma.giveaway.day
        }
      }
    })
  }
}
