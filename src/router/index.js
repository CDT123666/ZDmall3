const fs=require('fs')

const Router = require('koa-router')
const router = new Router()
//读取当前文件夹下的所有js文件(除了index.js)
fs.readdirSync(__dirname).forEach(file => {
  // console.log(file)
  if (file !== 'index.js') {
    let r = require('./' + file)
    router.use(r.routes())
  }
})

module.exports = router