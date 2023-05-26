import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateState } from '../redux/pkceSlice';

const PKCEState = () => {
  const dispatch = useDispatch();
  const pkceState = useSelector(state => state.pkce.pkceState);

  const generaStato = () => {
    dispatch(generateState());
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center mb-3">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-3">
                <h2 className="font-weight-bold">01. Create a State Code</h2>
              </Card.Title>
              <Card.Text className="text-center mb-4">
                The client generates a unique status code and stores it. This <b>status code</b> is a cryptographically secure, randomized value.
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Button variant="primary" size="lg" onClick={generaStato} disabled={pkceState !== ""}>
                  Generate STATE CODE
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {pkceState && (
            <Alert variant="success" className="text-center mt-3 text-break">
              <h4 className="font-weight-bold">{pkceState}</h4>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default PKCEState;
