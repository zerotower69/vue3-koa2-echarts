/**
 * 1.第一层中间件
 * 2.计算执行时间
 *  一进入时记录开始时间
 *  其他所有中间件执行完后记录结束时间
 *  两者相减
 * 3.设置响应头 X-Response-Time:5ms
 */

module.exports = async (ctx, next) => {
    //记录开始时间
    const start = Date.now();
    //让内层中间件得以执行
    await next()
    //记录结束时间
    const end = Date.now();
    const duration = end - start;
    // ctx.set('Access-Control-Expose-Headers', 'X-Response-Time')
    //设置响应头： X-Response-Time
    ctx.set('X-Response-Time', duration + 'ms')
}