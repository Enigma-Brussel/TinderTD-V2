// form pagina
let currentPage = 0;

function loadPage(page){

  $('#status').innerHTML = "";

  if(check(page)){
    document.querySelectorAll('.form-page').forEach((item) => {
      item.style.display = "none";
    });
  
    $(`#page-${page}`).style.display = "block";
    currentPage = page;
  }

}

document.querySelectorAll('.next').forEach((item) => {
  item.addEventListener('click', () => {
    loadPage(currentPage + 1);
  });
});

document.querySelectorAll('.back').forEach((item) => {
  item.addEventListener('click', () => {
    loadPage(currentPage - 1);
  });
});

loadPage(1);


function check(page){
  switch(page - 1){
    case 1:

      const email = $('#email').value;
      const password = $('#password').value;
      const repeat_password = $('#repeat_password').value;

      if(email && password && repeat_password){
        if(password == repeat_password){
          return true;
        }else{
          $('#status').innerHTML = "Wachtwoorden komen niet overeen";
          return false;
        }
      }else{
        $('#status').innerHTML = "Alle data invullen!";
        return false;
      }

    case 2:

      const name = $('#name').value;
      const age = $('#age').value;
      const job = $('#job').value;
      const association = $('#association').value;
      const bio = $('#bio').value;

      if(name && age && job && association && bio){
        return true;
      }else{
        $('#status').innerHTML = "Alle data invullen!";
        return false;
      }

    default:
      return true;
  }
}


// fetching

$('#register').addEventListener('click', async (e) => {
  
  const email = $('#email').value;
  const password = $('#password').value;
  const repeat_password = $('#repeat_password').value;

  const name = $('#name').value;
  const age = $('#age').value;
  const job = $('#job').value;
  const association = $('#association').value;
  const bio = $('#bio').value;

  const profilepicture = $('#profilepicture').value;


  if(email && password && repeat_password && name && age && job && association && bio && profilepicture){
    if(password == repeat_password){

      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('repeat_password', repeat_password);

      formData.append('name', name);
      formData.append('age', age);
      formData.append('job', job);
      formData.append('association', association);
      formData.append('bio', bio);

      formData.append('profilepicture', $('#profilepicture').files[0]);

      const response = await sendData('/api/user/register', 'POST', formData, false);

      console.log('Response:', response);

      if(response){
        $('#status').innerHTML = "";
        
        document.querySelectorAll('.form-page').forEach((item) => {
          item.style.display = "none";
        });
      
        $(`#page-complete`).style.display = "block";

      }else{
        $('#status').innerHTML = "Er is iets misgelopen.";
      }

    }else{
      // wachtwoorden niet gelijk
      console.log('Wachtwoorden komen niet overeen');
      $('#status').innerHTML = "Wachtwoorden komen niet overeen.";
    }
  }else{
    // niet alles ingevuld
    console.log('Niet alles in ingevuld');
    $('#status').innerHTML = "Niet alles in ingevuld.";
  }

});