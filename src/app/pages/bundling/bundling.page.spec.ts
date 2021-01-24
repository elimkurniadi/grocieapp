import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BundlingPage } from './bundling.page';

describe('BundlingPage', () => {
  let component: BundlingPage;
  let fixture: ComponentFixture<BundlingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundlingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BundlingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
