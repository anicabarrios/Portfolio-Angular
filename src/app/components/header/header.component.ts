import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  scrolled = false;
  menuOpen = false;
  
  navItems = [
    { name: 'Home', url: '#' },
    { name: 'About', url: '/about' },
    { name: 'Skills', url: '#skills' },
    { name: 'Projects', url: '#projects' },
  ];
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 20;
  }
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
  navigateTo(selector: string) {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  navigateToAndCloseMenu(selector: string) {
    this.toggleMenu();
    this.navigateTo(selector);
  }
}