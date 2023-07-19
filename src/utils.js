class Utils{
    /**
     * Get the current Beijing time.
     *
     * @return {Date} The current Beijing time.
     */
    static get_bj_time(){//获取北京时间
        return new Date(new Date().getTime()+1000*60*60*8)
    }
}
module.exports=Utils