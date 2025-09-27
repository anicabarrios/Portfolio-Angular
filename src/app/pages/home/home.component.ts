import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  HostListener,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from "../../components/hero/hero.component";
import { SkillsComponent } from '../../components/skills/skills.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AboutComponent } from "../../components/about/about.component";

interface ComponentsVisibility {
  hero: boolean;
  about: boolean;
  skills: boolean;
  projects: boolean;
  contact: boolean;
  footer: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    HeroComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
    AboutComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('skillsSection') skillsSection!: ElementRef;
  @ViewChild('projectsSection') projectsSection!: ElementRef;
  @ViewChild('contactSection') contactSection!: ElementRef;
  @ViewChild('footerSection') footerSection!: ElementRef;

  pageLoaded = false;
  animationsEnabled = true;
  showBackToTop = false;
  scrollProgress = 0;

  componentsVisible: ComponentsVisibility = {
    hero: false,
    about: false,
    skills: false,
    projects: false,
    contact: false,
    footer: false
  };

  private readonly isBrowser: boolean;
  private intersectionObserver?: IntersectionObserver;
  private loadingTimer?: ReturnType<typeof setTimeout>;
  private ticking = false;
  private animatedComponents = new Set<string>();

  // Section mapping with staggered delays
  private readonly sectionMap = new Map<string, { key: keyof ComponentsVisibility; delay: number }>([
    ['about-section', { key: 'about', delay: 200 }],
    ['skills-section', { key: 'skills', delay: 400 }],
    ['projects-section', { key: 'projects', delay: 600 }],
    ['contact-section', { key: 'contact', delay: 800 }],
    ['footer-section', { key: 'footer', delay: 1000 }]
  ]);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.initializeScrollBehavior();
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      document.body.classList.add('angular-ready');
      this.initializeBrowser();
    } else {
      this.handleSSR();
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.animationsEnabled) {
      setTimeout(() => this.setupIntersectionObserver(), 150);
    }
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private initializeScrollBehavior(): void {
    if (this.isBrowser && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }

  private initializeBrowser(): void {
    this.animationsEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!this.animationsEnabled) {
      this.showAllContentImmediately();
      return;
    }

    this.startLoadingSequence();
  }

  private handleSSR(): void {
    this.pageLoaded = true;
    this.setAllComponentsVisible(true);
  }

  private startLoadingSequence(): void {
    this.pageLoaded = false;
    this.setAllComponentsVisible(false);

    setTimeout(() => window.scrollTo(0, 0), 0);
    this.loadingTimer = setTimeout(() => this.completeLoading(), 1200);
  }

  private completeLoading(): void {
    this.pageLoaded = true;
    this.cdr.detectChanges();

    setTimeout(() => this.showHeroSection(), 100);
  }

  private showHeroSection(): void {
    this.componentsVisible.hero = true;
    this.animatedComponents.add('hero');

    const heroEl = this.heroSection?.nativeElement as HTMLElement;
    if (heroEl) {
      heroEl.classList.add('visible-after-loader');
    }

    this.cdr.detectChanges();
  }

  private showAllContentImmediately(): void {
    this.pageLoaded = true;
    this.setAllComponentsVisible(true);

    Object.keys(this.componentsVisible).forEach(comp => {
      this.animatedComponents.add(comp);
    });

    setTimeout(() => {
      const heroEl = this.heroSection?.nativeElement as HTMLElement;
      if (heroEl) {
        heroEl.classList.add('visible-after-loader');
      }
    }, 0);

    this.cdr.detectChanges();
  }

  private setAllComponentsVisible(visible: boolean): void {
    this.componentsVisible = {
      hero: visible,
      about: visible,
      skills: visible,
      projects: visible,
      contact: visible,
      footer: visible
    };
  }

  private setupIntersectionObserver(): void {
    const options: IntersectionObserverInit = {
      threshold: [0.1, 0.25],
      rootMargin: '0px 0px -80px 0px'
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
          this.handleIntersection(entry.target);
        }
      });
    }, options);

    this.observeSections();
  }

  private observeSections(): void {
    const sections = [
      this.aboutSection?.nativeElement,
      this.skillsSection?.nativeElement,
      this.projectsSection?.nativeElement,
      this.contactSection?.nativeElement,
      this.footerSection?.nativeElement
    ].filter(Boolean);

    sections.forEach(element => {
      if (this.intersectionObserver) {
        this.intersectionObserver.observe(element);
        element.style.willChange = 'transform, opacity';
      }
    });
  }

  private handleIntersection(target: Element): void {
    const sectionInfo = this.getSectionInfo(target);

    if (sectionInfo && !this.animatedComponents.has(sectionInfo.key)) {
      setTimeout(() => {
        this.componentsVisible[sectionInfo.key] = true;
        this.animatedComponents.add(sectionInfo.key);
        this.cdr.detectChanges();

        setTimeout(() => {
          (target as HTMLElement).style.willChange = 'auto';
        }, 1000);

      }, Math.min(sectionInfo.delay, 200));

      this.intersectionObserver?.unobserve(target);
    }
  }

  private getSectionInfo(target: Element): { key: keyof ComponentsVisibility; delay: number } | null {
    const classList = Array.from(target.classList);

    for (const [className, sectionInfo] of this.sectionMap) {
      if (classList.includes(className)) {
        return sectionInfo;
      }
    }

    return null;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser || this.ticking) return;

    this.ticking = true;
    requestAnimationFrame(() => {
      this.updateScrollEffects();
      this.ticking = false;
    });
  }

  private updateScrollEffects(): void {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    this.scrollProgress = documentHeight > 0 ?
      Math.min(Math.max((scrollTop / documentHeight) * 100, 0), 100) : 0;

    const newShowBackToTop = scrollTop > 500;
    if (newShowBackToTop !== this.showBackToTop) {
      this.showBackToTop = newShowBackToTop;
    }
  }

  scrollToTop(): void {
    if (this.isBrowser) {
      const scrollOptions: ScrollToOptions = {
        top: 0,
        behavior: 'smooth'
      };

      try {
        window.scrollTo(scrollOptions);
      } catch (error) {
        window.scrollTo(0, 0);
      }
    }
  }

  downloadResume(): void {
    if (!this.isBrowser) return;

    try {
      this.createDownloadLink();
    } catch (error) {
      console.warn('Download failed, opening in new tab:', error);
      window.open('assets/resume/Resume-Anica-Barrios.pdf', '_blank');
    }
  }

  private createDownloadLink(): void {
    const link = document.createElement('a');
    link.href = 'assets/resume/Resume-Anica-Barrios.pdf';
    link.download = 'Anica-Barrios-Resume.pdf';
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 100);
  }

  private cleanup(): void {
    if (this.loadingTimer) {
      clearTimeout(this.loadingTimer);
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    this.animatedComponents.clear();

    if (this.isBrowser) {
      const animatedElements = document.querySelectorAll('[style*="will-change"]');
      animatedElements.forEach(el => {
        (el as HTMLElement).style.willChange = 'auto';
      });
    }
  }

  @HostListener('window:beforeunload')
  @HostListener('window:popstate')
  onNavigationEvents(): void {
    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser && this.ticking) {
      clearTimeout(this.loadingTimer);
      this.loadingTimer = setTimeout(() => {
        this.updateScrollEffects();
      }, 150);
    }
  }
}