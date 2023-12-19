module.exports = function(content,map,meta) {
    console.log("test4")
  
    this.callback(null,content,map,meta); // 错误 内容 map meta
    
}
// module.exports.pitch= function(content,map,meta) {
//     console.log("pitch4")
// }