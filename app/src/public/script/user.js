async function getUserData(){
  const response = await sendData('/api/user/userdata', 'GET', null);

  console.log(response);

}