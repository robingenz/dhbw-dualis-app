import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should contain the correct title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toContain('Login');
  });
});
