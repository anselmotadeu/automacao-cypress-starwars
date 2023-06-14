class HomePage {
    visit() {
      cy.visit('starwars-personal-project/index.html');
    }
  
    getTitle() {
      return cy.contains('Star Wars');
    }
  
    getSearchForm() {
      return cy.get('form');
    }
  
    getCharactersSection() {
      return cy.get('.characters');
    }
  
    getSearchInput() {
      return cy.get('input[type="text"]');
    }
  
    getSearchButton() {
      return cy.contains('Buscar');
    }
  
    getClearButton() {
      return cy.contains('Limpar');
    }
  
    getCharacterItems() {
      return cy.get('.characters .item');
    }
  
    getLikeButton() {
      return cy.get('.like');
    }
  
    getDeleteButton() {
      return cy.get('.delete');
    }
  
    getNotFoundMessage() {
      return cy.get('#mensagem-nao-encontrado');
    }
  }
  
  export default HomePage;  