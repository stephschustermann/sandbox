import auth0 from 'auth0-js';
import history from './history';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'dev-7rd8wtfp.auth0.com',
        clientID: 'XChN97mN6qCBuzsvMMMxeL2pahYuPO1u',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid profile email'
    })

    login = () => {
        this.auth0.authorize();
    }

    handleAuth = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult) {
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.id_token);

                let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
                localStorage.setItem('expiresAt', expiresAt);
                setTimeout(() => { history.replace('/authcheck')}, 200);

            } else {
                console.log(err);
            }
        })
    }

    logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expiresAt');
    }

    isAuthenticated = () => {
        let expiresAt = JSON.parse(localStorage.getItem('expiresAt'));
        const result = new Date().getTime() < expiresAt;
        console.log(`isAuthenticated ${result}`);
        return result;
    }
}