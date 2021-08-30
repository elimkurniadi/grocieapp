import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreLocationSkeletonComponent } from './store-location-skeleton.component';

describe('StoreLocationSkeletonComponent', () => {
  let component: StoreLocationSkeletonComponent;
  let fixture: ComponentFixture<StoreLocationSkeletonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StoreLocationSkeletonComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(StoreLocationSkeletonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
