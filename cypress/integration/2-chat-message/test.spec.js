describe('send chat message', () => {
  const user = {
    username: 'teste',
    email: `teste${Date.now()}@gmail.com`,
    password: 'teste'
  }
  const message = {
    text: 'Eu sou uma mensagem elegante',
    textEdited: 'Eu sou uma mensagem editada'
  }
  before(() => {
    cy.signup(user)
  })
  afterEach(() => {
    cy.wait(500);
  })
  
  it('Manda uma mensagem com sucesso', () => {
    cy.visit('/')
    cy.get('.sc-jSMfEi').type(message.text)
    cy.get('.sc-hKMtZM > .sc-gKXOVf').click()
    cy.wait(1000);
    cy.get(':nth-last-child(1) > [style="display: flex; flex-direction: row; justify-content: space-between;"] > .sc-papXJ').should(lastMessage => {
      cy.log(lastMessage);
      expect(lastMessage)
    });
  })

  it('Edita uma mensagem com sucesso', () => {
    cy.get(':nth-last-child(1) > [style="display: flex; flex-direction: row; justify-content: space-between;"] > div > [viewBox="0 0 24 24"] > g > [d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"]')
    .click()
    cy.get('.MuiBox-root > form > .sc-jSMfEi')
    .clear().type(message.textEdited)
    cy.get('.MuiBox-root > form > .sc-gKXOVf')
    .click()
  });

  it('Deleta uma mensagem com sucesso', () => {
    cy.get('[viewBox="0 0 448 512"] > path').click()
  })

})