import { browser, by, element, promise } from 'protractor';

export class AppPage {
  public navigateTo(): promise.Promise<any> {
    return browser.get('/');
  }

  public getTitleText(): promise.Promise<string> {
    return element(by.css('app-root ion-header ion-title')).getText();
  }
}
