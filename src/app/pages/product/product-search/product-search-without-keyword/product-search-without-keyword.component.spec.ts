import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductSearchWithoutKeywordComponent } from './product-search-without-keyword.component';

describe('ProductSearchWithoutKeywordComponent', () => {
  let component: ProductSearchWithoutKeywordComponent;
  let fixture: ComponentFixture<ProductSearchWithoutKeywordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSearchWithoutKeywordComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSearchWithoutKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
