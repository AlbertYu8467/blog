const http = require('http')
const PORT = 8000
const serverHandle = require("../app")
const app = http.createServer(serverHandle)
app.listen(PORT, () => {
  console.log('port 8000 is listening')
})