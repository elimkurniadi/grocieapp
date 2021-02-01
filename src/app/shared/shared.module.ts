import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './pipes/translate/translate.pipe';
import { DebounceDirective } from './directives/debounce.directive';

@NgModule({
  declarations: [TranslatePipe, DebounceDirective],
  imports: [CommonModule],
  exports: [TranslatePipe, DebounceDirective],
})
export class SharedModule {}
