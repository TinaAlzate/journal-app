import { logoutFirebase, registerWithEmail, signInWithEmail, signInWithGoogle,  } from "../../src/firebase"
import { clearNotesLogout } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication = () => {
  return async( dispatch ) => {

    dispatch( checkingCredentials() )
  }
}

export const startGoogleSignIn = () => {
  return async( dispatch ) => {

    dispatch( checkingCredentials() );

    const result = await signInWithGoogle();
    if( !result.ok ) return dispatch( logout( result.errorMessage ) );

    dispatch( login( result ))
  }
}

export const startRegisterUserEmail = ({ email, password, displayName }) => {
  return async( dispatch ) => {

    dispatch( checkingCredentials() )

    const { ok, uid, photoURL, errorMessage } = await registerWithEmail({ email, password, displayName });

    if( !ok ) return dispatch( logout({ errorMessage }));

    dispatch( login({ uid, displayName, email, photoURL }) )

  }
}

export const startEmailSignIn = ({ email, password }) => {
  return async( dispatch ) => {

    dispatch( checkingCredentials() );

    const result = await signInWithEmail({ email, password });
    if( !result.ok ) return dispatch( logout( result ) );

    dispatch( login( result ) )
  }
}

export const startLogout = () => {
  return async( dispatch ) => {

    await logoutFirebase(),

    dispatch ( clearNotesLogout() )
    dispatch( logout({ errorMessage: null }) );
  }
}