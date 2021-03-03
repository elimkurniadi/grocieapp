import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalMaintenanceComponent } from './modal-maintenance.component';

describe('ModalMaintenanceComponent', () => {
  let component: ModalMaintenanceComponent;
  let fixture: ComponentFixture<ModalMaintenanceComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalMaintenanceComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(ModalMaintenanceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
