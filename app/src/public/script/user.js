async function getUserData(){
  const response = await sendData('/api/user/userdata', 'GET', null);
  if(response){
    $('#name').value = response.name;
    $('#age').value = response.age;
    $('#job').value = response.job;
    $('#association').value = response.association;
    $('#bio').value = response.bio;
    $('#profile-picture').style.backgroundImage = `url(/img/users/${response.picture})`;
  }
}

getUserData();

$('#save').addEventListener('click', async () => {

  let name = $('#name').value;
  let age = $('#age').value;
  let job = $('#job').value;
  let association = $('#association').value;
  let bio = $('#bio').value;

  if(name && age && job && association && bio){
    const response = await sendData('/api/user/change', 'POST', {
      name: name,
      age: age,
      job: job,
      association: association,
      bio: bio
    });

    if(!response.error){
      $('#status').innerHTML = 'Wijzigingen zijn opgeslagen.'
    }else{
      $('#status').innerHTML = response.error;
    }
  }

});