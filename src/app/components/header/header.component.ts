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
      this.updateScrollState();
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }
  
  @HostListener('window:scroll')
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
      document.body.style.overflow = this.menuOpen ? 'hidden' : '';
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
          const headerHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    } catch {
      if (selector === '#') {
        window.scrollTo(0, 0);
      } else {
        document.querySelector(selector)?.scrollIntoView();
      }
    }
  }
  
  navigateToAndCloseMenu(selector: string): void {
    this.menuOpen = false;
    
    if (this.isBrowser) {
      document.body.style.overflow = '';
      setTimeout(() => this.navigateTo(selector), 100);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isBrowser) return;

    const target = event.target as HTMLElement;
    const header = target.closest('header');
    
    if (this.menuOpen && !header) {
      this.menuOpen = false;
      document.body.style.overflow = '';
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (!this.isBrowser) return;

    if (this.menuOpen && window.innerWidth >= 1024) {
      this.menuOpen = false;
      document.body.style.overflow = '';
    }
  }

  @HostListener('window:keydown.escape')
  onEscapeKey(): void {
    if (this.menuOpen) {
      this.menuOpen = false;
      if (this.isBrowser) {
        document.body.style.overflow = '';
      }
    }
  }
}