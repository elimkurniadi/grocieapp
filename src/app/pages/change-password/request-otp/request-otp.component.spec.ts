import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';

import { RequestOtpComponent } from './request-otp.component';

describe('RequestOtpComponent', () => {
  let component: RequestOtpComponent;
  let fixture: ComponentFixture<RequestOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestOtpComponent],
      imports: [IonicModule.forRoot(), SharedModule, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
