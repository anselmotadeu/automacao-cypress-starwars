class CharacterPage {
    getCharacterAvatar() {
      return cy.get('.characters .item img');
    }
  
    getCharacterName() {
      return cy.get('.characters .item p');
    }
  
    getLikedCharacterAvatar() {
      return cy.get('.characters .item.liked img');
    }
  
    getDeletedCharacterAvatar() {
      return cy.get('.characters .item.deleted img');
    }
  }
  
  export default CharacterPage;
  