const http = require("http");
const websocketServer = require("websocket").server;
const httpServer = http.createServer();
httpServer.listen(process.env.PORT || 5000 , ()=> console.log("Server Listening on Port 5000")) //port number 



const wsServer = new websocketServer({
    "httpServer" : httpServer //upgrading http request to ws request
})

wsServer.on("request", request =>{
//This request variable contains all the information about request configuration done by the user.

const connection = request.accept(null, request.origin);
    connection.on("open", ()=> console.log("Connection Opened!"))
    connection.on("close", ()=> console.log("Connection Closed!"))
    connection.on("message", message => {
        var ms = message.utf8Data
        if(IsJsonString(ms))
        {
            connection.send("Hurray! You have sent a JSON message to the server 🎉🎉🎉🎉 Your code is : "+getRandomNumber(8) + "( Please copy this code and keep it handy. It will be required during the submission )")
           
            connection.close()
        }
        else{
            const errorMessage = {
                "Error" : "Invalid JSON found",
                "Description": "The message sent is not in proper JSON format, please try again. "
            };
                connection.send(JSON.stringify(errorMessage))
        }



    })
})

function getRandomNumber(digit) {
    return Math.random().toFixed(digit).split('.')[1];
}
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}