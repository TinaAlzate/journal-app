import { logoutFirebase, signInWithEmail, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../store/auth/authSlice";
import { checkingAuthentication, startEmailSignIn, startGoogleSignIn, startLogout } from "../../../store/auth/thunks";
import { clearNotesLogout } from "../../../store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixures";

jest.mock('../../../src/firebase/providers')

describe('Test in Auth Thunks', () => { 

  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks() )

  test('Should invoke "checkingAuthentication"', async() => {
    
    await checkingAuthentication()( dispatch );
    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )

  });

  test('startGoogleSignIn should call ckeckingCredentials and login, if ok', async() => {
    
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue( loginData )

    await startGoogleSignIn()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
  });

  test('startGoogleSignIn should call ckeckingCredentials and login, if error', async() => {
    
    const loginData = { ok: false, errorMessage: 'Google error' };
    await signInWithGoogle.mockResolvedValue( loginData )

    await startGoogleSignIn()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
  });
  
  test('startEmailSignIn should call checkingCredentials and login if ok', async() => {
    
    const dataLogin = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456'};

    await signInWithEmail.mockResolvedValue( dataLogin );

    await startEmailSignIn( formData )( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login( dataLogin ));

  });

  test('startLogout should call logoutFirebase, clearNotes and logout', async() => {
    
    await startLogout()( dispatch );

    expect( logoutFirebase ).toHaveBeenCalled();
    expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
    expect(dispatch).toHaveBeenCalledWith( logout( { errorMessage: null } ) );
  });
  
  
})