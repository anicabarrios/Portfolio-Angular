import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CardData {
  title: string;
  description?: string;
  items?: string[];
  subtitle?: string;
  period?: string;
  location?: string;
  achievements?: string[];
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  platforms?: string[];
  badge?: string;
  links?: { text: string; url: string; icon?: string }[];
  stats?: { label: string; value: string }[];
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
}

export type CardType = 'frontend' | 'backend' | 'database' | 'mobile' | 'tools' | 'design' | 'skill' | 'education' | 'experience' | 'project' | 'stat';
export type CardVariant = 'primary' | 'accent' | 'neutral' | 'glass';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() data: CardData = { title: '' };
  @Input() type: CardType = 'skill';
  @Input() variant: CardVariant = 'primary';
  @Input() iconPath?: string;
  @Input() iconType: 'svg' | 'emoji' | 'image' | 'none' = 'svg';
  @Input() showHeader: boolean = true;
  @Input() clickable: boolean = false;
  @Input() animationDelay: number = 0;
  
  @Output() cardClick = new EventEmitter<CardData>();
  @Output() linkClick = new EventEmitter<{ link: any; data: CardData }>();
  @Output() imageClick = new EventEmitter<string>();

  // Centralized variant classes configuration
  private readonly variantStyles = {
    primary: {
      icon: 'bg-gradient-to-br from-primary-100 to-primary-200 border border-primary-200/60',
      iconText: 'text-primary-600 group-hover:text-primary-700',
      title: 'text-primary-900 group-hover:text-primary-800',
      subtitle: 'text-primary-600',
      badge: 'bg-primary-100/80 text-primary-800 border-primary-200/60',
      accent: 'bg-primary-500',
      bar: 'bg-gradient-to-b from-primary-500 to-primary-600',
      itemBg: 'bg-gradient-to-r from-primary-50/50 to-transparent border-primary-200/40 hover:border-primary-300/60',
      gridBg: 'bg-gradient-to-br from-primary-50/40 to-primary-100/20 border-primary-200/40 hover:border-primary-300/60'
    },
    accent: {
      icon: 'bg-gradient-to-br from-accent-100 to-accent-200 border border-accent-200/60',
      iconText: 'text-accent-600 group-hover:text-accent-700',
      title: 'text-accent-900 group-hover:text-accent-800',
      subtitle: 'text-accent-600',
      badge: 'bg-accent-100/80 text-accent-800 border-accent-200/60',
      accent: 'bg-accent-500',
      bar: 'bg-gradient-to-b from-accent-500 to-accent-600',
      itemBg: 'bg-gradient-to-r from-accent-50/50 to-transparent border-accent-200/40 hover:border-accent-300/60',
      gridBg: 'bg-gradient-to-br from-accent-50/40 to-accent-100/20 border-accent-200/40 hover:border-accent-300/60'
    },
    neutral: {
      icon: 'bg-gradient-to-br from-neutral-100 to-neutral-200 border border-neutral-200/60',
      iconText: 'text-neutral-600 group-hover:text-neutral-700',
      title: 'text-neutral-900 group-hover:text-neutral-800',
      subtitle: 'text-neutral-600',
      badge: 'bg-neutral-100/80 text-neutral-800 border-neutral-200/60',
      accent: 'bg-neutral-500',
      bar: 'bg-gradient-to-b from-neutral-500 to-neutral-600',
      itemBg: 'bg-gradient-to-r from-neutral-50/50 to-transparent border-neutral-200/40 hover:border-neutral-300/60',
      gridBg: 'bg-gradient-to-br from-neutral-50/40 to-neutral-100/20 border-neutral-200/40 hover:border-neutral-300/60'
    },
    glass: {
      icon: 'bg-white/10 border border-white/20',
      iconText: 'text-white',
      title: 'text-white',
      subtitle: 'text-white/90',
      badge: 'bg-white/20 text-white border-white/30',
      accent: 'bg-white',
      bar: 'bg-white',
      itemBg: 'bg-gradient-to-r from-white/10 to-transparent border-white/20 hover:border-white/40',
      gridBg: 'bg-gradient-to-br from-white/5 to-white/10 border-white/20 hover:border-white/40'
    }
  };

  // Database and icon mappings
  private readonly databaseConfig = {
    MongoDB: { icon: 'M', type: 'Document Database', category: 'NoSQL', color: 'green' },
    MySQL: { icon: 'S', type: 'Relational Database', category: 'SQL', color: 'blue' },
    PostgreSQL: { icon: 'P', type: 'Object-Relational DB', category: 'SQL', color: 'blue' },
    Redis: { icon: 'R', type: 'In-Memory Store', category: 'Cache', color: 'red' }
  };

  private readonly iconMaps = {
    backend: ['⚡', '🚀', '🔗', '📦'],
    platform: { 'iOS': '📱', 'Android': '🤖', 'Web': '🌐', 'Desktop': '💻' },
    design: { 'UI/UX Design': '🎨', 'Figma': 'F', 'Accessibility': '♿', 'Performance': '⚡', 'Adobe Creative Suite': 'A' },
    project: ['💍', '🚗', '⚙️', '🔧'],
    defaultIcons: {
      frontend: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      backend: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2',
      database: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
      mobile: 'M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z',
      tools: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      design: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z',
      education: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
      experience: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      project: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
    }
  };

  // Event handlers
  onCardClick(): void {
    if (this.clickable) this.cardClick.emit(this.data);
  }

  onLinkClick(link: any, event: Event): void {
    event.stopPropagation();
    this.linkClick.emit({ link, data: this.data });
  }

  openImageModal(imageUrl: string, event: Event): void {
    event.stopPropagation();
    this.imageClick.emit(imageUrl);
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4';
    modal.style.animation = 'fadeIn 0.3s ease-out';
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = this.data.imageAlt || this.data.title;
    img.className = 'max-w-full max-h-full object-contain rounded-lg shadow-2xl';
    img.style.animation = 'scaleIn 0.3s ease-out';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.className = 'absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10';
    closeBtn.style.cssText = 'background:rgba(0,0,0,0.5);border-radius:50%;width:50px;height:50px;border:none;cursor:pointer';
    
    const closeModal = () => {
      modal.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => document.body.removeChild(modal), 300);
    };
    
    closeBtn.onclick = closeModal;
    modal.onclick = (e) => e.target === modal && closeModal();
    
    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    if (!document.getElementById('image-modal-styles')) {
      const styles = document.createElement('style');
      styles.id = 'image-modal-styles';
      styles.textContent = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `;
      document.head.appendChild(styles);
    }
  }

  // Centralized style getters
  private getVariantStyle(style: keyof typeof this.variantStyles.primary): string {
    return this.variantStyles[this.variant][style];
  }

  // Base class getters
  getCardClasses(): string { return this.clickable ? 'cursor-pointer' : ''; }
  getProjectImageClasses(): string { return `hover:shadow-${this.variant === 'glass' ? 'white' : this.variant + '-500'}/20`; }
  getIconContainerClasses(): string { return this.getVariantStyle('icon'); }
  getIconClasses(): string { return this.getVariantStyle('iconText'); }
  getTitleClasses(): string { return this.getVariantStyle('title'); }
  getSubtitleClasses(): string { return this.getVariantStyle('subtitle'); }
  getBadgeClasses(): string { return this.getVariantStyle('badge'); }
  getAccentDotClasses(): string { return this.getVariantStyle('accent'); }
  getAccentBarClasses(): string { return this.getVariantStyle('bar'); }

  // Skill item classes
  getSkillItemClasses(): string { return this.getVariantStyle('itemBg'); }
  getBackendItemClasses(): string { return this.getVariantStyle('gridBg'); }

  // Progress dots with logic
  getProgressDotClasses(index?: number, totalCount?: number): string {
    if (index !== undefined && totalCount !== undefined) {
      const isFirstOrLast = index === 0 || index === totalCount - 1;
      return isFirstOrLast ? this.getVariantStyle('accent') : this.getProgressDotInactiveClasses();
    }
    return this.getVariantStyle('accent');
  }

  shouldShowFifthDot(index: number, totalCount: number): boolean {
    return index === 0 || index === totalCount - 1;
  }

  private getProgressDotInactiveClasses(): string {
    const variants = { primary: 'bg-primary-200', accent: 'bg-accent-200', neutral: 'bg-neutral-200', glass: 'bg-white/30' };
    return variants[this.variant];
  }

  // Backend icons
  getBackendIcon(index: number): string {
    return this.iconMaps.backend[index] || '⚡';
  }

  // Database methods 
  getDatabaseItemClasses(db: string): string {
    const config = this.databaseConfig[db as keyof typeof this.databaseConfig];
    const color = config?.color || 'neutral';
    return `bg-gradient-to-r from-${color}-50/40 to-transparent border-${color}-200/40 hover:border-${color}-300/60`;
  }

  getDatabaseIconClasses(db: string): string {
    const config = this.databaseConfig[db as keyof typeof this.databaseConfig];
    const color = config?.color || 'neutral';
    return `bg-gradient-to-br from-${color}-100 to-${color}-200 border-${color}-200/60`;
  }

  getDatabaseIconTextClasses(db: string): string {
    const config = this.databaseConfig[db as keyof typeof this.databaseConfig];
    return `text-${config?.color || 'neutral'}-600`;
  }

  getDatabaseSubtitleClasses(db: string): string {
    return this.getDatabaseIconTextClasses(db);
  }

  getDatabaseBadgeClasses(db: string): string {
    const config = this.databaseConfig[db as keyof typeof this.databaseConfig];
    const color = config?.color || 'neutral';
    return `bg-${color}-100/80 text-${color}-700 border-${color}-200/60`;
  }

  getDatabaseIcon(db: string): string {
    return this.databaseConfig[db as keyof typeof this.databaseConfig]?.icon || 'D';
  }

  getDatabaseType(db: string): string {
    return this.databaseConfig[db as keyof typeof this.databaseConfig]?.type || 'Database';
  }

  getDatabaseCategory(db: string): string {
    return this.databaseConfig[db as keyof typeof this.databaseConfig]?.category || 'DB';
  }

  // Flutter/Mobile methods
  getFlutterCardClasses(): string { return 'bg-gradient-to-r from-blue-50/40 to-transparent border-blue-200/40 hover:border-blue-300/60'; }
  getFlutterIconClasses(): string { return 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-600/60'; }
  getPlatformItemClasses(): string { return 'bg-gradient-to-br from-blue-50/40 to-blue-100/20 border-blue-200/40 hover:border-blue-300/60 text-center flex flex-col items-center justify-center min-h-[4rem] transition-all duration-300'; }
  getPlatformIcon(platform: string): string { return this.iconMaps.platform[platform as keyof typeof this.iconMaps.platform] || '📱'; }

  // Tools methods
  getToolIconClasses(index: number): string {
    const variants = [
      'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-800/60',
      'bg-gradient-to-br from-accent-500 to-accent-600 border-accent-600/60',
      'bg-gradient-to-br from-primary-500 to-primary-600 border-primary-600/60',
      'bg-gradient-to-br from-neutral-500 to-neutral-600 border-neutral-600/60'
    ];
    return variants[index % variants.length];
  }

  getToolAbbrev(tool: string): string {
    const abbrevMap: { [key: string]: string } = {
      'Git & GitHub': 'Git', 'CI/CD': 'CI/CD', 'Agile': 'Agile', 'Project Management': 'PM'
    };
    return abbrevMap[tool] || tool.substring(0, 2).toUpperCase();
  }

  // Design methods
  getDesignSkillClasses(index: number): string {
    const variants = [
      'bg-gradient-to-r from-pink-50/40 to-transparent border-pink-200/40 hover:border-pink-300/60',
      'bg-gradient-to-r from-purple-50/40 to-transparent border-purple-200/40 hover:border-purple-300/60',
      'bg-gradient-to-r from-blue-50/40 to-transparent border-blue-200/40 hover:border-blue-300/60',
      'bg-gradient-to-r from-green-50/40 to-transparent border-green-200/40 hover:border-green-300/60'
    ];
    return variants[index % variants.length];
  }

  getDesignSkillIconClasses(index: number): string {
    const variants = [
      'bg-gradient-to-br from-pink-100 to-pink-200 border-pink-200/60',
      'bg-gradient-to-br from-purple-100 to-purple-200 border-purple-200/60',
      'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-200/60',
      'bg-gradient-to-br from-green-100 to-green-200 border-green-200/60'
    ];
    return variants[index % variants.length];
  }

  getDesignIcon(skill: string): string {
    return this.iconMaps.design[skill as keyof typeof this.iconMaps.design] || '🎨';
  }

  // Achievement methods
  getAchievementIconContainerClasses(): string {
    const variants = {
      primary: 'bg-primary-100/60 border-primary-200/40 group-hover:bg-primary-200/60',
      accent: 'bg-accent-100/60 border-accent-200/40 group-hover:bg-accent-200/60',
      neutral: 'bg-neutral-100/60 border-neutral-200/40 group-hover:bg-neutral-200/60',
      glass: 'bg-white/10 border-white/20 group-hover:bg-white/20'
    };
    return variants[this.variant];
  }

  getAchievementIconClasses(): string { return this.getVariantStyle('iconText'); }

  // Tech and Link methods
  getTechTagClasses(): string {
    const variants = {
      primary: 'bg-primary-50/60 text-primary-700 border-primary-200/40 hover:border-primary-300/60 hover:bg-primary-100/60',
      accent: 'bg-accent-50/60 text-accent-700 border-accent-200/40 hover:border-accent-300/60 hover:bg-accent-100/60',
      neutral: 'bg-neutral-50/60 text-neutral-700 border-neutral-200/40 hover:border-neutral-300/60 hover:bg-neutral-100/60',
      glass: 'bg-white/10 text-white border-white/30 hover:bg-white/20'
    };
    return variants[this.variant];
  }

  getLinkClasses(): string {
    const variants = {
      primary: 'text-primary-700 border-primary-200/40 hover:border-primary-300/60',
      accent: 'text-accent-700 border-accent-200/40 hover:border-accent-300/60',
      neutral: 'text-neutral-700 border-neutral-200/40 hover:border-neutral-300/60',
      glass: 'text-white border-white/30 hover:bg-white/10'
    };
    return variants[this.variant];
  }

  getStatGradientClasses(): string {
    const gradients = ['from-accent-300 to-accent-500', 'from-primary-300 to-primary-500', 'from-accent-300 to-primary-400', 'from-primary-300 to-accent-500'];
    return gradients[Math.floor(Math.random() * gradients.length)];
  }

  getDefaultIcon(): string {
    if (this.iconPath) return this.iconPath;
    return this.iconMaps.defaultIcons[this.type as keyof typeof this.iconMaps.defaultIcons] || 
           'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
  }

  getAnimationStyle(): any {
    return this.animationDelay > 0 ? { 'animation-delay': `${this.animationDelay}ms` } : {};
  }
}