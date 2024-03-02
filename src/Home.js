import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


// Pour le landing page Home

function Home() {
  return (
    <div className="App">
      <header>
        <nav>
          
          <h1 className='logo'>SafePass</h1>
          <ul>
            <li><Link to="/Home/Inscription">S'inscrire</Link></li>
            <li><Link to="/Home/Connexion">Se connecter</Link></li>
            <li><Link to="/Home/Contact">Contacts</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="home-containt">
      
        </div>
        <div className="text">
        <div style={{ display: "flex", alignItems: "center" }}>
         <div style={{ marginLeft: "0px" }}>
         <h1 className="home-welcome">BIENVENUE CHEZ SafePass</h1> 
         <p className="home-subtext">Votre application web de générateurs de mots de passe sécurisés et fiables. <br></br>
           Le gestionnaire de mot de passe SafePass est toujours confidentiel et sécurisé. <br></br>
           Celà signifie qu'il est impossible pour un usurpateur de pouvoir accéder à vos mots de passe et clés d'accès.</p>
         </div>
           <img src="/images/all-devices.jpeg" alt="" style={{ width: "600px", marginTop:"50px" }} />
        </div>
        </div>

          <div className="textcenter">
            <h1 className="textcenter"><center>Découvrez comment SafePass simplifie votre expérience en ligne</center></h1>
          </div>
          <div className="stextcenter">
            <p><center>Assurez votre sécurité et économisez du temps grâce à notre gestionnaire de mots de passe.
              SafePass vous permet de gérer vos mots de passe en toute confiance.</center></p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
              <div>
              <img src="/images/hate.jpg" alt="" style={{ width: "500px", marginTop:"50px", marginLeft:"100px", }} />
              <p style={{ position: "relative", top: "-20px", textAlign: "center", fontSize:"20px", fontWeight:"bold",  marginTop: "20px", marginRight:"100px" }}>              
              Accès et association de plusieurs applications.<br></br>
              Vous pouvez utiliser SafePass sur tous les appareils et toutes les plateformes.
              </p>  
              </div> 
              <div>
              <img src="/images/sip.jpg" alt="" style={{ width: "500px", marginTop:"50px", marginRight:"100px" }} />
              <p style={{ position: "relative", top: "-20px", textAlign: "center", fontSize:"20px", fontWeight:"bold",  marginTop: "20px", marginRight:"100px" }}>              
              Partage sécurisé. <br></br>
              Vous pouvez partager des mots de passe à tout moment.     
              </p>
              </div>
              </div>
          
          </div>
      </main>
      <footer>
             <div className="footer-wrapper">
                <div className="footer-section-one">
                  <h3>À propos de nous</h3>
                  <p>SafePass est une application web de générateurs de mots de passe innovantes pour vous simplifier la vie quotidienne.<br></br>
                    Son association avec plusieurs applications vous permet d'économiser en temps.<br></br>
                    Ces multitudes fonctionnalités qui vous permet de conserver vos informations.<br></br>
                  </p>
             </div>
              <div className="footer-section-two">
              <h3><Link to ="/Home/Contact">Contactez-nous</Link></h3>
              <p>Email: mamadoualioud813@gmail.com</p>
              <p>Téléphone: +212707259595</p>
              <p>Adresse: Quartier Chabab, Casablanca, MAROC</p>
             </div>
             </div>
           </footer>

    </div>
  );
}

export default Home;
