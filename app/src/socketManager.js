const UserController = require('./controllers/userController');
const ConnectionController = require('./controllers/connectionController');

class SocketManager{

  #io
  #clientArray;
  #chatRoomArray;

  constructor(io){
    this.#io = io;
    this.#clientArray = [];
    this.#chatRoomArray = [];
    this.#socketListener();
  }



  addClient(socketID, user){
    this.#clientArray.push({
      socketID: socketID,
      currentRoom: null,
      user: user
    });
    console.log('CLIENTS', this.#clientArray);
  }

  #getClient(socketID){
    let clientIndex = this.#clientArray.map((client) => {
      return client.socketID;
    }).indexOf(socketID);
    return this.#clientArray[clientIndex];
  }

  #removeClient(socketID){
    let removeIndex = this.#clientArray.map((client) => {
      return client.socketID;
    }).indexOf(socketID);
    if(removeIndex !== 1) this.#clientArray.splice(removeIndex, 1);
  }

  contributeChatroom(chatroomID, socketID){

    // check als de gebruiker bij de connectie behoord

    // ...

    let index = this.#chatRoomArray.map((chatRoom) => {
      return chatRoom.chatroomID;
    }).indexOf(chatroomID);

    if(index == -1){
      // room aanmaken
      this.#chatRoomArray.push({
        chatroomID: chatroomID,
        users: [socketID],
        messages: []
      })
    }else{
      // room joinen
      this.#chatRoomArray[index].users.push(socketID);
    }

    this.#getClient(socketID).chatroomID = chatroomID;

    console.log('ROOMS', this.#chatRoomArray);

  }

  #leaveChatroom(chatroomID, socketID){
    let chatRoomIndex = this.#chatRoomArray.map((chatRoom) => {
      return chatRoom.chatroomID;
    }).indexOf(chatroomID);

    if(this.#chatRoomArray[chatRoomIndex].users.lenght() = 1){
      if(chatRoomIndex !== -1) this.#chatRoomArray.splice(chatRoomIndex, 1);
    }else{
      let userIndex = this.#chatRoomArray[chatRoomIndex].users.map((user) => {
        return user;
      }).indexOf(socketID);
      if(userIndex !== -1) this.#chatRoomArray[chatRoomIndex].users.splice(userIndex, 1);
    }

    console.log('ROOMS', this.#chatRoomArray);
  }
  
  #connectClient(socket){
    console.log(socket.id, 'new client connected, getting client information.');
    socket.emit("init", socket.id);
  
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


    // listeners
    #socketListener(){

      // connection made
      this.#io.on('connection', (socket) => {
        this.#connectClient(socket);
      
        socket.on('disconnect', () => {
          console.log(socket.id, 'client has disconnected, removing from list.');
          let client = this.#getClient(socket.id);
          // this.#leaveChatroom(client.currentRoom, socket.id);
          this.#removeClient(socket.id);
        });
      
      });
  
    }

}

module.exports = SocketManager;