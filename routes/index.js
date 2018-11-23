const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.cookies.set('pvid', Math.random())
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/cookie', async (ctx, next) => {
  let cookie = ctx.cookies.get('pvid')
  ctx.body = 'cookie is: ' + cookie
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/testAsync', async (ctx) => {
  global.console.log('start', new Date().getTime())
  ctx.body = {
    title: 'testAsync'
  }
})

module.exports = router
