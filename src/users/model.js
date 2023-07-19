const fs=require('fs')
const Utils=require('../utils.js')
class User{
    constructor(id,token,pos_expiration_time){
    this.id=id
    this.token=token
    this.time_expire=pos_expiration_time
    this.config=JSON.parse(String(fs.readFileSync(__dirname+`/position/${id}`)))
    }
    /**
     * Updates the position to the corresponding file.
     *
     * @param {any} position - the updated position
     * @param {any} time_expire - the expiration time
     * @return {Promise<void>}
     */
    async update_new_pos(position){ //更新位置到对应文件中
        //test
        var new_position={
            time:Utils.get_bj_time(),
            position
        }
        this.config.unshift(new_position)
        this.update_pos_info();
        console.log(new_position)
    }
    async get_position(){
        this.update_pos_info();
        return this.config
    }
    update_pos_info(){
        // 遍历删除config中时间超过timeexpire的位置
        for(var i=0;i<this.config.length;i++){
            if(Utils.get_bj_time().getTime()-new Date(this.config[i].time)>this.time_expire*1000*60){
                this.config.splice(i,1)
            }
        }
        fs.writeFileSync(__dirname+`/position/${this.id}`,JSON.stringify(this.config))
    }
}
module.exports=User