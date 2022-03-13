$('#login').addEventListener('click', async (e) => {

  const email = $('#email').value;
  const password = $('#password').value;

  if(email || password){

    const response = await sendData('/api/user/login', 'POST', {
      "email": email,
      "password": password
    });

    console.log('Response:', response);

    if(response){
      $('#status').innerHTML = "";
      window.location.href = '/main';
    }else{
      $('#status').innerHTML = "Aanmelden mislukt. Probeer opnieuw.";
    }

  }else{
    // niet alles ingevuld
    console.log('Niet alles in ingevuld');
    $('#status').innerHTML = "Niet alles in ingevuld.";
  }

});