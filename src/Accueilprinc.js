import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Accueilprinc.css';
import './Ass.css';
import './mdp.css';
import './profile.css';
import './notes.css';
import './cartecredits.css';
import './homeapp.css';

function Accueilprinc() {
  const [activeMenu, setActiveMenu] = useState('home');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [date, setDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNoteDate, setSelectedNoteDate] = useState('');
  const [selectedNoteText, setSelectedNoteText] = useState('');
  const [carte, setCarte] = useState({
    modele: '',
    nom: '',
    numero: '',
    codePin: ''
  });
  const [appName, setAppName] = useState(''); // Définition de appName
  const [passwordOptionsError, setPasswordOptionsError] = useState(false); // Définition de passwordOptionsError
  const [savedApplications, setSavedApplications] = useState([]); // Définition de savedApplications
  const [selectedApp, setSelectedApp] = useState(''); // Définition de selectedApp
  const navigate = useNavigate();

  const handleSaveApplication = () => {
    if (appName && generatedPassword) {
      const currentDate = new Date().toLocaleDateString(); 
      axios.post('http://127.0.0.1:8000/myapp/applications/', {
        date: currentDate,
        nom_application: appName,
        mot_de_passe_généré: generatedPassword
      })
      .then(response => {
        // Gérer la réponse du backend si nécessaire
        console.log('Application enregistrée avec succès:', response.data);
        // Mettre à jour l'état pour afficher la nouvelle application enregistrée
        setSavedApplications([...savedApplications, response.data]);
      })
      .catch(error => {
        // Gestion les erreurs
        console.error('Erreur lors de l\'enregistrement de l\'application:', error);
      });
    } else {
      alert('Veuillez saisir le nom de l\'application et générer un mot de passe avant d\'enregistrer.');
    }
  };

  

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleGeneratePassword = () => {
    const password = generatePassword();
    setGeneratedPassword(password);
  };

  const generatePassword = () => {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 10;
    var password = "";
    
    for(let i = 0; i < passwordLength; i++){
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    return password;
  };
  const copyPasswordToClipboard = (password) => {
    // Copier le mot de passe dans le presse-papiers
    navigator.clipboard.writeText(password)
      .then(() => {
        alert('Le mot de passe a été copié avec succès !');
      })
      .catch((error) => {
        console.error('Erreur lors de la copie du mot de passe :', error);
        alert('Erreur lors de la copie du mot de passe. Veuillez le faire manuellement.');
      });
  };
  const handleDeleteApplication = (index) => {
    const updatedApplications = [...savedApplications];
    updatedApplications.splice(index, 1);
    setSavedApplications(updatedApplications);
  };
  

  const handleLogout = () => {
    navigate("/Home");
  };

  const copyMdp = () => {
    var inputPassword = document.getElementById('password');
  
    if (inputPassword && inputPassword.value.length === 10) {
      inputPassword.select();
      document.execCommand("copy");
  
      var copyBtn = document.getElementById('copy');
      if (copyBtn) {
        copyBtn.style.background = "";
        copyBtn.style.color = "";
      }
    } 
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleClearCreditCardFields = () => {
    setCarte({ modele: '', nom: '', numero: '', codePin: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && notes) {
      const newNote = {
        date: date,
        notes: notes
      };
      if (selectedNoteIndex !== null) {
        const updatedNotes = [...savedNotes];
        updatedNotes[selectedNoteIndex] = newNote;
        setSavedNotes(updatedNotes);
        setSelectedNoteIndex(null);
        setSelectedNoteDate('');
        setSelectedNoteText('');
      } else {
        setSavedNotes([...savedNotes, newNote]);
      }
      setDate('');
      setNotes('');
    } else {
      alert('Veuillez saisir une date et des notes avant d\'enregistrer.');
    }
  };

  const handleEditNote = (index) => {
    const note = savedNotes[index];
    setSelectedNoteIndex(index);
    setSelectedNoteDate(note.date);
    setSelectedNoteText(note.notes);
    setDate(note.date);
    setNotes(note.notes);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(updatedNotes);
  };
  return (
    <div className="mdp">
      <div className="container">
        <div className="sidebar">
          <ul>
            <li className={activeMenu === 'home' ? 'active' : ''} onClick={() => handleMenuClick('home')}>HOME</li><br></br>
            <li className={activeMenu === 'notes' ? 'active' : ''} onClick={() => handleMenuClick('notes')}>NOTES</li><br></br>
            <li className={activeMenu === 'password' ? 'active' : ''} onClick={() => handleMenuClick('password')}>MOT DE PASSE</li><br></br>
            <li className={activeMenu === 'credit-card' ? 'active' : ''} onClick={() => handleMenuClick('credit-card')}>CARTE DE CREDITS</li><br></br>
          </ul>
          <ul id="lala">
            <li className={activeMenu === 'my-account' ? 'active' : ''} onClick={() => handleMenuClick('my-account')}>MON COMPTE</li>
            <div className='dis'>
              <li className="disconnect" onClick={handleLogout}>Se déconnecter</li>
            </div>
          </ul>
        </div>

        <div className="main-content">
          {/* Pour associer les applications */}
          {activeMenu === 'home' && (
            <div className="association-app">
              <h2>Associer des applications</h2>
              <div className="input-group">
              <input type="date" placeholder="Date du jour" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)}required />
              <br></br> <br></br>
              <input type="text" placeholder="Nom de l'application" value={appName} onChange={(e) => setAppName(e.target.value)} />
              <br></br> 
              </div>
              <button className="select" onClick={handleGeneratePassword}>Générer</button>
              <br></br> <br></br>
              <div className="password-group">
              <input type="text" value={generatedPassword} readOnly />
              </div>
              <br></br>  {passwordOptionsError && (
                <p className="message-erreur">Veuillez sélectionner au moins une option pour générer le mot de passe.</p>
              )}
              <button className="select" onClick={handleSaveApplication}>Enregistrer</button>
              {savedApplications.length > 0 && (
                <div className="table-container">
                <table className="applications-table">
                  <thead>
                <tr>
                  <th>Date</th>
                  <th>Nom de l'application</th>
                  <th>Mot de passe</th>
                </tr>
              </thead>
                      <tbody>
                          {savedApplications.map((app, index) => (
                     <tr key={index}>
          <td>{app.date_association}</td>
          <td>{app.nom_application}</td>
          <td>
           {app.mot_de_passe_généré} 
          
            <button className="suppression" onClick={() => handleDeleteApplication(index)}>Supprimer</button>
            <button className="suppression"onClick={() => copyPasswordToClipboard(app.password)}>Copier</button>
            
             </td>
            
        </tr>
      ))}
        </tbody>
        </table>
        </div>
             )}
            </div>
          )}
              
          

          {/* Pour générer les mot de passe avec les applications */}
          {selectedApp && (
            <div className="action-buttons">
              <h3>{selectedApp}</h3>
              <button onClick={handleGeneratePassword}>Générer un mot de passe</button>
              {generatedPassword && (
                <div>
                  <p>Mot de passe généré : {generatedPassword}</p>
                  <button id="copy" onClick={copyMdp}>Copier le mot de passe</button>
                </div>                   
              )}
            </div>
          )}

          {/* Pour la partie saisie de texte de notes */}
          {activeMenu === 'notes' && (
            <div className="notesBox">
              <h2>Notes</h2>
              <div>
                <div className='dates'>
                  <input className="dateInput" type="date" value={date} onChange={handleDateChange} />
                </div>
                <textarea rows="15" cols="50" value={notes} onChange={handleNotesChange} placeholder="Saisissez vos notes ici"></textarea>
                <button onClick={handleSubmit}>Enregistrer</button>
                <button onClick={() => setNotes('')}>Effacer</button>
              </div>
            </div>
          )}

          {/* Pour sauvegarder les notes */}
          {activeMenu === 'notes' && (
            <div>
              {savedNotes.length > 0 && (
                <div className="tableau de notes">
                  <h2>Tableau des notes sauvegardées</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Notes</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedNotes.map((note, index) => (
                        <tr key={index}>
                          <td>{note.date}</td>
                          <td>{note.notes}</td>
                          <td>
                            <button className="atchou" onClick={() => handleEditNote(index)}>Modifier</button>
                            <button className="atchou" onClick={() => handleDeleteNote(index)}>Supprimer</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Pour générer juste des mots de passe */}
          {activeMenu === 'password' && (
            <div className="inputBox">
              <h2>Mot de passe</h2>
              <input id="password" type="text" value={password} readOnly /><br />
              <div className="passwordBox">
                <button onClick={() => setPassword(generatePassword())}>Générer</button>
                <button id="copy" onClick={copyMdp}>Copier</button>
              </div>
            </div>
          )}

          {/* Pour la partie carte de crédits */}
          {activeMenu === 'credit-card' && (
            <div className="creditCard">
              <h2>Carte de crédits</h2>
              <form onSubmit={handleSubmit}>
                <div className="input">
                  <center><p>Modèle de la carte</p><input type="text" placeholder="Modèle de la carte" value={carte.modele} onChange={(e) => setCarte({ ...carte, modele: e.target.value })} /></center>
                </div><br></br>
                <div className="input">
                  <center><p>Nom et prénom</p> <input type="text" placeholder="Nom et prénom" value={carte.nom} onChange={(e) => setCarte({ ...carte, nom: e.target.value })} /></center>
                </div><br></br>
                <div className="input">
                  <center><p>Numéro de la carte/CVC</p> <input type="text" placeholder="Numéro de la carte" value={carte.numero} onChange={(e) => setCarte({ ...carte, numero: e.target.value })} /></center> 
                </div><br></br>
                <div className="input">
                  <center><p>Code pin de la carte</p><input type="text" placeholder="Code PIN de la carte" value={carte.codePin} onChange={(e) => setCarte({ ...carte, codePin: e.target.value })} /></center> 
                </div><br></br>
                <div className="buttons">
                  <button type="button" onClick={handleClearCreditCardFields}>Effacer</button>
                  <button type="submit">Enregistrer</button>
                </div>
              </form>
            </div>
          )}

          {/* Pour la partie MON PROFIL */}
          {activeMenu === 'my-account' && (
            <div className="profilbox">
              <h2>MON PROFIL</h2>
              <form onSubmit={handleSubmit}>
                <div className="inpubox">
                  <input type="file" accept="image/*" onChange={handlePhotoChange} />
                  <input type="text" placeholder="Nom" value={lastName} onChange={handleLastNameChange} />
                  <input type="text" placeholder="Prénom" value={firstName} onChange={handleFirstNameChange} />
                  <input type="password" placeholder="Ancien Mot de passe" value={password} onChange={handlePasswordChange} />
                  <input type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={handleNewPasswordChange} />
                  <input type="password" placeholder="Confirmer le mot de passe" value={newPassword} onChange={handleNewPasswordChange} />
                  <button type="submit">Enregistrer</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Accueilprinc;
