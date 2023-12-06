function randomSortArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
let b = true;
while (true) {
  // 初始化球
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80];
  let i = 0;
  let num = 1;
  let res = [];
  const current = Date.now();
  while (i < 1000 * 10 * 20 + 200) {
    i = Date.now() - current;
    if (i / (1000 * 10) > num) {
      let _ = Math.ceil(a.length / 2);
      res.push(a[_]);
      if (res.length==20) {
        break;
      }
      a.splice(_, 1);
      num++;
    } else {
      randomSortArray(a);
    }
  }
  res.sort((l,j)=>l-j)
  let str = res.join(",");
  console.log("选号",str)
  if (b && str == "1,3,5,7,10,22,28,30,38,40,46,50,52,53,56,58,62,69,71,80") {
    b = false;
  } else if (!b) {
    console.log("快乐8出号拉", res);
    break;
  }
}
