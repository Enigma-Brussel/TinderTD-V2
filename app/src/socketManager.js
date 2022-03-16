const UserController = require('./controllers/userController');
const ConnectionController = require('./controllers/connectionController');

class socketManager{

  #io
  #clientArray;

  constructor(io){
    this.#io = io;
    this.#clientArray = [];
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
  
  #connectClient(socket){
    console.log(socket.id, 'new client connected, getting client information.');
    socket.emit("init", "get-data");
  
    socket.on('init', (data) => {

      console.log(data);

      // if(data !== "web_client"){
      //   this.#espClientArray.push(new Client(this, socket, data));
      //   this.sendClientInfo();
      // }else{
      //   this.#webClientArray.push(new Client(this, socket, {"espId": "web_client", "version": 1}));
      // }
  
      // console.log("espClientArray", this.#espClientArray);
      // console.log("webClientArray", this.#webClientArray);
    });
  
  }

  deleteClient(client){

  }

}

module.exports = socketManager;