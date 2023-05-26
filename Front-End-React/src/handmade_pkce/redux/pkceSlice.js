import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateStateHelper, generateCodeVerifierHelper, generateCodeChallengeHelper } from './pkceHelpers';

// Action creator asincrono
export const generateCodeChallenge = createAsyncThunk(
  'pkce/generateCodeChallenge',
  async (_, { getState }) => {
    const codeVerifier = getState().pkce.codeVerifier;
    return await generateCodeChallengeHelper(codeVerifier);
  }
);

export const getAccessToken = createAsyncThunk(
  'pkce/getAccessToken',
  async ({ authorizationCode, codeVerifier }, thunkAPI) => {
    const headers = new Headers();
    headers.append('Content-type','application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Accept', 'application/json');

    const body = {
        "grant_type": "authorization_code",
        "client_id": "my-client",
        "code": authorizationCode,
        "code_verifier": codeVerifier,
        "redirect_uri": "http://localhost:3000/login/callback"
    };

    var formBody = [];
    for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const init = {
        method: 'POST',
        headers: headers,
        body: formBody,
        mode: 'cors'
    };

    const response = await fetch("http://localhost:8080/realms/Reame1/protocol/openid-connect/token", init);
    const responseJson = await response.json();

    console.log(responseJson);

    if (response.ok) {
        return responseJson;
    } else {
        return thunkAPI.rejectWithValue(responseJson);
    }
  }
);

export const getResource = createAsyncThunk(
  'pkce/getResource',
  async (accessToken, thunkAPI) => {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + accessToken.access_token);

    const init = {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    };

    console.log(accessToken.access_token);
    console.log(init);

    const response = await fetch('http://localhost:8090/contacts/', init);
    const responseJson = await response.json();
    console.log(responseJson);
    console.log(responseJson.response);

    if (response.ok) {
        return responseJson.response;
    } else {
        return thunkAPI.rejectWithValue(responseJson);
    }
  }
);

const initialState = {
  pkceState: "",
  returnedPkceState: "",
  codeVerifier: "",
  codeChallenge: "",
  authorizationCode: "",
  accessToken: "",
  resource: ""
};

const pkceSlice = createSlice({
    name: 'pkce',
    initialState,
    reducers: {
        resetState: () => initialState,
        generateState: (state) => {
            state.pkceState = generateStateHelper();
        },
        generateCodeVerifier: (state) => {
            state.codeVerifier = generateCodeVerifierHelper();
        },
        setAuthorizationCode: (state, action) => {
            state.authorizationCode = action.payload;
        },
        setReturnedState: (state, action) => {
            state.returnedPkceState = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setResource: (state, action) => {
            state.resource = action.payload;
        },
        // Rest of the reducers...
    },
    extraReducers: (builder) => {
        builder
            .addCase(generateCodeChallenge.fulfilled, (state, action) => {
            state.codeChallenge = action.payload;
            })
            .addCase(getAccessToken.fulfilled, (state, action) => {
            state.accessToken = action.payload;
            })
            .addCase(getResource.fulfilled, (state, action) => {
            state.resource = action.payload;
            });
    },
});
  
export const { resetState, generateState, generateCodeVerifier, setAuthorizationCode, setReturnedState, setAccessToken, setResource } = pkceSlice.actions;

export default pkceSlice.reducer;