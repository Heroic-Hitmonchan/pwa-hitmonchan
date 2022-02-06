const router = require('express').Router()


const spotifyWebApi =  require('spotify-web-api-node')

const credentials = {
    clientId: "12ab9fc82d684679b569135ea050d5d8",
    clientSecret: '3c13d792c46d4c33a76bd6b2e8b5de94',
    redirectUri: "http://localhost:8080/home"
  };

router.post('/', (req,res) => {
    //  setup 
        let spotifyApi = new spotifyWebApi(credentials)
    
    //  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api     
        const code = req.body.headers.authorization
        // console.log("hello code = ", code)
    
        // Retrieve an access token & refreshToken.
        spotifyApi.authorizationCodeGrant(code).then((data) => {
            // console.log(data)
            // Returning the User's AccessToken in the json formate  
            res.json({
                accessToken : data.body.access_token,
                refreshToken : data.body.refresh_token,
                expiresIn : data.body.expires_in
            }) 
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400)
        })
    
    })

    module.exports = router
