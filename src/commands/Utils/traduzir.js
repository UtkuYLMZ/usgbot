module.exports = class TradutorCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'tradutor',
        categoria: '🕰️ • Utilidades',
        desc: 'Traduza frases e palavras usando esse comando'
      },
      en: {
        nome: 'translator',
        categoria: '🕰️ • Utility',
        desc: 'Translate phrases and words using this command'
      },
      aliases: ['translator', 'traduzir'],
      run: this.run
    }
  }

  async run (ctx) {
    const { get } = require('axios')
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.tradutor.text.replace('%', ctx.prefix)}`)
    if (!ctx.args[1]) {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.tradutor.text.replace('%', ctx.prefix)}`)
    }
    const regex = /[!*();,:@&=+$.\\/?%#[\]]/g
    const lang = ctx.args[0]
    const msg = ctx.args.slice(1).join(' ').replace(regex, '')
    await get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&ie=UTF-8&oe=UTF-8&q=${encodeURI(msg)}`).then(response => {
      const res = response.data
      const body = res[0][0][0]
      const trans = body
      ctx.send(`🌎 ${ctx.message.author.mention} **|** ` + '`' + trans.replace(/`/g, '').replace(/@/g, '') + '`')
    })
  }
}
