/* eslint-disable no-undef */
describe('User Actions', () => {
    before(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('should allow a user to log in', () => {
      // eslint-disable-next-line no-undef
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="password"]').type('password123');
      cy.get('button').contains('Login').click();
      cy.url().should('include', '/home');
      cy.get('.welcome-message').should('contain', 'Welcome, testuser');
    });
  
    it('should allow a logged in user to create a post', () => {
      cy.get('button').contains('Novo Post').click();
      cy.get('input[name="title"]').type('Post de Teste');
      cy.get('textarea[name="description"]').type('Descrição do post de teste');
      cy.get('button').contains('Publicar').click();
      cy.get('.post-list').should('contain', 'Post de Teste');
    });
  
    it('should allow a user to report a post', () => {
      cy.get('.post-card').contains('Post de Teste').within(() => {
        cy.get('button').contains('Denunciar').click();
      });
      cy.get('.report-modal textarea').type('Conteúdo ofensivo');
      cy.get('.report-modal button').contains('Enviar').click();
      cy.get('.confirmation-message').should('contain', 'Denúncia enviada com sucesso');
    });
  });
  