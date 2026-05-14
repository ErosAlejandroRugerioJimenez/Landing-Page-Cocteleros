import { Component } from '@angular/core';

import { HeroComponent } from './hero-component/hero-component';
import { NosotrosComponent } from './nosotros-component/nosotros-component';
import { MenuEventosComponent } from './menu-eventos-component/menu-eventos-component';
import { ContactoComponent } from './contacto-component/contacto-component';
import {GaleriaComponent} from "./galeria-component/galeria-component";
import { NavbarComponent } from './navbar-component/navbar-component';
import { FooterComponent } from './footer-component/footer-component';
import { UbicacionComponent } from './ubicacion-component/ubicacion-component';
import { PaquetesComponent } from './paquetes-component/paquetes-component';
import { LoaderComponent } from './loader-component/loader-component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    NosotrosComponent,
    MenuEventosComponent,
    ContactoComponent,
    GaleriaComponent,
    NavbarComponent,
    FooterComponent,
    UbicacionComponent,
    PaquetesComponent,
    LoaderComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}