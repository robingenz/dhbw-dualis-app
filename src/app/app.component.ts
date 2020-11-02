import { Component } from '@angular/core';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  public initializeApp(): void {
    this.platform.ready().then(() => {
      this.initStatusBar();
      Plugins.SplashScreen.hide();
    });
  }

  private initStatusBar(): void {
    if (this.platform.is('android')) {
      Plugins.StatusBar.setStyle({ style: StatusBarStyle.Dark });
      Plugins.StatusBar.setOverlaysWebView({ overlay: false });
    } else if (this.platform.is('ios')) {
      Plugins.StatusBar.setStyle({ style: StatusBarStyle.Light });
    }
  }
}
