function m2(ctx) {
  global.console.log('my middleware `m2` output:m2m2m2m2m2m2m2')
}

module.exports = function () {
  return async function(ctx, next) {

    global.console.log('m2 start');
    m2(ctx)
    //next: 我执行完了,交给下一个中间件处理
    await next()
    global.console.log('m2 end');
  }
}