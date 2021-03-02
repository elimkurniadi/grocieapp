import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemListInactiveComponent } from './item-list-inactive.component';

describe('ItemListInactiveComponent', () => {
  let component: ItemListInactiveComponent;
  let fixture: ComponentFixture<ItemListInactiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemListInactiveComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

      fixture = TestBed.createComponent(ItemListInactiveComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
