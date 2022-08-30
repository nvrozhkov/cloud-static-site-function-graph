exports.handler = async (event, context) => {
    //dependencies
    const jwt = require('jsonwebtoken');
    const request = require('request');
    const util = require('util');
    const requestWrapper = util.promisify(request);

    //parameters
    const audience = process.env.audience;
    const issuer = process.env.issuer;
    const scopeToCheck = process.env.scopeToCheck;
    const tokenIssuerUrl = process.env.tokenIssuerUrl;

    //By default - disallow all requests untill token is verified
    let body = {
        status: "deny"
    };

    try {
        //Get signingcertificate
        const oauthConfig = await requestWrapper(`${tokenIssuerUrl}/.well-known/openid-configuration`);
        const keyUrl = JSON.parse(oauthConfig.body).jwks_uri;
        const keys = await requestWrapper(keyUrl);
        const key = JSON.parse(keys.body).keys[0].x5c[0];
        const signingCertificate = `-----BEGIN CERTIFICATE-----\n${key}\n-----END CERTIFICATE-----`;

        //verify token
        const token = event.headers["x-access-token"];
        const jwttoken = jwt.verify(token, signingCertificate, {audience: audience, issuer: issuer});
        if (jwttoken.scp.indexOf(scopeToCheck) >= 0) {
            body.status = "allow";
        }
    } catch (e) {
        console.log(e);
    }

    const output = {
        "statusCode": 200,
        "body": JSON.stringify(body)
    }

    return output;
}