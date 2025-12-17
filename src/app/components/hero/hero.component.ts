import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  typingTexts = [
    "Full Stack Developer",
    "React Specialist", 
    "Angular Expert",
    "MERN Stack Developer",
    "Flutter Developer",
    "UI/UX Enthusiast"
  ];
  
  currentTypingText = '';
  showCursor = true;
  skillTags = ['React', 'Angular', 'Node.js', 'Flutter', 'MongoDB', 'TypeScript'];
  
  isMobile = false;
  
  private typingInterval: any;
  private cursorInterval: any;
  private textIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.checkScreenSize();
      this.startTypingAnimation();
      this.startCursorBlink();
    }
  }

  ngOnDestroy(): void {
    if (this.typingInterval) clearInterval(this.typingInterval);
    if (this.cursorInterval) clearInterval(this.cursorInterval);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) this.checkScreenSize();
  }

  private checkScreenSize(): void {
    if (!this.isBrowser) return;
    this.isMobile = window.innerWidth < 640;
  }

  private startTypingAnimation(): void {
    this.typingInterval = setInterval(() => this.typeText(), 100);
  }

  private startCursorBlink(): void {
    this.cursorInterval = setInterval(() => {
      this.showCursor = !this.showCursor;
    }, 530);
  }

  private typeText(): void {
    const currentText = this.typingTexts[this.textIndex];
    
    if (this.isDeleting) {
      this.currentTypingText = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.currentTypingText = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }
    
    let typeSpeed = this.isDeleting ? 50 : 100;
    
    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.typingTexts.length;
      typeSpeed = 200;
    }
    
    clearInterval(this.typingInterval);
    this.typingInterval = setTimeout(() => this.startTypingAnimation(), typeSpeed);
  }

  onSkillHover(skill: string): void {
    // Optional: Add skill hover functionality
  }

  onSkillLeave(): void {
    // Optional: Add skill leave functionality
  }

  scrollToContact(): void {
    this.smoothScrollTo('#contact');
  }

  scrollToContent(): void {
    const nextSection = document.querySelector('#about, #skills, .next-section');
    if (nextSection) {
      this.smoothScrollToElement(nextSection);
    } else {
      this.smoothScrollBy(window.innerHeight);
    }
  }

  private smoothScrollTo(selector: string): void {
    const element = document.querySelector(selector);
    if (element) this.smoothScrollToElement(element);
  }

  private smoothScrollToElement(element: Element): void {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }

  private smoothScrollBy(distance: number): void {
    window.scrollBy({ top: distance, behavior: 'smooth' });
  }

  downloadResume(event: Event): void {
    event.preventDefault();
    
    try {
      const link = document.createElement('a');
      link.href = '/resume/Resume-Anica-Barrios.pdf';
      link.download = 'Anica-Barrios-Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Resume download failed:', error);
    }
  }
}