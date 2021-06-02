// require your server and launch it
const server = require('./api/server.js');

server.listen(4001, () => {
  console.log('Server Running on http://localhost:4001');
});
