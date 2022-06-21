const Koa=require('koa')
const app=new Koa()
app.use((ctx,next)=>{
    ctx.message='aa'
    next();
    ctx.body=ctx.message
}).use((ctx,next)=>{
    ctx.message+='bb'
    next();
    
}).use((ctx,next)=>{
    ctx.message+='cc'
})

app.listen(3000,()=>{
    console.log('server is running on http:/localhost:3000');
})