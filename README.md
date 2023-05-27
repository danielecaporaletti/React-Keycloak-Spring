**Note: This document is available in two languages, English and Italian.**

# Local Installation

The project uses Docker Compose to simplify the launching of the necessary services. You can start the entire stack with a single command from the project root:

```
docker-compose up -d
```

This action will start four Docker containers:

1. Front-end (React)
2. Keycloak (Authentication Server)
3. Keycloak's Database (Postgres)
4. Back-end (Spring)

Below is a schematic that illustrates the organization of the containers:

![Container schema](./assetsReadme/React-Keycloak-Spring.png "Container schema")

# Application Operation

The application can be accessed at http://localhost:80 from any browser.

Upon login, you will have two options: guided authentication and automatic authentication.

## 1) Guided Authentication

For guided authentication, I have implemented a code flow that simplifies the steps of authentication:

![OAuth2.0 Authorization Code Flow](./assetsReadme/Autentication-Flow.png "OAuth2.0 Flow PKCE")

The authentication flow is as follows:

1. The user initiates the process by requesting access to their resources within the React application. The React application, functioning as a client, responds by generating a "code challenge" through the PKCE protocol and saves it for comparison at a later stage.
2. The React application redirects the user to the authentication server (Keycloak) to provide their credentials.
3. The user submits their credentials to Keycloak along with the "code challenge" generated by the client. Keycloak verifies the user's identity and stores the "code challenge" for later comparison.
4. Public Client (React): Once the user's identity is confirmed, Keycloak sends an authorization code to the React application.
5. The React application responds by sending the "code verifier" (the original version of the PKCE challenge code), the received authorization code, and the client ID to Keycloak. This step serves to request an access token.
6. Keycloak generates a hash from the received "code verifier" and compares it with the previously stored "code challenge". If they match, Keycloak issues an access token to the client.
7. The React application now has a valid access token that can be used to make requests to the resource server (Spring), requesting the user's resources.
8. Spring verifies the authenticity of the access token and, if valid, provides the requested resources to the React application.

## 2) Automatic Authentication

For automatic authentication, I used the `keycloak-js` library for React and implemented PKCE authentication based on the official library documentation:

[Link to the documentation](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter)



# Installazione in locale

Il progetto utilizza Docker Compose per semplificare l'avvio dei servizi necessari. Puoi avviare l'intero stack con un singolo comando dalla root del progetto:

```
docker-compose up -d
```

Questa azione avvierà quattro container Docker:
1. Front-end (React)
2. Keycloak (Server di autenticazione)
3. Database per Keycloak (Postgres)
4. Back-end (Spring)

Di seguito è riportato uno schema che illustra l'organizzazione dei container:

![Schema dei container](./assetsReadme/React-Keycloak-Spring.png "Schema dei container")

# Funzionamento dell'applicazione

L'applicazione è raggiungibile all'indirizzo http://localhost:80 da qualsiasi browser.

Dopo l'accesso, avrai due opzioni: l'autenticazione guidata e l'autenticazione automatica.

## 1) Autenticazione guidata

Per l'autenticazione guidata, ho implementato un flusso di codice che semplifica i passaggi dell'autenticazione:

![Flusso del Codice di Autorizzazione OAuth2.0](./assetsReadme/Autentication-Flow.png "OAuth2.0 Flow PKCE")

Il flusso di autenticazione è come segue:

1. L'utente avvia l'azione richiedendo di accedere alle sue risorse all'interno dell'applicazione React. L'applicazione React, funzionando come client, risponde generando un "code challenge" (codice di sfida) tramite il protocollo PKCE e lo conserva per confrontarlo in un momento successivo.
2. L'applicazione React reindirizza l'utente al server di autenticazione (Keycloak) affinché fornisca le proprie credenziali.
3. L'utente presenta le proprie credenziali a Keycloak insieme al "code challenge" generato dal client. Keycloak verifica l'identità dell'utente e conserva il "code challenge" per un confronto successivo.
4. Client Pubblico (React): Una volta confermata l'identità dell'utente, Keycloak invia un codice di autorizzazione all'applicazione React.
5. L'applicazione React risponde inviando il "code verifier" (la versione originale del codice di sfida PKCE), il codice di autorizzazione ricevuto e l'ID del client a Keycloak. Questo passaggio serve per richiedere un token di accesso.
6. Keycloak genera un hash dal "code verifier" ricevuto e lo confronta con il "code challenge" conservato precedentemente. Se corrispondono, Keycloak rilascia un token di accesso al client.
7. L'applicazione React ora ha un token di accesso valido che può essere utilizzato per fare richieste al server delle risorse (Spring), richiedendo le risorse dell'utente.
8. Spring verifica l'autenticità del token di accesso e, se è valido, fornisce le risorse richieste all'applicazione React.

## 2) Autenticazione automatica

Per l'autenticazione automatica, ho utilizzato la libreria `keycloak-js` per React e ho implementato l'autenticazione PKCE basandomi sulla documentazione ufficiale della libreria:

[Link alla documentazione](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter)
