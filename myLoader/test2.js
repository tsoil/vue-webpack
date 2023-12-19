// content Buffer 可同步异步
module.exports = function(content,map,meta) {
    console.log("test2")
    this.callback(null,content,map,meta); // 错误 内容 map meta
    
}
module.exports.raw = true;