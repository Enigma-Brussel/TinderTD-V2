let potentionalMatches = [];
let currentUser = 0;

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
  console.log('dislike');

  const response = await sendData('/api/connection/match', 'POST', {targetUser: potentionalMatches[currentUser].id, connectionType: 'dislike'});
  console.log('response', response);

  if(response){
    if(response.error){
      console.log('error', response.error);
    }else{

      // 

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
      if(response.complete){
        switch(response.type){
          case 'like':
            // match like
    
            break;
          case 'superlike':
            // match superlike
    
            break;
        }
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
        // match like
      }
    
      currentUser ++;
      render();
    }
  }else{
    console.log('Unknown error');
  }

  
});



getPotentionalMatches();