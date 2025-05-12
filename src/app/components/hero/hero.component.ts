import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  downloadResume(event: Event) {
    event.preventDefault();
    
    // Create a link element
    const link = document.createElement('a');
    
    // Set the download path
    link.href = 'assets/resume/Resume-Anica-Barrios.pdf';
    link.download = 'Anica-Barrios-Resume.pdf';
    
    // Append to the document body
    document.body.appendChild(link);
    
    // Trigger the click
    link.click();
    
    // Clean up
    document.body.removeChild(link);
  }
}