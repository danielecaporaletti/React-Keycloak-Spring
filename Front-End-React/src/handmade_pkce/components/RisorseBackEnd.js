import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { Card } from 'react-bootstrap';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResource } from '../redux/pkceSlice';

const RisorseBackEnd = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.pkce.accessToken);
    const risorse = useSelector(state => state.pkce.resource);

    // Stato locale per tracciare se il bottone è stato premuto
    const [buttonClicked, setButtonClicked] = useState(false);

    const ottieniRisorse = () => {
        // Segna il bottone come premuto
        setButtonClicked(true);

        // Procede solo se l'access token è presente
        if (accessToken !== "") {
            dispatch(getResource(accessToken));
        }
    };

    return (
      <Container className="my-5">
        <Row className="justify-content-center mb-3">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title className="text-center mb-3">
                  <h2 className="font-weight-bold">06. Communicate with the backend</h2>
                </Card.Title>
                <Card.Text className="text-center mb-4">
                  Now we can finally use the <b>access token</b> to communicate with the backend.
                </Card.Text>
                <div className="d-flex justify-content-center mb-4">
                  <Button variant="primary" size="lg" onClick={ottieniRisorse}>
                    Get RESOURCES
                  </Button>
                </div>
                <Card.Text className="text-center mb-4">
                  Check in the dev console (network tab) to see the GET request.
                </Card.Text>
                {accessToken === "" && buttonClicked && (
                  <Alert variant="danger" className="text-center mt-3 text-break">
                    <h4 className="font-weight-bold">Failed to connect to the backend.</h4>
                  </Alert>
                )}
                {risorse && (
                  <Alert variant="success" className="text-center mt-3 text-break">
                    <h4 className="font-weight-bold">{risorse}</h4>
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
}

export default RisorseBackEnd;
