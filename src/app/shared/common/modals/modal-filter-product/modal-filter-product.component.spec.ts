import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalFilterProductComponent } from './modal-filter-product.component';

describe('ModalFilterProductComponent', () => {
  let component: ModalFilterProductComponent;
  let fixture: ComponentFixture<ModalFilterProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFilterProductComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFilterProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
