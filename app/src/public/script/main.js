const serverUrl =  "https://tinder.enigmabrussel.be/";
let setting = {};

function $(x) {
  return document.querySelector(x);
}

async function sendData(url, method, body, jsonData = true){

  switch(method){
    case 'GET':
    case 'get':
      if(jsonData){
        setting = {
          method: method,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        }
      }else{
        setting = {
          method: method,
          headers: {
            'Accept': '*/*'
          },
          credentials: 'include'
        }
      }
    break;
    default:
      if(jsonData){
        setting = {
          method: method,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(body)
        }
      }else{
        setting = {
          method: method,
          headers: {
            'Accept': '*/*'
          },
          credentials: 'include',
          body: body
        }
      }
    break;
  }
  

  console.log('fetching data...', setting);

  try {
    const fetchResponse = await fetch(`${serverUrl}${url}`, setting);
    const data = await fetchResponse.json();

    return data;

  }catch (error){
    console.log(error);
    return false;
  }

}
