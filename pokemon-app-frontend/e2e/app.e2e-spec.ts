import { PokemonAppFrontendPage } from './app.po';

describe('pokemon-app-frontend App', () => {
  let page: PokemonAppFrontendPage;

  beforeEach(() => {
    page = new PokemonAppFrontendPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
