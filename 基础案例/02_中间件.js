const Koa=require('koa')
const app=new Koa()
app.use((ctx,next)=>{
    console.log('我来组成头部');
    next();

}).use((ctx,next)=>{
    console.log('我来组成身体');
    next();
    ctx.body='身体组装'
}).use((ctx,next)=>{
    console.log('组装完成');
    ctx.body='组装完成'
})


app.listen(3000,()=>{
    console.log('server is running on http:/localhost:3000');
})
