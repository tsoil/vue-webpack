module.exports = class TestPugin {
  constructor(options = {}) {
    this.options = options;
    console.log("TestPugin start");
  }
  apply(compiler) {
    compiler.hooks.emit.tap("TestPugin",(compilation) => {
      
      const extensions = ["js", "css"];
      const assetPaths = Object.keys(compilation.assets).filter((path) => {
        const splitted = path.split(".");
        return extensions.includes(splitted[splitted.length - 1]);
      });

      assetPaths.forEach((assetPath) => {
        const asset = compilation.assets[assetPath];
        const source = `/*
        * Author: ${this.options.author}
        */\n${asset.source()}`;

        // 覆盖资源
        compilation.assets[assetPath] = {
          // 资源内容
          source() {
            return source;
          },
          // 资源大小
          size() {
            return source.length;
          },
        };
      });
    });
    console.log("TestPugin compiler");
  }
};
