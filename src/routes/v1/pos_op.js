const router = require('koa-router')()
//更新位置信息接口
const User=require('../../users/model.js')
const CONFIG=require('../../config.js')
router.post('/v1/update_pos', async (ctx,next)=>{ //just for test
    var test_user=new User(0,'test',CONFIG.expiration)
    var {position}=ctx.request.body
    if(position!=undefined) test_user.update_new_pos(position)
    ctx.body={
        code:0,
        msg:position==undefined?'fail':'success'
    }
    await next()
});
router.get('/v1/get_pos', async (ctx,next)=>{   //just for test
    var test_user=new User(0,'test1',CONFIG.expiration);
    var info=await test_user.get_position();
    ctx.body={
        code:0,
        msg:info==[]?'success':'fail',
        pos:info
    }
    await next();
})
module.exports = router