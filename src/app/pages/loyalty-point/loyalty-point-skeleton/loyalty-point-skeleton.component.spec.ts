import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoyaltyPointSkeletonComponent } from './loyalty-point-skeleton.component';

describe('LoyaltyPointSkeletonComponent', () => {
  let component: LoyaltyPointSkeletonComponent;
  let fixture: ComponentFixture<LoyaltyPointSkeletonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoyaltyPointSkeletonComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(LoyaltyPointSkeletonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
