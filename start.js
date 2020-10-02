const app = require('./server.js');
const PORT = process.env.PORT || 3006;
app.listen(3006, () => {
  console.log(`server is listening on port ${PORT}`);
});
