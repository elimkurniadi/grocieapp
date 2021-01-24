import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '@shared/services';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {
  @ViewChildren('formRow', { read: ElementRef }) rows: any;

  fg: FormGroup;
  formInput = ['input1', 'input2', 'input3', 'input4'];

  constructor(private router: Router, private gs: GlobalService) {
    this.fg = this.generateForm(this.formInput);
  }

  ngOnInit() {}

  verifyOtp() {
    if (this.fg.valid) {
      this.gs.log('success', this.fg.value);
      this.router.navigate(['/change-password', 'set-password']);
    }
  }
  generateForm(elements) {
    const group: any = {};
    elements.forEach((key) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  keyUpEvent(event, index) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.setFocus();
    }
  }
}
