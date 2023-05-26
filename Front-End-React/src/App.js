import React, { useEffect } from 'react';
import AppLibrary from './library_pkce/AppLibrary';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { setAuthorizationCode, setReturnedState } from './handmade_pkce/redux/pkceSlice';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useStore } from 'react-redux';
import PKCEState from './handmade_pkce/components/PKCEState';
import PKCECodiceVerifica from './handmade_pkce/components/PKCECodiceVerifica';
import PKCECodiceDiSfida from './handmade_pkce/components/PKCECodiceDiSfida';
import AutorizzazioneCodice from './handmade_pkce/components/AutorizzazioneCodice';
import Callback from './handmade_pkce/components/Callback';
import TokenDiAccesso from './handmade_pkce/components/TokenDiAccesso';
import RisorseBackEnd from './handmade_pkce/components/RisorseBackEnd';

function App() {
    const reduxStore = useStore();

    useEffect(() => {
        window.getCallbackPayload = function (payload) {
            if (payload.error) {
                console.error(payload.errorDescription);
                return;
            }
            reduxStore.dispatch(setAuthorizationCode(payload.authorizationCode));
            reduxStore.dispatch(setReturnedState(payload.returnedState));
        }
    }, [reduxStore]);

    function HomePage() {
        return (
            <Container className="mt-5">
                <Container className="text-center p-5 mb-4 bg-light rounded-3">
                    <h1>Welcome to My PKCE App</h1>
                    <p>I have implemented two ways to authorize via PKCE to keycloak server, choose one.</p>
                </Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="6">
                        <Card className="mb-4">
                            <Card.Body className="text-center">
                                <Card.Title>Handmade Solution</Card.Title>
                                <Card.Text>
                                    I built the entire authentication process, if you choose this way you can see how the PKCE method gets the Access Token.
                                </Card.Text>
                                <Button as={Link} to="/handmade" variant="primary">Go to Handmade Page</Button>                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs lg="6">
                        <Card>
                            <Card.Body className="text-center">
                                <Card.Title>Library Solution</Card.Title>
                                <Card.Text>
                                    I built a typical authentication process using the `keycloak-js` library for React. if you choose this way you can authenticate automatically.
                                </Card.Text>
                                <Button as={Link} to="/library" variant="primary">Go to Library Page</Button>                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Router>
            <Routes>
                <Route path="/login/callback" element={<Callback />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/handmade" element={
                  <>
                    <PKCEState />
                    <PKCECodiceVerifica />
                    <PKCECodiceDiSfida />
                    <AutorizzazioneCodice />
                    <TokenDiAccesso />
                    <RisorseBackEnd />
                  </>
                } />
                <Route path="/library" element={<AppLibrary />} />
            </Routes>
        </Router>
    );
}

export default App;
