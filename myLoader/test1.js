/** 异步
 * content: 内容
 * map: 跟soureMap相关
 * meta: 其他loader的参数
 */
module.exports = function(content,map,meta) {
    console.log("test1")
    let callback = this.async();
    queueMicrotask(()=>{
        console.log("test2")
        callback(null,content,map,meta);
    })
}