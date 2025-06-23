import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() fullWidth = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() mobileFullWidth = true; // New input for mobile behavior

  getButtonClasses(): string {
    let classes = 'group relative inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none transform hover:-translate-y-0.5 ';
    
    // Size-based classes
    switch (this.size) {
      case 'sm':
        classes += 'px-4 py-2.5 text-sm min-h-[40px] ';
        break;
      case 'md':
        classes += 'px-6 py-3 text-base min-h-[44px] ';
        break;
      case 'lg':
        classes += 'px-8 py-4 text-lg min-h-[48px] ';
        break;
    }
    
    // Width classes - responsive handling
    if (this.fullWidth) {
      classes += 'w-full ';
    } else if (this.mobileFullWidth) {
      classes += 'w-[70%] max-w-xs mx-auto sm:w-auto sm:mx-0 ';
    } else {
      classes += 'w-auto ';
    }
    
    // Disabled state
    if (this.disabled) {
      classes += 'opacity-50 cursor-not-allowed ';
    } else {
      classes += 'hover:shadow-lg hover:scale-105 ';
    }
    
    return classes.trim();
  }
}