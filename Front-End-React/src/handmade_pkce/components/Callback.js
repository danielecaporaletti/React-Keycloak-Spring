import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Callback() {

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // chiamare la funzione di callback del componente App
    if (window.opener) {
      window.opener.getCallbackPayload({
        authorizationCode: urlParams.get('code'),
        returnedState: urlParams.get('state'),
        error: urlParams.get('error'),
        errorDescription: urlParams.get('error_description')
      });
    }

    // chiudere la finestra di callback o reindirizzare l'utente a una pagina appropriata
    if (window.opener) {
      setTimeout(function() {
        window.close();
      }, 3000);
      
    } else {
      navigate('/'); // ad esempio, reindirizza l'utente alla pagina principale
    }
  }, [navigate]);

  return (
    <div>
      <h1>Callback route !</h1>
      <h3>Attendi 3s a scopo illustrativo...</h3>
    </div>
  );
}

export default Callback;
