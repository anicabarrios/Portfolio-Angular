import { Component, HostListener, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  scrolled = false;
  menuOpen = false;
  private ticking = false;
  private readonly isBrowser: boolean;
  
  navItems = [
    { name: 'Home', url: '#' },
    { name: 'About', url: '#about' },
    { name: 'Skills', url: '#skills' },
    { name: 'Projects', url: '#projects' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Initialize scroll state
      this.updateScrollState();
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (!this.isBrowser) return;
    
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.updateScrollState();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  private updateScrollState(): void {
    const scrollThreshold = 20;
    const currentScrolled = window.pageYOffset > scrollThreshold;
    
    if (this.scrolled !== currentScrolled) {
      this.scrolled = currentScrolled;
    }
  }
  
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    
    if (this.isBrowser) {
      // Prevent body scroll when menu is open on mobile
      if (this.menuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }
  
  navigateTo(selector: string): void {
    if (!this.isBrowser) return;

    try {
      if (selector === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.querySelector(selector);
        if (element) {
          // Account for fixed header height
          const headerHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    } catch (error) {
      // Fallback for browsers that don't support smooth scrolling
      if (selector === '#') {
        window.scrollTo(0, 0);
      } else {
        const element = document.querySelector(selector);
        if (element) {
          element.scrollIntoView();
        }
      }
    }
  }
  
  navigateToAndCloseMenu(selector: string): void {
    this.menuOpen = false;
    
    if (this.isBrowser) {
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Small delay to allow menu close animation
      setTimeout(() => this.navigateTo(selector), 100);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isBrowser) return;

    const target = event.target as HTMLElement;
    const header = target.closest('header');
    
    // Close mobile menu when clicking outside
    if (this.menuOpen && !header) {
      this.menuOpen = false;
      document.body.style.overflow = '';
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    if (!this.isBrowser) return;

    // Close mobile menu on resize (when switching to desktop view)
    if (this.menuOpen && window.innerWidth >= 1024) {
      this.menuOpen = false;
      document.body.style.overflow = '';
    }
  }

  @HostListener('window:keydown.escape', ['$event'])
  onEscapeKey(): void {
    if (this.menuOpen) {
      this.menuOpen = false;
      if (this.isBrowser) {
        document.body.style.overflow = '';
      }
    }
  }
}