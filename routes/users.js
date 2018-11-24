const router = require('koa-router')()
import Person from '../dbs/models/Person'

const Redis = require('koa-redis')

const store = new Redis().client

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/fix', async (ctx) => {
  const st = await store.hset('fix','name',Math.random())
  ctx.body = {
    code: 0
  }
})

router.post('/addPerson', async ctx => {
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })
  let code
  let msg
  try {
    // mongoose的model中已定义好了`save`方法
    await  person.save()
    code = 0
    msg = '保存成功'
  } catch (e) {
    code = -1
    msg = "保存失败"
  }
  ctx.body = {
    code,
    msg
  }
})

router.post('/getPerson', async ctx => {
  const result = await Person.findOne({ age: ctx.request.body.age })
  const results = await Person.find({ age: ctx.request.body.age })
  ctx.body = {
    code: 0,
    result,
    results
  }
})

router.post('/updatePerson', async ctx => {
  const result = await Person.where({
    name: ctx.request.body.name
  }).update({
    age: ctx.request.body.age
  })
  ctx.body = {
    code: 0,
    msg: '修改成功'
  }
})

router.post('/removePerson', async ctx => {
  const result = await Person.where({
    name: ctx.request.body.name
  }).remove
  ctx.body = {
    code: 0,
    msg: '删除成功'
  }
})

module.exports = router
