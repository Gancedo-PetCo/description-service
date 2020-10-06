const app = require('./server.js');
const PORT = process.env.PORT || 3002;
app.listen(3002, () => {
  console.log(`server is listening on port ${PORT}`);
});
