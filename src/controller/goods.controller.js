const path = require('path')
const {
  fileUploadError,
  unSupportedFileType,
  publishGoodsError,
  invalidGoodsID
}=require('../constant/err.type')

const{createGoods,updateGoods,removeGoods,restoreGoods,findGoods}=require('../service/goods.service')

class GoodsController{
//上传图片
    async upload(ctx,next){
        // console.log(ctx.request.files.file)
        const  PersistentFile  = ctx.request.files.file
        // console.log(PersistentFile)
        const fileTypes = ['image/jpeg', 'image/png']
        if (PersistentFile) {
          if (!fileTypes.includes(PersistentFile.mimetype)) {
            return ctx.app.emit('error', unSupportedFileType, ctx)
          }
          ctx.body = {
            code: 0,
            message: '商品图片上传成功',
            result: {
              goods_img: path.basename(PersistentFile.filepath),
            },
          }
        } else {
          return ctx.app.emit('error', fileUploadError, ctx)
        }
    }
// 发布商品
    async create(ctx){
      //直接调用serviced createGoods方法
      try{
        const {createdAt,updatedAt,...res} = await createGoods(ctx.request.body)

        ctx.body = {
          code: 0,
          message: '发布商品成功',
          result: res,
        }
      }catch(err){
        console.log(err);
        return ctx.app.emit('error',publishGoodsError, ctx)
      }
    }
//更新商品信息
    async update(ctx){
      try{
        const res = await updateGoods(ctx.params.id, ctx.request.body)

        if (res) {
          ctx.body = {
            code: 0,
            message: '修改商品成功',
            result: '',
          }
        } else {
          return ctx.app.emit('error', invalidGoodsID, ctx)
        }

      }catch(err){
        console.log(err);
      }
    }
//下架
    async remove(ctx) {
      const res = await removeGoods(ctx.params.id)
  
      if (res) {
        ctx.body = {
          code: 0,
          message: '下架商品成功',
          result: '',
        }
      } else {
        return ctx.app.emit('error', invalidGoodsID, ctx)
      }
    }
//上架
    async restore(ctx) {
      const res = await restoreGoods(ctx.params.id)
      if (res) {
        ctx.body = {
          code: 0,
          message: '上架商品成功',
          result: '',
        }
      } else {
        return ctx.app.emit('error', invalidGoodsID, ctx)
      }
    }

    async findAll(ctx) {
      // 1. 解析pageNum和pageSize
      const { pageNum = 1, pageSize = 10 } = ctx.request.query//query是get请求里的参数
      // 2. 调用数据处理的相关方法
      const res = await findGoods(pageNum, pageSize)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        message: '获取商品列表成功',
        result: res,
      }
    }
}

module.exports=new GoodsController()