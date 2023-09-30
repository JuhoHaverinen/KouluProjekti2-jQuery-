const app = require('./projekti2.js')

let port = 3007;
let hostname = "127.0.0.1";

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`); //--------->
});
