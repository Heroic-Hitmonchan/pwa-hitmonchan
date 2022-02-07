const router = require('express').Router()
const spotifyWebApi = require('spotify-web-api-node')

// credentials needed to get the tokens.
const credentials = {
    clientId: "12ab9fc82d684679b569135ea050d5d8",
    clientSecret: '3c13d792c46d4c33a76bd6b2e8b5de94',
    redirectUri: "http://localhost:8080/home"
    // redirectUri: "https://moments-pwa.herokuapp.com//home"
};

router.post('/login', (req, res) => {
    //  setup 
    let spotifyApi = new spotifyWebApi(credentials)
    //  Get the "code" value posted from the frontend.    
    const code = req.body.headers.authorization
    // Retrieve an access token & refreshToken from spotify.
    spotifyApi.authorizationCodeGrant(code).then((data) => {
        // Returning the User's AccessToken in the json formate  
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400)
        })
})

router.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    
    let spotifyApi = new spotifyWebApi({
        refreshToken,
        clientId: "12ab9fc82d684679b569135ea050d5d8",
        clientSecret: '3c13d792c46d4c33a76bd6b2e8b5de94',
        redirectUri: "http://localhost:8080/home"
        // redirectUri: "https://moments-pwa.herokuapp.com//home"
    });
    spotifyApi.refreshAccessToken()
        .then((data) => {
            // only recieve accessToken and expiresIn
            res.json({ 
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in
            })
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        })
})

module.exports = router
