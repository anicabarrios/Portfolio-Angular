import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardData } from '../card/card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projectsData: CardData[] = [
    {
      title: 'Law Office Suzana Lj. Ilic',
      description: 'A professional, bilingual website for Advokatska Kancelarija Ilić Lj. Suzana, a distinguished law firm with 30+ years of expertise. Features a secure admin panel for content management, interactive Q&A system with bilingual support, and comprehensive service pages across 12 practice areas.',
      items: ['React', 'Bootstrap', 'Node.js', 'MongoDB', 'JWT Auth', 'EmailJS'],
      imageUrl: 'images/suki.png',
      imageAlt: 'Legal services website homepage with bilingual support',
      imageCaption: 'Professional bilingual website with admin panel and Q&A system',
      links: [
        { text: 'View Live', url: 'https://advokatska-kancelarija.onrender.com/' },
        { text: 'GitHub', url: 'https://github.com/anicabarrios/consultation' }
      ]
    },
    {
      title: 'About Love Bridal & Formal',
      description: 'An elegant website designed specifically for a luxury bridal boutique, featuring an extensive collection of wedding dresses, quinceañera gowns, and formal wear. The website combines sophisticated animations with seamless user experience enhancing boutique\'s premium brand identity.',
      items: ['React.js', 'TailwindCSS', 'Framer Motion', 'React Router', 'EmailJS', 'Responsive Design'],
      imageUrl: 'images/readme.png',
      imageAlt: 'About Love Bridal & Formal website screenshot showing elegant bridal dress gallery',
      imageCaption: 'Responsive platform with elegant product showcase and seamless user experience',
      links: [
        { text: 'View Live', url: 'https://aboutlovebridal.netlify.app/' },
        { text: 'GitHub', url: 'https://github.com/anicabarrios/All-About-Bridal' }
      ]
    },
    {
      title: 'Miami 2000 Auto Body',
      description: 'A professional auto body shop website that captures the vibrant essence of Miami through dynamic UI elements and custom animations. The platform showcases comprehensive automotive services with Miami-inspired aesthetics, featuring interactive galleries and service portfolios.',
      items: ['Angular', 'TailwindCSS', 'AOS Animations', 'Responsive Design', 'EmailJS'],
      imageUrl: 'images/website.png',
      imageAlt: 'Miami 2000 Auto Body website screenshot showing automotive services',
      imageCaption: 'Modern auto body shop website with Miami-inspired design and interactive elements',
      links: [
        { text: 'View Live', url: 'https://miami2000.netlify.app/' },
        { text: 'GitHub', url: 'https://github.com/anicabarrios/miami-2000' }
      ]
    },
    {
      title: 'Laser Engraving Website',
      description: 'A professional business website showcasing precision laser engraving services with elegant UI design and custom animations. The platform features a comprehensive service portfolio, interactive galleries showcasing engraving capabilities that highlight the company\'s craftsmanship and attention to detail.',
      items: ['Flutter', 'Dart', 'Material Design', 'Custom Animations', 'EmailJS', 'Responsive Design'],
      imageUrl: 'images/screenshot.png',
      imageAlt: 'Laser Engraving website screenshot showing precision engraving services',
      imageCaption: 'Professional Flutter web application showcasing laser engraving services and capabilities',
      links: [
        { text: 'View Live', url: 'https://laser-engraving.netlify.app/' },
        { text: 'GitHub', url: 'https://github.com/anicabarrios/laser-engraving' }
      ]
    }
  ];

  getProjectIcon(index: number): string {
    const icons = ['⚖️', '💍', '🚗', '⚙️'];
    return icons[index] || '🚀';
  }

  getProjectVariant(index: number): 'primary' | 'accent' | 'neutral' {
    const variants: ('primary' | 'accent' | 'neutral')[] = ['primary', 'accent', 'primary', 'neutral'];
    return variants[index % variants.length];
  }
}