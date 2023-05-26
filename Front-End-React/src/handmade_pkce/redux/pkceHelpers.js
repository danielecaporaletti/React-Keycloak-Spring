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

export const generateCodeChallengeHelper = async (codeVerifier) => {
    if (!codeVerifier || codeVerifier.length < 43 || codeVerifier.length > 128) {
        alert("Invalid codeVerifier. It must be between 43 and 128 characters long.");
        return ""
    }
    let codeChallenge = "";
    const textEncoder = new TextEncoder('US-ASCII');
    const encodedValue = textEncoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", encodedValue);
    codeChallenge = base64urlencode(Array.from(new Uint8Array(digest)));
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

