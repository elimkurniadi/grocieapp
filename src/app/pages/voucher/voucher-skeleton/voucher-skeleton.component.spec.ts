import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoucherSkeletonComponent } from './voucher-skeleton.component';

describe('VoucherSkeletonComponent', () => {
  let component: VoucherSkeletonComponent;
  let fixture: ComponentFixture<VoucherSkeletonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VoucherSkeletonComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(VoucherSkeletonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
