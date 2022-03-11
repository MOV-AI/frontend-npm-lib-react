const proxy = require("http-proxy-middleware");
const packageJson = require("../package.json");

module.exports = function expressMiddleware(router) {
  const proxyConfig = packageJson.proxy || {};

  for (let domain in proxyConfig) {
    router.use(domain, proxy.createProxyMiddleware(proxyConfig[domain]));
  }
};
