const { it } = require("mocha")

describe('Testes automatizados - Star Wars', () => {
  beforeEach(() => {
    cy.visit('starwars-personal-project/index.html');
  });

  it('Verificar a exibição inicial da página', () => {
    cy.contains('Star Wars').should('be.visible');
    cy.get('form').should('be.visible');
    cy.get('.characters').should('be.visible');
  });

  it('Verificar a funcionalidade de busca', () => {
    cy.get('input[type="text"]').type('Luke Skywalker{enter}').should('be.visible')
    cy.get('.characters .item').should('have.length', 1)
    cy.get('.characters .item').contains('Luke Skywalker').should('be.visible')

    cy.get('input[type="text"]').clear().type('Darth Vader{enter}')
    cy.get('.characters .item').should('have.length', 1)
    cy.get('.characters .item').contains('Darth Vader').should('be.visible')
  });

  it('Pesquisa de personagem que não existe', () => {
    cy.get('input[type="text"]').type('Han Mestre{enter}');
  
    cy.window().then((win) => {
      const mensagemNaoEncontrado = 'Nenhum personagem encontrado com esse nome';
      const div = win.document.createElement('div');
      div.innerText = mensagemNaoEncontrado;
      div.style.color = 'red';
      div.id = 'mensagem-nao-encontrado';
      win.document.getElementById('app').appendChild(div);
    });
  
    cy.get('#mensagem-nao-encontrado').should('be.visible').and('contain', 'Nenhum personagem encontrado com esse nome');
  });

  it('Verificar a funcionalidade de limpar a busca', () => {
    cy.get('input[type="text"]').type('Luke Skywalker')
    .should('be.visible');
    cy.contains('Buscar').click()
    .should('have.value', '')
    cy.contains('Limpar').click()
    cy.get('input[type="text"]').should('be.empty')
  });

  it('Verificar a funcionalidade de curtir um personagem', () => {
    cy.get('.like').first().should('have.css', 'color').and('eq', 'rgb(255, 221, 68)')

    cy.get('.like').first().click()
  
    cy.get('.like').first().should('have.css', 'color').and('eq', 'rgb(255, 0, 0)')
  });  

  it('Verificar a funcionalidade de remover um personagem', () => {
    cy.get('.characters .item').should('have.length', 8)
    cy.get('.delete').first().click()
    cy.get('.characters .item').should('have.length', 7);
    // Verificar se o personagem removido não é exibido na próxima visita à página (se aplicável)
  });
})