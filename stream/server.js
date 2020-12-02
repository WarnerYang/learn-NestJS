const http = require("http");
const redis = require("redis");
const client = redis.createClient();

http.createServer(function (req, res) {
  const fileName = "." + req.url;
  if (fileName === "./stream") {
    res.writeHead(200, {
      "Content-Type":"text/event-stream",
      "Cache-Control":"no-cache",
      "Connection":"keep-alive",
      "Access-Control-Allow-Origin": '*',
    });
    res.write("retry: 10000\n");
    res.write("event: connecttime\n");
    res.write("data: " + (new Date()) + "\n\n");
    res.write("data: " + (new Date()) + "\n\n");

    client.subscribe("testch", redis.print);
    client.on("message", (channel, message) => {
      console.log('redis subscribe response:', channel, message);
      res.write("data: " + message + "\n\n"); // push
    });
    client.on("error", function(error) {
      console.log("redis error:", error);
    });
    // interval = setInterval(function () {
    //   res.write("data: " + (new Date()) + "\n\n");
    // }, 1000);

    req.connection.addListener("close", function () {
      console.log('SSE closed.');
    //   clearInterval(interval);
    }, false);
  }
}).listen(8844, "127.0.0.1");