afterEach(() => {
  cy.window().then(win => {
    const coverage = win.__coverage__
    if (!coverage) return

    cy.task('coverage', coverage).then(map => {
      cy.writeFile(`coverage/coverage-final.json`, map)
    })
  })
})
