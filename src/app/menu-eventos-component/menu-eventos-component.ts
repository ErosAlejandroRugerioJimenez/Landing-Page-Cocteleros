import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu-eventos-component',
  imports: [CommonModule],
  templateUrl: './menu-eventos-component.html',
  styleUrl: './menu-eventos-component.scss',
})
export class MenuEventosComponent {
  cocteles = [
    { nombre: 'Mojito', descripcion: 'Ron, hierbabuena, limón y soda.' },
    { nombre: 'Margarita', descripcion: 'Tequila, limón y toque de sal.' },
    { nombre: 'Paloma', descripcion: 'Tequila, toronja y limón.' },
    { nombre: 'Piña Colada', descripcion: 'Ron, crema de coco y piña.' },
    { nombre: 'Azulito', descripcion: 'Vodka, bebida azul y limón.' },
    { nombre: 'Sin alcohol', descripcion: 'Opciones frescas para todos.' }
  ];
}