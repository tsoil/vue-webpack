/** 同步
 * content: 内容
 * map: 跟soureMap相关
 * meta: 其他loader的参数
 */
module.exports = function(content,map,meta) {
//     console.log("test")
    const regex = /console\.log\(.*?\);?/g;
//    // 将所有的console.log语句替换为注释
   const result = content.replace(regex, '');
  
    this.callback(null,result,map,meta); // 错误 内容 map meta
    
}