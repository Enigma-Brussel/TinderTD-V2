let matches = [];

// fetch

async function getMatches(){
  const response = await sendData('/api/connection/allmatches', 'GET', null);
  if(response){
    if(response.error){
      console.log(response.error);
    }else{
      matches = response;
      console.log(matches);
      renderMatches();
    }
  }else{
    console.log('Unknown error');
  }
}

// render

function renderMatches(){
  if(matches.length !== 0){

    let matchesContent = '';

    matches.map((match) => {
      matchesContent += `
        <a class="chat" href="#">
          <div class="row align-center">
            <div class="profile"><img src="/img/users/${match.user.picture}" alt="[Profile]"></div>
            <div>
              <span class="profile-name">${match.user.name}</span>
              <span class="chat-message">Lorem ipsum</span>
            </div>
          </div>
        </a>
      `;
    });

    $('#chats').innerHTML = matchesContent;

  }else{
    // geen matches
  }
}

// start

getMatches();