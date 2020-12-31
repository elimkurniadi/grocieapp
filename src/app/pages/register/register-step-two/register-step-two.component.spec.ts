import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterStepTwoComponent } from './register-step-two.component';

describe('RegisterStepTwoComponent', () => {
  let component: RegisterStepTwoComponent;
  let fixture: ComponentFixture<RegisterStepTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterStepTwoComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule, ReactiveFormsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
