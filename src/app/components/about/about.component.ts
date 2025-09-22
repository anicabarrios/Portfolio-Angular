import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  certificateImageUrl = '/images/certificate.png'; 
  showCertificateModal = false;
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.preloadCertificateImage();
      document.addEventListener('keydown', this.handleEscapeKey);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      document.removeEventListener('keydown', this.handleEscapeKey);
      document.body.style.overflow = '';
    }
  }

  private preloadCertificateImage(): void {
    const img = new Image();
    img.src = this.certificateImageUrl;
  }

  private handleEscapeKey = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.showCertificateModal) {
      this.closeCertificateModal();
    }
  };

  openCertificateModal(): void {
    this.showCertificateModal = true;
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeCertificateModal(event?: Event): void {
    if (event) {
      const target = event.target as HTMLElement;
      const modalContent = target.closest('.relative');
      
      if (modalContent && !target.closest('button') && event.target !== event.currentTarget) {
        return;
      }
    }
    
    this.showCertificateModal = false;
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }
}