import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { Card } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateCodeChallenge } from '../redux/pkceSlice';

const PKCECodiceDiSfida = () => {
    const dispatch = useDispatch();
    const codeChallenge = useSelector(state => state.pkce.codeChallenge);

    const generaCodiceDiSfida = () => {
        dispatch(generateCodeChallenge());
    }

    return (
      <Container className="my-5">
        <Row className="justify-content-center mb-3">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title className="text-center mb-3">
                  <h2 className="font-weight-bold">03. Create a Code Challenge</h2>
                </Card.Title>
                <Card.Text className="text-center mb-4">
                Once the client has generated the <b>code verifier</b>, it uses that to create the <b>code challenge</b>. There are two ways to do this:
                </Card.Text>
                <div className="text-center mb-4">
                  <ol>
                    <li><b>S256</b>: The client creates a base64url version of the code verifier's SHA256 code.</li>
                    <li><b>Plain</b>: The code challenge is the same as the code verifier.</li>
                  </ol>
                </div>
                <div className="d-flex justify-content-center mb-4">
                  <Button variant="primary" size="lg" onClick={generaCodiceDiSfida} disabled={codeChallenge !== ""}>
                    Generate CODE CHALLENGE
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            {codeChallenge && (
              <Alert variant="success" className="text-center mt-3 text-break">
                <h4 className="font-weight-bold">{codeChallenge}</h4>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    )

      
}

export default PKCECodiceDiSfida;
