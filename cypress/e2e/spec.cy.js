import { cy } from 'cypress'

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/services')
  })
})