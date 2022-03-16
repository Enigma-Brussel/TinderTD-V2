let potentionalMatches = [];
let currentUser = 0;
let connectionID = 0;
let loggedInUser = null;

async function getPotentionalMatches(){
  const response = await sendData('/api/connection/potentional', 'GET', null);
  if(response){
    if(response.error){
      console.log(response.error);
    }else{
      potentionalMatches = response;
      console.log(potentionalMatches);
      render();
    }
  }else{
    console.log('Unknown error');
  }
}

async function getUserData(){
  const response = await sendData('/api/user/userdata', 'GET', null);
  if(response){
    loggedInUser = response;
    if(response.superlikes == 0){
      $('#superlike').classList.add('blocked');
    }
  }else{
    console.log('Unknown error');
  }
}


function render(){
  if(currentUser >= 0 && currentUser <= potentionalMatches.length - 1){

    if(potentionalMatches[currentUser].association == 'Niet gedoopt'){
      potentionalMatches[currentUser].association = "";
    }

    $('#render-card').innerHTML = `
      <div class="picture-container">
        <img src="/img/users/${potentionalMatches[currentUser].picture}" alt="User name">
      </div>

      <div class="card-details">
        <h2>${potentionalMatches[currentUser].name}, ${potentionalMatches[currentUser].age}</h2>
        <span class="detail">${potentionalMatches[currentUser].job}</span>
        <span class="detail">${(potentionalMatches[currentUser].association)}</span>
        <span class="bio">${potentionalMatches[currentUser].bio}</span>
      </div>
    `;

  }else{
    $('#bottom-bar').classList.add('blocked');
    $('#render-card').innerHTML = `
      <div class="picture-container row center align-center">
        <p style="text-align: center">If you are lonely when you're alone,<br/>you are in bad company.<br/><br/>Kom later terug!</p>
      </div>
    `;
  }
}



$('#dislike').addEventListener('click', async (e) => {
  const response = await sendData('/api/connection/match', 'POST', {targetUser: potentionalMatches[currentUser].id, connectionType: 'dislike'});
  console.log('response', response);

  if(response){
    if(response.error){
      console.log('error', response.error);
    }else{
      currentUser ++;
      render();
    }
  }else{
    console.log('Unknown error');
  }
});

$('#superlike').addEventListener('click', async (e) => {
  console.log('superlike');
  const response = await sendData('/api/connection/match', 'POST', {targetUser: potentionalMatches[currentUser].id, connectionType: 'superlike'});
  console.log('response', response);
  if(response){
    if(response.error){
      console.log('error', response.error);
    }else{
      getUserData();
      if(response.complete){
        connectionID = response.id;
        renderMatchScreen(response.type, response.user);
      }
      currentUser ++;
      render();
    }
  }else{
    console.log('Unknown error');
  }
});

$('#like').addEventListener('click', async (e) => {
  console.log('like');
  const response = await sendData('/api/connection/match', 'POST', {targetUser: potentionalMatches[currentUser].id, connectionType: 'like'});
  console.log('response', response);
  if(response){
    if(response.error){
      console.log('error', response.error);
    }else{
      if(response.complete){
        connectionID = response.id;
        renderMatchScreen(response.type, response.user);
      }
      currentUser ++;
      render();
    }
  }else{
    console.log('Unknown error');
  }
});



function renderMatchScreen(type, user){

  switch(type){
    case 'like':

      $('#like-pf-user-two').style.backgroundImage = `url(/img/users/${user.picture})`;
      $('#like-pf-user-one').style.backgroundImage = `url(/img/users/${loggedInUser.picture})`;
      $('#like-send-message').innerHTML = `Stuur ${user.name} een bericht`;

      $('#match-like').style.display = 'block';

      break;
    case 'superlike':

      $('#super-pf-user-two').style.backgroundImage = `url(/img/users/${user.picture})`;
      $('#super-pf-user-one').style.backgroundImage = `url(/img/users/${loggedInUser.picture})`;
      $('#super-send-message').innerHTML = `Stuur ${user.name} een bericht`;

      $('#match-superlike').style.display = 'block';

      break;
  }
}

$('#like-send-message').addEventListener('click', () => {
  window.location.href = `/chat?connection=${connectionID}`;
});

$('#super-send-message').addEventListener('click', () => {
  window.location.href = `/chat?connection=${connectionID}`;
});

$('#like-cancel').addEventListener('click', () => {
  $('#match-like').style.display = 'none';
});

$('#super-cancel').addEventListener('click', () => {
  $('#match-superlike').style.display = 'none';
});

$('#free-shot').addEventListener('click', () => {

});


getPotentionalMatches();
getUserData();