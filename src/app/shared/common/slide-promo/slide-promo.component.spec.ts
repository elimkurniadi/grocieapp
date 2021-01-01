import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SlidePromoComponent } from './slide-promo.component';

describe('SlidePromoComponent', () => {
  let component: SlidePromoComponent;
  let fixture: ComponentFixture<SlidePromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidePromoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SlidePromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
