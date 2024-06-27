import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../../src/components/LoginPage';
import { AuthContext } from '../../src/AuthContext';

const AuthProviderMock = ({ children, isAuthenticated = false }) => (
  <AuthContext.Provider value={{ isAuthenticated }}>
    {children}
  </AuthContext.Provider>
);

describe('<LoginPage />', () => {
  it('renders', () => {
    cy.mount(
      <MemoryRouter>
        <AuthProviderMock isAuthenticated={false}>
          <LoginPage />
        </AuthProviderMock>
      </MemoryRouter>
    );
    cy.get('h1').contains('Login').should('be.visible');
  });

  it('should allow user to type email and password', () => {
    cy.mount(
      <MemoryRouter>
        <AuthProviderMock isAuthenticated={false}>
          <LoginPage />
        </AuthProviderMock>
      </MemoryRouter>
    );

    cy.get('input#email').type('test@example.com');
    cy.get('input#password').type('password123');
    cy.get('button').contains('Entrar').click();

    cy.get('input#email').should('have.value', 'test@example.com');
    cy.get('input#password').should('have.value', 'password123');
  });

  it('should display error message on invalid login', () => {
    cy.mount(
      <MemoryRouter>
        <AuthProviderMock isAuthenticated={false}>
          <LoginPage />
        </AuthProviderMock>
      </MemoryRouter>
    );

    cy.get('input#email').type('invalid@example.com');
    cy.get('input#password').type('wrongpassword');
    cy.get('button').contains('Entrar').click();

    // Verificar se a mensagem de erro está visível
    cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Erro ao logar. Tente novamente.');
  });

  it('should open subscribe modal when clicking "Novo Cadastro"', () => {
    cy.mount(
      <MemoryRouter>
        <AuthProviderMock isAuthenticated={false}>
          <LoginPage />
        </AuthProviderMock>
      </MemoryRouter>
    );

    cy.get('span').contains('Novo Cadastro').click();
    cy.get('[role="dialog"]').should('be.visible');
  });
});
