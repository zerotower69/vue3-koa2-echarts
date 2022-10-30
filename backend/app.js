//1.create koa object
const Koa = require('koa')
const app = new Koa();
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
//3.bing the port 8888
app.listen(8888, function () {
    consola.success('listen on 8888 successfully!')
})

const webSocketService = require('./service/web_socket_service')

webSocketService.listen()