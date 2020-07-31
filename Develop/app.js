const http = require("http");
const port = 8000;

function handlerequest(request, response){
    response.end("Something something " + request.url);
}
const server = http.createServer(handlerequest);

server.listen(port,function(){
    console.group("Server listening on: http://localhost:" + port);
});