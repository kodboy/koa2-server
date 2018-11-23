function m3(ctx) {
  global.console.log('my middleware `m3` output:m3m3m3m3m3m3')
}

module.exports = function () {
  return async function(ctx, next) {
    global.console.log('m3 start');
    m3(ctx)
    //next: 我执行完了,交给下一个中间件处理
    await next()
    global.console.log('m3 end');
  }
}