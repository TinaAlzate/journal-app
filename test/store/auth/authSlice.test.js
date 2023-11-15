import { authSlice, checkingCredentials, login, logout } from "../../../store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixures";

describe('Test in authSlice', () => { 

  test('Should return to the initialState and be named "auth"', () => {

    const state = authSlice.reducer( initialState, {} )

    expect( authSlice.name ).toBe('auth')
    expect( state ).toEqual( initialState )

  });
  
  test('Should do the authentication', () => {
    
    const state = authSlice.reducer( initialState, login( demoUser))
    expect( state ).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    })
  });

  test('Should do the logout without arguments', () => {

    const state = authSlice.reducer( authenticatedState, logout())
    expect( state ).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    })
  });

  test('Should do the logout with arguments', () => {

    const errorMessage= 'Invalid credentials'
    const state = authSlice.reducer( authenticatedState, logout( { errorMessage } ) )
    expect( state ).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage,
    })
  });

  test('Should change the state to "checking"', () => {

    const state = authSlice.reducer( authenticatedState, checkingCredentials() )

    expect( state.status ).toBe('checking')
    
  });
  

})