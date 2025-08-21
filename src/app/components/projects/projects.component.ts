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
      title: 'About Love Bridal & Formal',
      description: 'An elegant e-commerce platform designed specifically for a luxury bridal boutique, featuring an extensive collection of wedding dresses, quinceañera gowns, and formal wear. The website combines sophisticated animations with seamless user experience, creating an immersive shopping environment that reflects the boutique\'s premium brand identity.',
      items: ['React.js', 'TailwindCSS', 'Framer Motion', 'React Router', 'EmailJS', 'Responsive Design'],
      imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop&crop=top',
      imageAlt: 'About Love Bridal & Formal website screenshot showing elegant bridal dress gallery',
      imageCaption: 'Responsive e-commerce platform with elegant product showcase and seamless user experience',
      links: [
        { text: 'View Live', url: 'https://aboutlovebridal.com' },
        { text: 'GitHub', url: 'https://github.com/anicabarrios/about-love-bridal' }
      ]
    },
    {
      title: 'Miami 2000 Auto Body',
      description: 'A professional auto body shop website that captures the vibrant essence of Miami through dynamic UI elements and custom animations. The platform showcases comprehensive automotive services with Miami-inspired aesthetics, featuring interactive galleries, service portfolios, and an intuitive appointment system that enhances customer engagement.',
      items: ['Angular', 'TailwindCSS', 'AOS Animations', 'Responsive Design', 'EmailJS'],
      imageUrl: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=600&fit=crop&crop=center',
      imageAlt: 'Miami 2000 Auto Body website screenshot showing automotive services',
      imageCaption: 'Modern auto body shop website with Miami-inspired design and interactive elements',
      links: [
        { text: 'View Live', url: 'https://miami2000.com' },
        { text: 'GitHub', url: 'https://github.com/anicabarrios/miami-2000' }
      ]
    },
    {
      title: 'DSxpert Management System',
      description: 'A comprehensive dealer management system that revolutionized automotive dealership customer service operations. This full-stack solution streamlines dealership workflows, manages customer relationships, inventory tracking, and service scheduling. The system features an intuitive dashboard, robust reporting capabilities, and seamless integration with existing dealership tools.',
      items: ['MongoDB', 'RESTful APIs', 'ReactJS', 'Node.js', 'Express', 'Full-Stack'],
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center',
      imageAlt: 'DSxpert Management System dashboard screenshot',
      imageCaption: 'Comprehensive dealer management system with intuitive dashboard and robust functionality',
      links: [
        { text: 'Learn More', url: '#contact' }
      ]
    },
    {
      title: 'Laser Engraving Website',
      description: 'A professional business website showcasing precision laser engraving services with elegant UI design and custom animations. Built using Flutter web technology, the platform features a comprehensive service portfolio, interactive galleries showcasing engraving capabilities, and detailed project showcases that highlight the company\'s craftsmanship and attention to detail.',
      items: ['Flutter', 'Dart', 'Material Design', 'Custom Animations', 'EmailJS', 'Responsive Design'],
      imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=600&fit=crop&crop=center',
      imageAlt: 'Laser Engraving website screenshot showing precision engraving services',
      imageCaption: 'Professional Flutter web application showcasing laser engraving services and capabilities',
      links: [
        { text: 'View Live', url: 'https://laserengraving.com' },
        { text: 'GitHub', url: 'https://github.com/anicabarrios/laser-engraving' }
      ]
    }
  ];

  getProjectIcon(index: number): string {
  const icons = ['💍', '🚗', '⚙️', '🔧'];
  return icons[index] || '🚀';
}

  getProjectVariant(index: number): 'primary' | 'accent' | 'neutral' {
    const variants: ('primary' | 'accent' | 'neutral')[] = ['primary', 'accent', 'primary', 'accent'];
    return variants[index % variants.length];
  }
}