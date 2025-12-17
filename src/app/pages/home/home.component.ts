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
  private resizeTimer?: ReturnType<typeof setTimeout>;
  private ticking = false;
  private readonly animatedComponents = new Set<string>();

  private readonly sectionConfig = new Map<string, keyof ComponentsVisibility>([
    ['about-section', 'about'],
    ['skills-section', 'skills'],
    ['projects-section', 'projects'],
    ['contact-section', 'contact'],
    ['footer-section', 'footer']
  ]);

  private readonly ANIMATION_DELAY = 150;
  private readonly LOADING_DURATION = 900;
  private readonly HERO_DELAY = 80;
  private readonly OBSERVER_DELAY = 120;
  private readonly WILL_CHANGE_CLEANUP_DELAY = 1000;
  private readonly SCROLL_THRESHOLD = 400;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.initializeScrollBehavior();
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.removeInitialLoader();
      document.body.classList.add('angular-ready');
      this.animationsEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (this.animationsEnabled) {
        this.startLoadingSequence();
      } else {
        this.showAllContentImmediately();
      }
    } else {
      this.handleSSR();
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.animationsEnabled) {
      this.scheduleTask(() => this.setupIntersectionObserver(), this.OBSERVER_DELAY);
    }
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private removeInitialLoader(): void {
    const initialLoader = document.getElementById('initial-loader');
    if (initialLoader) {
      initialLoader.classList.add('hide');
      this.scheduleTask(() => {
        initialLoader.remove();
      }, 500);
    }
  }


  private initializeScrollBehavior(): void {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto';
    }
  }

  private handleSSR(): void {
    this.pageLoaded = true;
    this.setAllComponentsVisible(true);
  }
  private startLoadingSequence(): void {
    this.setAllComponentsVisible(false);
    this.loadingTimer = this.scheduleTask(() => this.completeLoading(), 800);
  }

  private completeLoading(): void {
    this.pageLoaded = true;
    this.cdr.detectChanges();

    this.scheduleTask(() => {
      this.showHeroSection();
      this.updateScrollEffects(); 
    }, this.HERO_DELAY);
  }

  private showHeroSection(): void {
    this.setComponentVisible('hero');
    const heroEl = this.heroSection?.nativeElement as HTMLElement;
    heroEl?.classList.add('visible-after-loader');
    this.cdr.detectChanges();
  }

  private showAllContentImmediately(): void {
    this.pageLoaded = true;
    this.setAllComponentsVisible(true);
    
    Object.keys(this.componentsVisible).forEach(comp => {
      this.animatedComponents.add(comp);
    });

    this.scheduleTask(() => {
      const heroEl = this.heroSection?.nativeElement as HTMLElement;
      heroEl?.classList.add('visible-after-loader');
    }, 0);

    this.cdr.detectChanges();
  }

  private setAllComponentsVisible(visible: boolean): void {
    Object.keys(this.componentsVisible).forEach(key => {
      this.componentsVisible[key as keyof ComponentsVisibility] = visible;
    });
  }

  private setComponentVisible(key: keyof ComponentsVisibility): void {
    this.componentsVisible[key] = true;
    this.animatedComponents.add(key);
  }

  private setupIntersectionObserver(): void {
    const options: IntersectionObserverInit = {
      threshold: [0.1, 0.2],
      rootMargin: '0px 0px -60px 0px'
    };

    this.intersectionObserver = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
          this.handleIntersection(entry.target);
        }
      }),
      options
    );

    this.observeSections();
  }

  private observeSections(): void {
    const sections = [
      this.aboutSection,
      this.skillsSection,
      this.projectsSection,
      this.contactSection,
      this.footerSection
    ]
      .filter(Boolean)
      .map(ref => ref.nativeElement);

    sections.forEach(element => {
      this.intersectionObserver?.observe(element);
      element.style.willChange = 'transform, opacity';
    });
  }

  private handleIntersection(target: Element): void {
    const sectionKey = this.getSectionKey(target);

    if (sectionKey && !this.animatedComponents.has(sectionKey)) {
      this.scheduleTask(() => {
        this.setComponentVisible(sectionKey);
        this.cdr.detectChanges();

        this.scheduleTask(() => {
          (target as HTMLElement).style.willChange = 'auto';
        }, this.WILL_CHANGE_CLEANUP_DELAY);
      }, this.ANIMATION_DELAY);

      this.intersectionObserver?.unobserve(target);
    }
  }

  private getSectionKey(target: Element): keyof ComponentsVisibility | null {
    const classList = Array.from(target.classList);
    
    for (const [className, key] of this.sectionConfig) {
      if (classList.includes(className)) {
        return key;
      }
    }
    
    return null;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        this.updateScrollEffects();
        this.ticking = false;
      });
    }
  }

  private updateScrollEffects(): void {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    this.scrollProgress = documentHeight > 0
      ? Math.min(Math.max((scrollTop / documentHeight) * 100, 0), 100)
      : 0;

    this.showBackToTop = scrollTop > this.SCROLL_THRESHOLD;
  }

  scrollToTop(): void {
    if (this.isBrowser) {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        window.scrollTo(0, 0);
      }
    }
  }

  downloadResume(): void {
    if (!this.isBrowser) return;

    try {
      const link = document.createElement('a');
      link.href = 'assets/resume/Resume-Anica-Barrios.pdf';
      link.download = 'Anica-Barrios-Resume.pdf';
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();

      this.scheduleTask(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 100);
    } catch (error) {
      console.warn('Download failed, opening in new tab:', error);
      window.open('assets/resume/Resume-Anica-Barrios.pdf', '_blank');
    }
  }
  @HostListener('window:beforeunload')
  @HostListener('window:popstate')
  onNavigationEvents(): void {
    if (this.isBrowser) {
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = this.scheduleTask(() => {
        this.updateScrollEffects();
      }, 150);
    }
  }

  private cleanup(): void {
    this.clearTimer(this.loadingTimer);
    this.clearTimer(this.resizeTimer);
    
    this.intersectionObserver?.disconnect();
    this.animatedComponents.clear();

    if (this.isBrowser) {
      document.querySelectorAll('[style*="will-change"]').forEach(el => {
        (el as HTMLElement).style.willChange = 'auto';
      });
    }
  }

  private clearTimer(timer?: ReturnType<typeof setTimeout>): void {
    if (timer) {
      clearTimeout(timer);
    }
  }

  private scheduleTask<T>(callback: () => T, delay: number): ReturnType<typeof setTimeout> {
    return setTimeout(callback, delay);
  }
}