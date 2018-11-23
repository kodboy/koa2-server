const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// 我的中间件
const pv = require('./middleware/koa-pv')
const m1 = require('./middleware/m1')
const m3 = require('./middleware/m3')
const m2 = require('./middleware/m2')


const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// use的先后顺序, 决定了洋葱模型的 从外到内的顺序

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(pv())
app.use(m1())
app.use(m2())
app.use(m3())


app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
