

const {APP_POST}=require('./config/config.default')

const app=require('./app')

//跨域

//4.启动服务,监听3000端口
app.listen(APP_POST,()=>{
    console.log(`server is running on http://localhost:${APP_POST}`);
})