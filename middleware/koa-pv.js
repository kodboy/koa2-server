function pv(ctx) {
  global.console.log('my middleware `pv` output:')
  global.console.log('pvvvv:' + ctx.path);
}

module.exports = function () {
  return async function(ctx, next) {
    pv(ctx)
    //next: 我执行完了,交给下一个中间件处理
    await next()
  }
}