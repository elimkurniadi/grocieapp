import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoucherBuySuccessComponent } from './voucher-buy-success.component';

describe('VoucherBuySuccessComponent', () => {
  let component: VoucherBuySuccessComponent;
  let fixture: ComponentFixture<VoucherBuySuccessComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VoucherBuySuccessComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(VoucherBuySuccessComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
