import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductSearchWithKeywordComponent } from './product-search-with-keyword.component';

describe('ProductSearchWithKeywordComponent', () => {
  let component: ProductSearchWithKeywordComponent;
  let fixture: ComponentFixture<ProductSearchWithKeywordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSearchWithKeywordComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSearchWithKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
