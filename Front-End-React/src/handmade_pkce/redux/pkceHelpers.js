import jsSHA from "jssha";

export const generateStateHelper = () => {
    const length = 30;
    let stateValue = "";
    const alphaNumericCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const l = alphaNumericCharacters.length;
    for(var i=0; i<length; i++) {
        stateValue += alphaNumericCharacters.charAt(Math.floor(Math.random()*l));
    }
    return stateValue;
};

export const generateCodeVerifierHelper = () => {
    let codeVerifier = "";
    const randomByteArray = new Uint8Array(32);
    window.crypto.getRandomValues(randomByteArray);
    codeVerifier = base64urlencode(randomByteArray);
    return codeVerifier;
};

export const generateCodeChallengeHelper = (codeVerifier) => {
    if (!codeVerifier || codeVerifier.length < 43 || codeVerifier.length > 128) {
        alert("Invalid codeVerifier. It must be between 43 and 128 characters long.");
        return ""
    }

    let shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(codeVerifier);
    let hash = shaObj.getHash("ARRAYBUFFER");

    let codeChallenge = base64urlencode(new Uint8Array(hash));

    return codeChallenge;
};

function base64urlencode(sourceValue) {
    var stringValue = String.fromCharCode.apply(null, sourceValue);
    var base64encoded = btoa(stringValue);
    var base64urlEncoded = base64encoded.replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    return base64urlEncoded;
};

