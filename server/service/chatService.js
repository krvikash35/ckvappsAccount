module.exports = ChatService;

function ChatService(io){


  io.on('connection', function(ws){
    console.log("connected");

    ws.on('disconnect', function(msg){
      console.log("disconnected");
    })

  })

  io.on('disconnect', function(msg){
    console.log("disconnected");
  })

}
