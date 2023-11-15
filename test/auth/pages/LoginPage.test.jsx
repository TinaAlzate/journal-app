import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../store/auth/authSlice";
import { MemoryRouter } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixures";
import { startGoogleSignIn } from "../../../store/auth/thunks";

const mockStartGoogleGignIn = jest.fn();
const mockStartEmailSignIn = jest.fn();

jest.mock("../../../store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleGignIn,
  startEmailSignIn: ({ email, password }) => {
    return () => mockStartEmailSignIn({ email, password });
  },
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  }, preloadedState: {
    auth: notAuthenticatedState,
  }
})

describe('Test in <LoginPage />', () => {

  beforeEach( () => jest.clearAllMocks() )

  test('Should display the component correctly', () => {
    
    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
  });

  test('Google button should call to startGoogleSignIn', () => {
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText('google-btn');
    fireEvent.click( googleBtn );

    expect( mockStartGoogleGignIn ).toHaveBeenCalled()

  });

  test('SubmitLogin should call startEmailSignIn with specific values', () => {
    
    const email = 'valazte618@gmail.com';
    const password = '123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole( 'textbox', { name: 'Email'} );
    fireEvent.change( emailField, { target: { name: 'email', value: email } } );
    
    const passwordField = screen.getByLabelText( 'password-test' );
    fireEvent.change(passwordField, { target: { name: 'password', value: password } });

    const loginForm = screen.getByLabelText( 'submit-form' );
    fireEvent.submit( loginForm );

    expect( mockStartEmailSignIn ).toHaveBeenCalledWith({ email, password });

  });
  
})