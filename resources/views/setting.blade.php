<x-app-layout>

    @vite(['resources/css/user.css'])
    
    <div class="content">
        
        <h1>Profiel</h1>

        <div class="row center">
  
          <!-- foto -->
          <div class="profile-picture" id="profile-picture">
            <form id="form" method="POST" action="" style="width: 100%; height: 100%;" enctype="multipart/form-data">
              <input type="file" accept="image/jpeg,image/jpg,image/png" name="foto">
            </form>
          </div>
          
        </div>
  
        <div class="row">
          <form>
  
              <label for="name">(enkel) Voornaam</label>
              <input type="text" name="name" id="name" required>
  
              <label for="age">Leeftijd</label>
              <input type="number" name="age" id="age" min="18" max="99" required>
  
              <label for="job">Job/Studies</label>
              <input type="text" name="job" id="job" required>
  
              <label for="association">Kring</label>
              <select name="association" id="association" required>
  
                <option value=""></option>
  
                <option value="Niet gedoopt">Niet gedoopt</option>
                
                <option value="Enigma">Enigma</option>
                <option value="Manu Juvanta">Manu Juvanta</option>
                <option value="Commin@">Commin@</option>
                <option value="Normalia">Normalia</option>
                <option value="Vilvordia">Vilvordia</option>
                <option value="Omega">Omega</option>
                <option value="POPO">POPO</option>
  
                <option value="Andere">Andere (vermeld in bio)</option>
  
              </select>
  
              <label for="bio">Bio</label>
              <textarea name="bio" id="bio" required></textarea>
  
              <span class="button" id="save">Opslaan</span>
              <span class="status" id="status"></span>
  
          </form>
        </div>
  
        <hr/>
  
        <div class="row center collumn">
          <a href="#"><span class="button" id="logout">Afmelden</span></a>
        </div>

    </div>

</x-app-layout>