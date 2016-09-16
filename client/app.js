(function(){
  angular
    .module('app', [])
    .controller('ChatController', ChatController);

    function ChatController($scope){
      var curSocket = null;
      $scope.createSocket = createSocket;
      $scope.closeSocket = closeSocket;

      function createSocket(){
        console.log("creating conn: " );
        curSocket = io()
        console.log(curSocket);
      }

      function closeSocket(){
        console.log("closing conn: ");
        var msg = curSocket.disconnect()
        console.log(msg);
      }

    }

})()
