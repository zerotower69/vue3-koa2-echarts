const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const consola = require('consola')
//2.编写响应函数（中间件） middleware
//总耗时 middleware
const respDurationMiddleware = require('./middleware/koa_response_duration');
app.use(respDurationMiddleware);
//响应头 middleware
const respHeaderMiddleware = require('./middleware/koa_response_header');
app.use(respHeaderMiddleware)
//业务逻辑 middleware
const respDataMidlleware = require('./middleware/koa_response_data');
app.use(respDataMidlleware)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
