const config = {
  Auth: {
    region: process.env.REACT_APP_AMPLIFY_REGION || 'us-east-1',
    userPoolId: process.env.REACT_APP_AMPLIFY_USERPOOL_ID || '',
    userPoolWebClientId: process.env.REACT_APP_AMPLIFY_APP_CLIENT_ID || '',
    oauth: {
      domain: process.env.REACT_APP_AMPLIFY_AUTH_DOMAIN || '',
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: window.location.origin + '/login',
      redirectSignOut: window.location.origin + '/login',
      responseType: 'code'
    }
  }
}

export default config
