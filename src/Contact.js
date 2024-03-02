import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  // Pour stocker les valeurs des champs du formulaire
  const [Nom , setNom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Pour soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour soumettre le formulaire
    console.log('Formulaire soumis avec succès !');
    // Réinitialiser les champs du formulaire après soumission
    setEmail('');
    setMessage('');
    setNom('');
  };

  // Pour le formulaire de contacts

  return (
    <div className="contact-page-wrapper">
      <h1 className="primary-heading">Vous avez une question ?</h1>
      <h1 className="primary-heading">Laissez nous vous aider</h1>

      <div className="contact-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Nom">Nom</label>
            <input type="nom" id="name" placeholder="votrenom" value={Nom} onChange={(e) => setNom(e.target.value)} required /> <br></br>  <br></br>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="votreemail@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required /> <br></br> <br></br>
            
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows='9' placeholder="Votre message ici..." value={message} onChange={(e) => setMessage(e.target.value)}required></textarea>
          </div>

          <button type="submit" className="secondary-button">Envoyer</button>
        </form>
      </div>

      <p>Où, <Link to="/">Page d'accueil</Link></p>
    </div>
  );
};

export default Contact;
