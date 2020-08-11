module.exports = {
    warn(msg){
        console.warn('[WARM]'+msg)
    },
    error(err,msg) {
        console.error('[ERROR]'+msg,err)
    },
    info(msg){
        console.info('[INFO]'+msg)
    }
}
