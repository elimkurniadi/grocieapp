import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SlideBrandComponent } from './slide-brand.component';

describe('SlideBrandComponent', () => {
  let component: SlideBrandComponent;
  let fixture: ComponentFixture<SlideBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideBrandComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SlideBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
