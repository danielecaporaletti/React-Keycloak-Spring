import Keycloak from 'keycloak-js';
import { BASE_URL_KEYCLOAK } from '../config';

const keycloakConfig = {
    url: `${BASE_URL_KEYCLOAK}/`,
    realm: 'Reame1',
    clientId: 'my-client'
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
