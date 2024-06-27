import React from 'react'
import PostCard from './index'

describe('<PostCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PostCard />)
  })
})