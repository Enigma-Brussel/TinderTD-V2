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

      let extraCSS = '';
      let badge = '';

      if(match.matchType == 'superlike'){
        extraCSS = 'superlike';
        badge = `<span class="superlike-badge">Superlike</span>`;
      }

      // match.user.picture
      // match.user.name

      matchesContent += `
        <a class="profile" href="/chat?connection=${match.id}">
          <div class="row align-center">
            <div class="picture-container ${extraCSS}">
              <img src="/img/users/${match.user.picture}"/>
            </div>

            <div>
              <span class="name">${match.user.name}${badge}</span>
              <span class="chat">Lorem ipsum</span>
            </div>

            <div>
              <!-- Notification -->
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