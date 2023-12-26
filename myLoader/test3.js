module.exports = function (content, map, meta) {
  // console.log("test3")

  // this.callback(null,content,map,meta); // 错误 内容 map meta
};
module.exports.pitch = function (content) {
  let b = content
    .split("!")
    .map((ab) => {
      return this.utils.contextify(
        this.context,
        ab
      );
    })
    .join("!");

  return `import style from "!!${b}";
       const s = document.createElement("style");
       s.innerHTML = style;
       document.head.appendChild(s)
    `;
};
