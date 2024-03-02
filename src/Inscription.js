import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inscription.css'; 

// Les composants principaux de Inscription

const Inscription = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [registrationDate, setRegistrationDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  
  // Pour valider les champs d'Inscription
  
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword || !registrationDate) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    // Pour valider le e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Veuillez entrer une adresse email valide.');
      return;
    }

    // Pour que les mots de passe contient des majuscules et chiffres
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,20}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Le mot de passe doit contenir au moins une lettre majuscule, un chiffre et être entre 8 et 20 caractères.');
      return;
    }


    // Pour que les mots de passe soient pareils
    if (password !== confirmPassword) {
      setConfirmPasswordError('Les mots de passe ne correspondent pas.');
      return;
    }

    setErrorMessage('');
    setPasswordError('');
    setConfirmPasswordError('');
    navigate('/Accueilprinc');


    

    // Pour la base de données
    try {
      const response = await fetch('http://127.0.0.1:8000/myapp/inscription/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: lastName,
          prenom: firstName,
          email,
          motDepasse: password,
          dateCreation: registrationDate,
        }),
      });

      const data = await response.json();

      // Validation aussi en cas d'Inscription

      if (response.ok) {
        console.log('Inscription réussie !');
        navigate('/Accueilprinc');
      } else {
        console.log('Erreur lors de l\'inscription :', data.error);
      }
    } catch (err) {
      console.error('Erreur lors de la requête d\'inscription :', err);
    }
  };

  // Pour la visibilité du mot de passe

  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Le formulaire d'Inscription

  return (
    <div className="lolo">
      <div className={`inscription-section 'signin' : 'signup'}`}>
        <h2>S'inscrire</h2>
        {errorMessage && <p style={{ color: 'black' }}>{errorMessage}</p>}
        <form onSubmit={handleSignUp}>
          <div className="inscription-input-container">
            <input type="text" placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)}  />
          </div>
          <div className="inscription-input-container">
            <input type="text" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)}  />
          </div>
          <div className="inscription-input-container">
            <input type="email" placeholder="exemple@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}  />
          </div>
          <div className="inscription-input-container">
            <input type={showPassword ? 'text' : 'password'} placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
            {passwordError && <p style={{ color: 'white' }}>{passwordError}</p>}
         
          <br></br><button type="button" onClick={tooglePasswordVisibility}>
            {showPassword ? 'Cacher' : 'Voir'} 
          </button><br/><br/>
          <input type="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  />
          {confirmPasswordError && <p style={{ color: 'white' }}>{confirmPasswordError}</p>}
          <input type="date" value={registrationDate} onChange={(e) => setRegistrationDate(e.target.value)}  />
          </div>
          <button type="submit">S'inscrire</button>
          <p> En vous inscrivant, vous acceptez notre politique de confidentialité et nos conditions d'utilisation.</p>
        </form>
        <p>Vous avez déjà un compte? <span onClick={() => navigate('/Home/Connexion')}>Se connecter</span></p>
      </div>
    </div>
  );
};

export default Inscription;
