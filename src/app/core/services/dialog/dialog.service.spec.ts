import { TestBed } from '@angular/core/testing';
import {
  AlertController,
  AngularDelegate,
  LoadingController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalController, AlertController, LoadingController, PopoverController, AngularDelegate],
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
