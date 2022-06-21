
const jwt=require('jsonwebtoken')
const {createUser, getUserInfo,updateById} = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')
const {JWT_SECRET}=require('../config/config.default')

class UserController{
    async register(ctx,next){
        //1.获取数据
        console.log(ctx.request.body);
        const{user_name,password}=ctx.request.body
        try{
            //2.操作数据库
            const res=await createUser(user_name,password)
            // console.log(res);
            //3.返回结果
            ctx.body={
                code:0,
                message:'用户注册成功',
                result:{
                    id:res.id,
                    user_name:res.user_name
                }
            }            
        }catch(err){
            console.log(err);
            ctx.app.emit('error', userRegisterError, ctx)
        }

    }

    async login(ctx,next){
        const {user_name}=ctx.request.body
        // ctx.body=`欢迎回来,${user_name}`

        //1获取用户信息
        try{
            const {password,...res}=await getUserInfo({user_name}) //剔除password
            ctx.body={
                code:0,
                message:'用户登录成功',
                result:{
                    token:jwt.sign(res,JWT_SECRET,{expiresIn:'1d'})
                }
            }
        }catch(err){
            console.error('用户登录失败',err);
        }
    }

    async changePassword(ctx,next){
        //1.获取数据
        const id=ctx.state.user.id
        const password=ctx.request.body.password
        // console.log(id,password);
        //2.操作数据库
        if(await updateById({id,password})){
            ctx.body = {
                code: 0,
                message: '修改密码成功',
                result: '',
              }
        }else {
            ctx.body = {
              code: '10007',
              message: '修改密码失败',
              result: '',
            }
          }
        
        //3.返回结果
    }

}

module.exports=new UserController()