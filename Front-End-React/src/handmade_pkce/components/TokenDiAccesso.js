import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { Card } from 'react-bootstrap';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../redux/pkceSlice';

const TokenDiAccesso = () => {
    const dispatch = useDispatch();
    const authorizationCode = useSelector(state => state.pkce.authorizationCode);
    const codeVerifier = useSelector(state => state.pkce.codeVerifier);
    const accessToken = useSelector(state => state.pkce.accessToken);

    const [tokenAccesso, setTokeAccesso] = useState("");

    const ottieniTokenDiAccesso = () => {
      let accessTokenURL = "POST http://localhost:8080/realms/Reame1/protocol/openid-connect/token/" + "\n\n";
      accessTokenURL += "grant_type=authorization_code" + "\n";
      accessTokenURL += "&client_id=my-client" + "\n";
      accessTokenURL += "&client_idmy-client" + "\n";
      accessTokenURL += "&code=" + authorizationCode + "\n";
      accessTokenURL += "&code_verifier=" + codeVerifier + "\n";
      accessTokenURL += "&redirect_uri=http://localhost:3000/login/callback" + "\n";
      setTokeAccesso(accessTokenURL);
    }

    const inviaTokenDiAccesso = () => {
      dispatch(getAccessToken({ authorizationCode, codeVerifier }));
    }

    
    return (
        <Container className="my-5">
          <Row className="justify-content-center mb-3">
            <Col xs={12} md={8} lg={6}>
              <Card className="shadow-lg">
                <Card.Body>
                  <Card.Title className="text-center mb-3">
                    <h2 className="font-weight-bold">05. Exchange the Authorization Code</h2>
                  </Card.Title>
                  <Card.Text className="text-center mb-4">
                    The client application sends a token request to the authorization server, including the <b>authorization code</b> and <b>verification code</b>.                  
                    <br/>
                    <br/>
                    The client will build a POST request to the token endpoint with the following parameters:
                  </Card.Text>
                  <div className="d-flex justify-content-center mb-4">
                        <Button variant="primary" size="lg" onClick={ottieniTokenDiAccesso} disabled={tokenAccesso !== ""}>
                            Build POST request to the token endpoint
                        </Button>
                  </div>
                  {tokenAccesso && (
                      <Alert variant="success" className="mt-3 text-break">
                          <h5 className="font-weight-bold"><pre>{tokenAccesso}</pre></h5>
                      </Alert>
                  )}
                  <Card.Text className="text-center mb-4">
                    Remember the <b>code verifier</b>? You'll need to send that along with the token request. The authorization server will check whether the verifier matches the challenge that was used in the authorization request. This ensures that a malicious party that intercepted the authorization code will not be able to use it.
                  </Card.Text>
                  <div className="d-flex justify-content-center mb-4">
                    <Button variant="primary" size="lg" onClick={inviaTokenDiAccesso} disabled={accessToken !== ""}>
                      Send the POST request
                    </Button>
                  </div>
                  {accessToken && (
                    <Alert variant="success" className="mt-3 text-break">
                      <h4 className="font-weight-bold">
                      <pre>
                      {Object.entries(accessToken).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {value}
                        </div>
                      ))}
                    </pre>
                        </h4>
                    </Alert>
                  )}
                  <Card.Text className="mt-4">
                  Here you can see all the object returned by keycloak. Inside it is not only the <b>access token</b> but also the <b>refresh token</b> and other information.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
      
}

export default TokenDiAccesso;
