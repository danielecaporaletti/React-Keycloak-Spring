import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { Card } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateCodeVerifier } from '../redux/pkceSlice';

const PKCECodiceVerifica = () => {
    
    const dispatch = useDispatch();
    const codiceVerifica = useSelector(state => state.pkce.codeVerifier);

    const generaCodiceVerifica = () => {
        dispatch(generateCodeVerifier());
    }

    return (
        <Container className="my-5">
          <Row className="justify-content-center mb-3">
            <Col xs={12} md={8} lg={6}>
              <Card className="shadow-lg">
                <Card.Body>
                  <Card.Title className="text-center mb-3">
                    <h2 className="font-weight-bold">02. Create a Code Verifier</h2>
                  </Card.Title>
                  <Card.Text className="text-center mb-4">
                    The client generate a secret <b>code verifier</b> for each autorization. This code is a cryptographically random string using the characters A-Z, a-z, 0-9, and the punctuation characters -._~ (hyphen, period, underscore, and tilde), between 43 and 128 characters long.
                  </Card.Text>
                  <div className="d-flex justify-content-center mb-4">
                    <Button variant="primary" size="lg" onClick={generaCodiceVerifica} disabled={codiceVerifica !== ""}>
                      Generate CODE VERIFIER
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              {codiceVerifica && (
                <Alert variant="success" className="text-center mt-3 text-break">
                  <h4 className="font-weight-bold">{codiceVerifica}</h4>
                </Alert>
              )}
            </Col>
          </Row>
        </Container>
      )
      
};

export default PKCECodiceVerifica;
