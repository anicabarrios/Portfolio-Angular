import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  submitMessage = '';
  currentStep = 0;
  totalSteps = 5;

  // Web3Forms configuration
  private readonly web3formsEndpoint = 'https://api.web3forms.com/submit';
  private readonly web3formsAccessKey = '31ea5e78-31dd-4df6-a35f-d5dd71e4647e'; 

  private readonly config = {
    characterLimits: { name: 50, subject: 80, message: 500 } as const,
    autoSaveInterval: 45000,
    draftMaxAge: 12 * 60 * 60 * 1000,
    toastDuration: 2500
  };

  readonly projectTypes = ['Web App', 'Mobile', 'E-commerce', 'API', 'Consulting', 'Other'];

  readonly contactInfo = [
    { icon: 'email', label: 'Email', value: 'anicabarrios1@gmail.com', link: 'mailto:anicabarrios1@gmail.com', copyable: true },
    { icon: 'phone', label: 'Phone', value: '(786) 776-9771', link: 'tel:+17867769771', copyable: true },
    { icon: 'location', label: 'Location', value: 'Hollywood, FL', link: 'https://maps.google.com/?q=Hollywood,FL', copyable: false }
  ];

  readonly socialLinks = [
    { name: 'GitHub', url: 'https://github.com/anicabarrios', icon: 'github' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/anica-barrios', icon: 'linkedin' },
    { name: 'Email', url: 'mailto:anicabarrios1@gmail.com', icon: 'email' }
  ];

  private readonly iconPaths = {
    email: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    location: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    github: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
  };

  private autoSaveInterval: any;
  private readonly isBrowser: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.contactForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadDraft();
      this.setupAutoSave();
    }
    this.setupFormTracking();
  }

  ngOnDestroy(): void {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      projectType: ['', [Validators.required]],
      subject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  private setupFormTracking(): void {
    this.contactForm.valueChanges.subscribe(() => this.updateFormProgress());
  }

  private updateFormProgress(): void {
    const formValue = this.contactForm.value;
    this.currentStep = Object.keys(formValue).filter(key => {
      const value = formValue[key]?.trim();
      return value && (key !== 'email' || this.contactForm.get('email')?.valid);
    }).length;
  }

  handleContactClick(info: any): void {
    if (!this.isBrowser) return;
    
    if (info.copyable) {
      this.copyToClipboard(info.value, info.label);
    } else {
      this.openLink(info.link, info.icon === 'location');
    }
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      await this.processSubmit();
    } else {
      this.markInvalidFields();
    }
  }

  private async processSubmit(): Promise<void> {
    this.isSubmitting = true;
    
    try {
      await this.submitWithWeb3Forms(this.contactForm.value);
      this.handleSubmitSuccess();
    } catch (error) {
      console.error('Form submission error:', error);
      this.handleSubmitError();
    } finally {
      this.isSubmitting = false;
    }
  }

  private async submitWithWeb3Forms(formData: any): Promise<void> {
    if (!this.isBrowser) {
      throw new Error('HTTP requests not available in server-side rendering');
    }

    // Web3Forms payload structure
    const payload = {
      access_key: this.web3formsAccessKey,
      name: formData.name,
      email: formData.email,
      subject: `Portfolio Contact: ${formData.subject} - ${formData.projectType}`,
      message: `
Project Type: ${formData.projectType}
Subject: ${formData.subject}

Message:
${formData.message}

---
From: ${formData.name}
Email: ${formData.email}
      `.trim(),
      from_name: formData.name,
    };

    try {
      const response: any = await this.http.post(this.web3formsEndpoint, payload).toPromise();
      
      // Web3Forms returns success: true/false
      if (!response.success) {
        throw new Error(response.message || 'Form submission failed');
      }
      
      console.log('Form submitted successfully via Web3Forms:', response);
    } catch (error) {
      console.error('Web3Forms submission error:', error);
      throw error;
    }
  }

  private handleSubmitSuccess(): void {
    this.isSubmitted = true;
    this.submitMessage = 'Thank you! Your message has been sent successfully. I\'ll reply within 24 hours.';
    this.clearDraft();
    this.contactForm.reset();
    this.currentStep = 0;
    this.clearSubmitMessageAfterDelay(8000);
    this.showToast('Message sent successfully!');
  }

  private handleSubmitError(): void {
    this.isSubmitted = false;
    this.submitMessage = 'Sorry, there was an error sending your message. Please try again or contact me directly at anicabarrios1@gmail.com.';
    this.clearSubmitMessageAfterDelay(6000);
    this.showToast('Failed to send message. Please try again.');
  }

  private clearSubmitMessageAfterDelay(delay: number): void {
    setTimeout(() => {
      this.isSubmitted = false;
      this.submitMessage = '';
    }, delay);
  }

  // Validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.valid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field?.errors) return '';

    const { errors } = field;
    const fieldLabel = this.capitalizeFirst(fieldName);
    
    if (errors['required']) return `${fieldLabel} is required`;
    if (errors['email']) return 'Valid email required';
    if (errors['minlength']) return `Min ${errors['minlength'].requiredLength} characters`;
    if (errors['maxlength']) return `Max ${errors['maxlength'].requiredLength} characters`;
    return '';
  }

  getCharacterCount(fieldName: string): number {
    return this.contactForm.get(fieldName)?.value?.length || 0;
  }

  getCharacterLimit(fieldName: keyof typeof this.config.characterLimits): number {
    return this.config.characterLimits[fieldName];
  }

  getFormProgress(): number {
    return Math.round((this.currentStep / this.totalSteps) * 100);
  }

  // Auto-save functionality
  private setupAutoSave(): void {
    this.autoSaveInterval = setInterval(() => this.saveDraft(), this.config.autoSaveInterval);
  }

  private saveDraft(): void {
    if (!this.isBrowser || !this.hasLocalStorage() || !this.contactForm.dirty || this.isSubmitted) {
      return;
    }
    
    try {
      const draftData = { ...this.contactForm.value, timestamp: new Date().toISOString() };
      localStorage.setItem('contact_form_draft', JSON.stringify(draftData));
    } catch {
      // Ignore storage errors
    }
  }

  private loadDraft(): void {
    if (!this.isBrowser || !this.hasLocalStorage()) return;

    try {
      const draft = localStorage.getItem('contact_form_draft');
      if (!draft) return;

      const draftData = JSON.parse(draft);
      const draftAge = Date.now() - new Date(draftData.timestamp).getTime();

      if (draftAge < this.config.draftMaxAge) {
        this.contactForm.patchValue({
          name: draftData.name || '',
          email: draftData.email || '',
          projectType: draftData.projectType || '',
          subject: draftData.subject || '',
          message: draftData.message || ''
        });
      } else {
        this.clearDraft();
      }
    } catch {
      this.clearDraft();
    }
  }

  private clearDraft(): void {
    if (this.isBrowser && this.hasLocalStorage()) {
      try {
        localStorage.removeItem('contact_form_draft');
      } catch {
        // Ignore errors
      }
    }
  }

  private markInvalidFields(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsTouched();
    });

    this.focusFirstInvalidField();
  }

  private focusFirstInvalidField(): void {
    if (!this.isBrowser) return;

    const firstInvalidField = Object.keys(this.contactForm.controls)
      .find(key => this.contactForm.get(key)?.invalid);

    if (firstInvalidField) {
      const element = document.getElementById(firstInvalidField);
      element?.focus();
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Utility functions
  async copyToClipboard(text: string, label: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast(`${label} copied!`);
    } catch {
      this.fallbackCopy(text, label);
    }
  }

  private fallbackCopy(text: string, label: string): void {
    try {
      const textArea = this.createTempTextArea(text);
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showToast(`${label} copied!`);
    } catch {
      // Ignore if not possible
    }
  }

  private createTempTextArea(text: string): HTMLTextAreaElement {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    return textArea;
  }

  private openLink(link: string, openInNewTab: boolean): void {
    try {
      window.open(link, openInNewTab ? '_blank' : '_self');
    } catch {
    }
  }

  private showToast(message: string): void {
    if (!this.isBrowser) return;

    const toast = this.createToast(message);
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, this.config.toastDuration);
  }

  private createToast(message: string): HTMLDivElement {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    return toast;
  }

  // Style helper methods 
  getIconClasses(index: number): string {
    const gradients = [
      'bg-gradient-to-br from-primary-500 to-primary-600',
      'bg-gradient-to-br from-accent-500 to-accent-600',
      'bg-gradient-to-br from-primary-400 to-accent-500'
    ];
    return gradients[index % gradients.length];
  }

  getSocialIconClasses(index: number): string {
    const gradients = [
      'bg-gradient-to-br from-primary-500/90 to-primary-600/90',
      'bg-gradient-to-br from-accent-500/90 to-accent-600/90',
      'bg-gradient-to-br from-primary-400/90 to-accent-500/90'
    ];
    return gradients[index % gradients.length];
  }

  getContactIcon(iconName: string): string {
    return this.iconPaths[iconName as keyof typeof this.iconPaths] || this.iconPaths.email;
  }

  getSocialIcon(iconName: string): string {
    return this.iconPaths[iconName as keyof typeof this.iconPaths] || this.iconPaths.email;
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private hasLocalStorage(): boolean {
    return typeof Storage !== 'undefined' && 'localStorage' in window;
  }
}