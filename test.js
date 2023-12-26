const fs = require("fs");
function countAndSort(numbers) {
  var count = {};

  // 统计数字出现的次数
  for (var i = 0; i < numbers.length; i++) {
    var num = Number(numbers[i].trim());
    if (num==0) {
        continue
    }
    count[num] = count[num] ? count[num] + 1 : 1;
  }

  // 将统计结果转换为数组
  var result = [];
  for (var num in count) {
    result.push({ number: num, count: count[num] });
  }

  // 根据出现次数进行排序
  result.sort(function (a, b) {
    return b.count - a.count;
  });
   
  return result.map(res=>res.number);
}

fs.readFile("./mac.txt", (err, data) => {
  const res = data.toString().split("\n");
  let arr=[];
  for (const row of res) {
      arr.push(...row.split(/\s+|,/))
  }
  const sortedResult = countAndSort(arr);
  console.log(sortedResult);
});
