const Koa=require('koa')
const app=new Koa()
app.use((ctx,next)=>{
    console.log(1);
    next();
    console.log(2);
}).use((ctx,next)=>{
    console.log(3);
    next();
    console.log(4);
}).use((ctx,next)=>{
    console.log(5);
    ctx.body='组装完成'
})

app.listen(3000,()=>{
    console.log('server is running on http:/localhost:3000');
})