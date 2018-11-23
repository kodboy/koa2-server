function m1(ctx) {
  global.console.log('my middleware `m1` output:m1m1m1m1m1m1m1m1')
}

module.exports = function () {
  return async function(ctx, next) {
    global.console.log('m1 start');
    m1(ctx)
    //next: 我执行完了,交给下一个中间件处理
    await next()
    global.console.log('m1 end');
  }
}