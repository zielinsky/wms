import {auth} from "../../firebase"

export const createUser = (email : string, password : string, displayName : string) : void => {
    auth.createUser({
        email: email,
        password: password,
        displayName: displayName,
        disabled: false,
    })
    .then((userRecord) => {
        console.log('Successfully created new user:', userRecord.uid);
    })
    .catch((error) => {
        console.log('Error creating new user:', error);
    });
}

export const deleteUser = (uid : string) : void => {
    auth.deleteUser(uid)
    .then(() => {
        console.log('Successfully deleted user:', uid);
    })
    .catch((error) => {
        console.log('Error deleteing user:', error);
    });
}

