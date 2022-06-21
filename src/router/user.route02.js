

const Router=require('koa-router')
const router=new Router({prefix:'/users'})
const first=new Router()
//编写路由规则

const db=[
    {id:1,name:'xiaoming',age:20},
    {id:2,name:'xiaohong',age:18},
    {id:3,name:'xiaodong',age:30}
]


first.get('/',(ctx)=>{
    ctx.body='首页'
})

router.get('/',(ctx)=>{
    ctx.body=db
})
//GET /users/:id ---- 根据id获取对象
router.get('/:id',(ctx)=>{
    //解析id参数
    const id =ctx.params.id
    const res=db.filter(item=>item.id=id)
    ctx.body=res[0]
})


router.post('/',(ctx)=>{
    ctx.body='创建用户'
})


module.exports=router