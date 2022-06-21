
const path = require('path')
//1导入Koa包
const Koa=require('koa')
const KoaBody=require('koa-body')   
const KoaStatic=require('koa-static')
const parameter = require('koa-parameter')

const errHandler = require('./errHandler')

//导入路由
// const userRoute=require('../router/user.route')
// const goodsRoute=require('../router/goods.route')
const router=require('../router')
//2.实例化app对象
const app=new Koa()

const cors=require('koa2-cors')
//处理跨域问题
app.use(cors())
// app.use (('*', function(req, res, next) {
//   　　　res.header("Access-Control-Allow-Origin", "*");
//              res.header("Access-Control-Allow-Headers", "X-Requested-With");
//              res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//              res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//              res.header("X-Powered-By",' 3.2.1')
//              res.header("Content-Type", "application/json;charset=utf-8");
//              next();
//              }));


app.use(KoaBody({
    multipart: true,    //若为true,则不支持文件上传
    formidable: {
      // 在配制选项option里, 不推荐使用相对路径
      // 在option里的相对路径, 不是相对的当前文件. 相对process.cwd()
      uploadDir: path.join(__dirname, '../upload'),   //请求的文件保存路径
      keepExtensions: true,
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],  //设置请求类型
  }))
app.use(KoaStatic(path.join(__dirname, '../upload')))   //使得图片可以在网页上显示
app.use(parameter(app))   //参数校验插件

// app.use(userRoute.routes())
// app.use(goodsRoute.routes())
app.use(router.routes()).use(router.allowedMethods())




// 统一的错误处理
app.on('error', errHandler)

module.exports=app