const Koa=require('koa')
const app=new Koa()
app.use(async (ctx,next)=>{
    ctx.message='aa'
    await next();
    ctx.body=ctx.message
}).use(async (ctx,next)=>{
    ctx.message+='bb'
    await next();
    
}).use(async (ctx,next)=>{
    const res=await Promise.resolve('cc')
    ctx.message+=res
})

app.listen(3000,()=>{
    console.log('server is running on http:/localhost:3000');
})