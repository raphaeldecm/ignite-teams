module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      ["module-resolver", {
        "root": ["./src"],
        "alias": {
          "test": "./test",
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@storage": "./src/storage",
          "@utils": "./src/utils",
          "@constants": "./src/constants",
          "@hooks": "./src/hooks",
          "@navigation": "./src/navigation",
        }
      }]
    ]
  };
};
