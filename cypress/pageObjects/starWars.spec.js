import HomePage from '../pageObjects/homePage';
import CharacterPage from '../pageObjects/characterPage';

describe('Testes automatizados - Star Wars', () => {
  const homePage = new HomePage();
  const characterPage = new CharacterPage();

  beforeEach(() => {
    homePage.visit();
  });

  it('Verificar a exibição inicial da página', () => {
    homePage.getTitle().should('be.visible');
    homePage.getSearchForm().should('be.visible');
    homePage.getCharactersSection().should('be.visible');
  });

  it('Verificar a funcionalidade de busca', () => {
    const characterName = 'Luke Skywalker';

    homePage.getSearchInput().type(`${characterName}{enter}`).should('be.visible');
    homePage.getCharacterItems().should('have.length', 1);
    characterPage.getCharacterName().contains(characterName).should('be.visible');

    homePage.getSearchInput().clear().type('Darth Vader{enter}');
    homePage.getCharacterItems().should('have.length', 1);
    characterPage.getCharacterName().contains('Darth Vader').should('be.visible');
  });

  it('Pesquisa de personagem que não existe', () => {
    const characterName = 'Han Mestre';

    homePage.getSearchInput().type(`${characterName}{enter}`);
    homePage.getNotFoundMessage().should('be.visible').and('contain', 'Nenhum personagem encontrado com esse nome');
  });

  it('Verificar a funcionalidade de limpar a busca', () => {
    homePage.getSearchInput().type('Luke Skywalker').should('be.visible');
    homePage.getSearchButton().click().should('have.value', '');
    homePage.getClearButton().click();
    homePage.getSearchInput().should('be.empty');
  });

  it('Verificar a funcionalidade de curtir um personagem', () => {
    homePage.getLikeButton().first().should('have.css', 'color', 'rgb(255, 221, 68)');
    homePage.getLikeButton().first().click();
    homePage.getLikeButton().first().should('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('Verificar a funcionalidade de remover um personagem', () => {
    homePage.getCharacterItems().should('have.length', 8);
    homePage.getDeleteButton().first().click();
    homePage.getCharacterItems().should('have.length', 7);
    // Verificar se o personagem removido não é exibido na próxima visita à página (se aplicável)
  });
});
