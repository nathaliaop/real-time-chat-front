describe('signup and signin', () => {
  const user = {
    username: 'teste',
    email: `teste${Date.now()}@gmail.com`,
    password: 'teste'
  }
  afterEach(() => {
    cy.wait(500);
  })
  it('Cadastra um usuário com sucesso', () => {
    cy.visit('/signup')
    cy.get('[placeholder="Username"]').type(user.username)
    cy.get('[placeholder="Email"]').type(user.email)
    cy.get('[placeholder="Password"]').type(user.password)
    cy.get('.sc-gKXOVf').click()
  })
  it('Tenta cadastrar um usuário já cadastrado', () => {
    cy.visit('/signup')
    cy.get('[placeholder="Username"]').type(user.username)
    cy.get('[placeholder="Email"]').type(user.email)
    cy.get('[placeholder="Password"]').type('teste123')
    cy.get('.sc-gKXOVf').click();
    cy.get('.Toastify__toast-body > :nth-child(2)').should('be.visible').should(warnMessage => {
      expect(warnMessage).contain('User already taken');
    });
  })

  it('Loga um usuário com sucesso', () => {
    cy.visit('/signin')
    cy.get('[placeholder="Email"]').type(user.email)
    cy.get('[placeholder="Password"]').type(user.password)
    cy.get('.sc-gKXOVf').click()
  })

  it('Loga um usuário com email errado', () => {
    cy.visit('/signin')
    cy.get('[placeholder="Email"]').type(`teste${Date.now()}@gmail.com`)
    cy.get('[placeholder="Password"]').type(user.password)
    cy.get('.sc-gKXOVf').click();
    cy.get('.Toastify__toast-body > :nth-child(2)').should('be.visible').should(warnMessage => {
      expect(warnMessage).contain('Email incorrect');
    });
  })

  it('Loga um usuário com senha errada', () => {
    cy.visit('/signin')
    cy.get('[placeholder="Email"]').type(user.email)
    cy.get('[placeholder="Password"]').type(`teste${Date.now()}`)
    cy.get('.sc-gKXOVf').click();
    cy.get('.Toastify__toast-body > :nth-child(2)').should('be.visible').should(warnMessage => {
      expect(warnMessage).contain('Password incorrect');
    });
  })

})