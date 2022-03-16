const UserController = require('./controllers/userController');
const ConnectionController = require('./controllers/connectionController');

class socketManager{

  #io
  #espClientArray
  #webClientArray

  constructor(io){
    this.#io = io;

    this.#espClientArray = [];
    this.#webClientArray = [];
    
    this.#socketListener();
  }

  getSocket(){
    return this.#io;
  }

  // listeners
  #socketListener(){

    // connection made
    this.#io.on('connection', (socket) => {
      this.#connectClient(socket);
    
      socket.on('disconnect', () => {
        console.log(socket.id, 'client has disconnected, removing from list.');
      });
    
    });

  }

  getConnected(){
    return this.#io.sockets.connected;
  }

  // client registration
  sendClientInfo(){
    this.#webClientArray.map((webClient) => {
      try{
        webClient.emit('web_event', 
          {
            "type": "client_info",
            "data": {
              "esp_clients": this.#espClientArray,
              "web_clients": this.#webClientArray
            }
          }
        );
      }catch(error){
        console.log(`failed to send socket to ${webClient.socketId}`, error);
      }
    });
  }
  
  #connectClient(socket){
    console.log(socket.id, 'new client connected, getting client information.');
    socket.emit("event", "get_name");
  
    socket.on('identifier', (data) => {
      if(data !== "web_client"){
        this.#espClientArray.push(new Client(this, socket, data));
        this.sendClientInfo();
      }else{
        this.#webClientArray.push(new Client(this, socket, {"espId": "web_client", "version": 1}));
      }
  
      console.log("espClientArray", this.#espClientArray);
      console.log("webClientArray", this.#webClientArray);
    });
  
  }

  deleteClient(client){

  }

}

module.exports = socketManager;