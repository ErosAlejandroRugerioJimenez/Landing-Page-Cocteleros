import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss'
})
export class NavbarComponent {

  scrolled = false;
  menuAbierto = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 80;
  }

  irA(id: string): void {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });

    this.menuAbierto = false;
  }

}