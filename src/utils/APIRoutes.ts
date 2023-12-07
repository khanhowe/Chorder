const hostname = 'http://localhost:3000';

export enum APIRoutes {
    //Auth
    SIGN_UP = `${hostname}/auth/signup`,
    LOG_IN = `${hostname}/auth/signin`,

    //Chords, POST, GET, DELETE
    CREATE_CHORD = `${hostname}/chords`,
    GET_CHORD = `${hostname}/chords`,
    DELETE_CHORD = `${hostname}/chords`,

    

}