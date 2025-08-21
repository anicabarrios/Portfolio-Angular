import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardData } from '../card/card.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  
  frontendCardData: CardData = {
    title: 'Frontend Development',
    subtitle: 'User Interface & Experience',
    description: 'Building responsive, interactive user interfaces with modern frameworks and industry best practices for optimal user experiences.',
    items: ['React', 'Angular', 'TypeScript', 'HTML5/CSS3']
  };

  backendCardData: CardData = {
    title: 'Backend Development',
    subtitle: 'Server Architecture & APIs',
    description: 'Creating robust server-side applications, RESTful APIs, and scalable backend architectures with security best practices.',
    items: ['Node.js', 'Express.js', 'GraphQL', 'JWT Auth']
  };

  databaseCardData: CardData = {
    title: 'Database Management',
    subtitle: 'Data Architecture & Optimization',
    description: 'Designing efficient database schemas and implementing optimized queries for high-performance data management.',
    items: ['MongoDB', 'MySQL']
  };

  mobileCardData: CardData = {
    title: 'Mobile Development',
    subtitle: 'Cross-Platform Applications',
    description: 'Building cross-platform mobile applications with native performance, beautiful material design, and seamless user experiences.',
    items: ['Flutter Framework'],
    platforms: ['iOS', 'Android', 'Web']
  };

  toolsCardData: CardData = {
    title: 'Development Tools',
    subtitle: 'Modern Workflow & Collaboration',
    description: 'Leveraging modern development tools and workflows for efficient collaboration, deployment, and project management.',
    items: ['Git & GitHub', 'CI/CD', 'Agile', 'Project Management']
  };

  designCardData: CardData = {
    title: 'Design & UX',
    subtitle: 'User Experience & Interface',
    description: 'Creating intuitive user experiences with modern design principles, accessibility standards, and performance optimization.',
    items: ['UI/UX Design', 'Figma', 'Accessibility', 'Performance']
  };

  stats = [
    {
      value: '15+',
      label: 'Technologies',
      description: 'Mastered & Applied'
    },
    {
      value: '3+',
      label: 'Years', 
      description: 'Professional Experience'
    },
    {
      value: '25+',
      label: 'Projects',
      description: 'Successfully Delivered'
    },
    {
      value: '100%',
      label: 'Satisfaction',
      description: 'Client Success Rate'
    }
  ];

  getStatGradient(index: number): string {
    const gradients = [
      'bg-gradient-to-br from-accent-300 to-accent-500',
      'bg-gradient-to-br from-primary-300 to-primary-500',
      'bg-gradient-to-br from-accent-300 to-primary-400', 
      'bg-gradient-to-br from-primary-300 to-accent-500'
    ];
    return gradients[index % gradients.length];
  }

  getStatBlurColor(index: number): string {
    const colors = [
      'text-accent-300/20',
      'text-primary-300/20',
      'text-accent-300/20',
      'text-primary-300/20'
    ];
    return colors[index % colors.length];
  }

  getStatBar(index: number): string {
    const bars = [
      'via-accent-500 to-transparent',
      'via-primary-500 to-transparent',
      'via-accent-500 to-transparent',
      'via-primary-500 to-transparent'
    ];
    return bars[index % bars.length];
  }

  onCardClick(cardData: CardData): void {
    console.log('Skill card clicked:', cardData);
  }

  onCardLinkClick(event: { link: any; data: CardData }): void {
    console.log('Card link clicked:', event);
  }
}