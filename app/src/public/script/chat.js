const socket = io.connect(serverUrl);

socket.on('init', async (data) => {

  console.log(data);

  const response = await sendData('/api/chat/sync', 'POST', {
    socketID: data
  });

  console.log(response);
  
});