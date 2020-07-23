//Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '516fc4e8d5'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`
//https://i47dt68ha7.execute-api.us-east-2.amazonaws.com/dev
export const authConfig = {
  //Create an Auth0 application and copy values from it into this map
  domain: 'gauravhanda.us.auth0.com',               //domain: Auth0 Domain
  clientId: 'hz1kkrv5eLtLT4sBlJdRTcQkfJM0I0eY',   //clientId: Auth0 Client ID
  callbackUrl: 'http://localhost:3000/callback'
}
