import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-galeria-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria-component.html',
  styleUrl: './galeria-component.scss'
})
export class GaleriaComponent {

  imagenes = [
  { src: '/img/galeria/1.jpg', nombre: 'Tequila Sunrise' },
  { src: '/img/galeria/2.jpg', nombre: 'Pantera Rosa' },
  { src: '/img/galeria/3.jpg', nombre: 'Mojito' },
  { src: '/img/galeria/4.jpg', nombre: 'Piña Colada' },
  { src: '/img/galeria/55.jpg', nombre: 'Clericot' },
  { src: '/img/galeria/6.jpg', nombre: 'Cantaritos' },
];

}