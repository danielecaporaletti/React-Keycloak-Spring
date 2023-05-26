import React, { useEffect, useState } from 'react';
import axios from 'axios';
import keycloak from './keycloak-config';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { Alert } from 'react-bootstrap';

const AppLibrary = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});
    const [resources, setResources] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeKeycloak = async () => {
            try {
                const authenticated = await keycloak.init({ 
                    onLoad: 'check-sso',
                    responseMode: 'fragment',
                    flow: 'standard',
                    pkceMethod: 'S256'
                });

                if (authenticated) {
                    console.log("Authenticated");
                    setUserDetails({
                        email: keycloak.tokenParsed.email,
                        name: keycloak.tokenParsed.name,
                        surname: keycloak.tokenParsed.surname,
                        roles: keycloak.tokenParsed.realm_access.roles
                    });
                } else {
                    console.log("Not authenticated");
                }

                // React to the refresh token promise
                keycloak.onAuthRefreshSuccess = () => {
                    console.log('Token refreshed successfully');
                };
                
                keycloak.onAuthRefreshError = () => {
                    console.error('Failed to refresh the token, or the session was expired');
                };
            } catch (error) {
                console.error("Authenticated Failed", error);
            }
        };

        initializeKeycloak();
    }, []);

    const handleLogout = () => {
        setUserDetails({});
        keycloak.logout();
    }

    const fetchResources = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8090/contacts/', {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`
                }
            });
            setResources(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    const ColorizedDetail = ({ value }) => {
        if (value && value !== 'N/A') {
            return <span className="text-success">{value}</span>
        }
        return value;
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="d-flex flex-column align-items-center">
                    <Card className="w-100 mb-4 shadow" style={{ maxWidth: "550px" }}>
                        <Card.Body>
                            <h2 className="text-center mb-4">Keycloak Authentication with React</h2>
                            <div className="text-center mb-4">
                            <Button variant="primary" onClick={() => keycloak.login()}>Start Authorization</Button>
                            </div>
                            <div className="text-center">
                            <Card.Text>
                                Email dell'utente: <ColorizedDetail value={userDetails.email || 'N/A'} />
                            </Card.Text>
                            <Card.Text>
                                Nome e Cognome dell'utente: <ColorizedDetail value={userDetails.name || 'N/A'} />
                            </Card.Text>
                            <Card.Text>
                                Ruolo dell'utente: <ColorizedDetail value={userDetails.roles ? userDetails.roles.join(', ') : 'N/A'} />
                            </Card.Text>
                            <LogoutButton onLogout={handleLogout} disabled={!userDetails.email} />
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="w-100 mb-4 shadow" style={{ maxWidth: "550px" }}>
                        <Card.Body>
                            <h3 className="text-center mb-4">User Credential</h3>
                            <div className="text-center">
                            <Card.Text>
                                Email dell'utente: <b>happy@email.com</b>
                            </Card.Text>
                            <Card.Text>
                                Password: <b>12345</b>
                            </Card.Text>
                            <Button 
                                variant="primary"
                                onClick={() => {
                                navigate("/");
                                }}
                            >
                                Back to home
                            </Button>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="w-100 mb-4 shadow" style={{ maxWidth: "550px" }}>
                        <Card.Body>
                            <h3 className="text-center mb-4">Contact Resources</h3>
                            <div className="text-center">
                                <Button variant="primary" onClick={fetchResources}>
                                    Get RESOURCES
                                </Button>
                                {loading && <p>Loading...</p>}
                                {error && <Alert variant="danger">{error}</Alert>}
                                {resources && (
                                    <Alert variant="success" className="text-center mt-3 text-break">
                                        <h4 className="font-weight-bold">{resources.response}</h4>
                                    </Alert>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
            
    </>
    );
}

export default AppLibrary;
