const liveServer = require('live-server');
// eslint-disable-next-line no-undef
const player = require('play-sound')(opts = {})


player.play('./assets/rick-rolled.mp3',(err) =>{
  if (err) throw err
})

console.log("\nAslan est cringe !!!\n");

const params = {
  port: 8181, // Set the server port. Defaults to 8080.
  host: '0.0.0.0', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: './dist', // Set root directory that's being served. Defaults to cwd.
  open: true, // When false, it won't load your browser by default.
  file: 'index.html', // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
  mount: [['/components', './node_modules']], // Mount a directory to a route.
  logLevel: 1, // 0 = errors only, 1 = some, 2 = lots
};
liveServer.start(params);
