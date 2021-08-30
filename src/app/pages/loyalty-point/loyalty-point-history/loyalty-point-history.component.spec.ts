import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoyaltyPointHistoryComponent } from './loyalty-point-history.component';

describe('LoyaltyPointHistoryComponent', () => {
  let component: LoyaltyPointHistoryComponent;
  let fixture: ComponentFixture<LoyaltyPointHistoryComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoyaltyPointHistoryComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(LoyaltyPointHistoryComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
