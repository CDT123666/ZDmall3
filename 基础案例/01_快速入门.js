//1导入Koa包
const Koa=require('koa')
//2.实例化app对象
const app=new Koa()
//3.编写中间件
app.use((ctx)=>{
    ctx.body='hello koa222'
})
//4.启动服务,监听3000端口
app.listen(3000,()=>{
    console.log('server is running on http:/localhost:3000');
})