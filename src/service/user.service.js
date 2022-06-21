const User=require('../model/use.model')

//service主要用来操控数据库
class UserService{
  //创建用户
  async createUser(user_name,password){
      //todo:写入数据库
      const res = await User.create({user_name,password})
      // console.log('数据对象',res);
      // console.log(aaa);

      return res.dataValues
  }
  //获取用户信息
  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {}

    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],//要查询的字段
      where: whereOpt,
    })
    // console.log(res);
    return res ? res.dataValues : null
  }
  
  async updateById({ id, user_name, password, is_admin }) {
    const whereOpt = { id }
    const newUser = {}

    user_name && Object.assign(newUser, { user_name })
    password && Object.assign(newUser, { password })
    is_admin && Object.assign(newUser, { is_admin })

    const res = await User.update(newUser, { where: whereOpt })
    // console.log(res)
    return res[0] > 0 ? true : false
  }  
}

module.exports=new UserService()