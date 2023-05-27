import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { Card } from 'react-bootstrap';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL_KEYCLOAK, BASE_URL_FRONTEND } from '../../config'

function AutorizzazioneCodice() {
    const [authorizationUrl, setAuthorizationUrl] = useState("");
    const pkceState = useSelector(state => state.pkce.pkceState);
    const codeChallenge = useSelector(state => state.pkce.codeChallenge);
    const returnedPkceState = useSelector(state => state.pkce.returnedPkceState);
    const authorizationCode = useSelector(state => state.pkce.authorizationCode);

    const generaCodiceDiAutorizzazione = () => {
      let authorizationUrl = `${BASE_URL_KEYCLOAK}/realms/Reame1/protocol/openid-connect/auth` + "\n";
      authorizationUrl += "?client_id=my-client" + "\n";
      authorizationUrl += "&response_type=code" + "\n";
      authorizationUrl += "&scope=openid email profile contacts address" + "\n";
      authorizationUrl += `&redirect_uri=${BASE_URL_FRONTEND}/login/callback` + "\n";
      authorizationUrl += "&state=" + pkceState + "\n";
      authorizationUrl += "&code_challenge=" + codeChallenge + "\n";
      authorizationUrl += "&code_challenge_method=S256" + "\n";
      setAuthorizationUrl(authorizationUrl);
  }
  
  
  const inviaCodiceDiAutorizzazione = () => {
      let urlToSend = authorizationUrl.replace(/\n/g, ''); // Rimuove tutti i ritorni a capo.
      window.open(urlToSend, 'authorizationRequestWindow', 'width=500,height=500,left=50,top=50');
  }
  



    return (
        <Container className="my-5">
          <Row className="justify-content-center mb-3">
            <Col xs={12} md={8} lg={6}>
              <Card className="shadow-lg mb-4">
                <Card.Body>
                  <h3 className="text-center mb-4">User Credential</h3>
                  <div className="text-center">
                    <Card.Text>
                      Email dell'utente: <b>happy@email.com</b>
                    </Card.Text>
                    <Card.Text>
                      Password: <b>12345</b>
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
              <Card className="shadow-lg">
                <Card.Body>
                  <Card.Title className="text-center mb-3">
                    <h2 className="font-weight-bold">04. Request for Authorization</h2>
                  </Card.Title>
                  <Card.Text className="text-center mb-4">
                    The client application sends an authorization request to the authorization server. In this request, the application includes the <b>challenge code</b>, the method used to hash the challenge code (e.g. "S256" for SHA-256), and the <b>status code</b>.
                  </Card.Text>
                  <div className="d-flex justify-content-center mb-4">
                        <Button variant="primary" size="lg" onClick={generaCodiceDiAutorizzazione} disabled={authorizationUrl !== ""}>
                            Build Authorization URL
                        </Button>
                  </div>
                  {authorizationUrl && (
                      <Alert variant="success" className="mt-3 text-break h5">
                          <h5 className="font-weight-bold"><pre>{authorizationUrl}</pre></h5>
                      </Alert>
                  )}
                  <div className="d-flex justify-content-center mb-4">
                        <Button variant="primary" size="lg" onClick={inviaCodiceDiAutorizzazione} className="ml-3" disabled={returnedPkceState !== ""}>
                            Send Authorization URL
                        </Button>
                  </div>
                  <Card.Text className="text-center mb-4">
                    If the login is successful, the authorization server replies with an <b>authorization code</b> and the original <b>status code</b>.                  
                  </Card.Text>
                  <Card className="mb-4 h5">
                  <Card.Body>
                      State Code of response:
                      {returnedPkceState && 
                      <Alert variant="success" className="text-center mt-3 text-break">
                          <strong>{returnedPkceState}</strong>
                      </Alert>}
                  </Card.Body>
                  </Card>
                  <Card className="mb-4 h5">
                      <Card.Body>
                          State Code memorized in client: 
                          {returnedPkceState && 
                          <Alert variant="info" className="text-center mt-3 text-break">
                              <strong>{pkceState}</strong>
                          </Alert>}
                      </Card.Body>
                  </Card>
                  <Card.Text className="text-center mb-4">
                  The client application compares the received status code with the one it previously stored. If the status codes match, the application can proceed with requesting the access token. If they don't match, the application rejects the response. Afterwards we have the <b>authorization code</b> obtained from the response.
                  </Card.Text>
                  <Card className="mb-4 h5">
                  <Card.Body>
                      Authorization Code: 
                      {authorizationCode && 
                      <Alert variant="success" className="text-center mt-3 text-break">
                          <strong>{authorizationCode}</strong>
                      </Alert>}
                  </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )
      
}

export default AutorizzazioneCodice;
