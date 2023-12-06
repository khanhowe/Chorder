const hostname = 'http://localhost:3000';

export enum APIRoutes {
    SIGN_UP = `${hostname}/auth/signup`,
    LOG_IN = `${hostname}/auth/signin`,
}