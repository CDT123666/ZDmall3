const {Sequelize}=require('sequelize')  //连接数据库的工具

const {MYSQL_HOST,
    MYSQL_POST,
    MYSQL_USER,
    MYSQL_PWD ,
    MYSQL_DN}=require('../config/config.default')

const seq=new Sequelize(MYSQL_DN,MYSQL_USER,MYSQL_PWD,{
    host:MYSQL_HOST,
    dialect:'mysql'
})


seq.authenticate().then(()=>{
    console.log('数据库连接成功');
}).catch(err=>{
    console.log('数据库连接失败:',err);
})
module.exports=seq