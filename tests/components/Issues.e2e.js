import githubFixture from '../fixtures/github'

describe('Issues', () => {
  it('Display', () => {
    cy.server()
    cy.route('**/repos/angular/angular/issues**', githubFixture)

    cy.visit('/')

    cy.get('.issues__issue__title:first').contains(githubFixture[0].title)

    cy.get('.issues__issue__assignee:last').contains(githubFixture[githubFixture.length - 1].assignee.login)
  })
})
