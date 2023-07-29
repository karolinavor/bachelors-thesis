const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:62158';

const context = [
  "/swagger",
  "/api/course",
  "/api/courses",
  "/api/course/comments",
  "/api/courses/latest",
  "/api/comments/latest",
  "/api/file",
  "/api/files/latest",
  "/api/news",
  "/api/news/all",
  "/api/user",
  "/api/notifications/add",
  "/api/notifications/get",
  "/api/log",
  "/api/log/add"
];

const onError = (err, req, resp, target) => {
  console.error(`${err.message}`);
}

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    // Handle errors to prevent the proxy middleware from crashing when
    // the ASP NET Core webserver is unavailable
    onError: onError,
    secure: false,
    // Uncomment this line to add support for proxying websockets
    //ws: true, 
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};
