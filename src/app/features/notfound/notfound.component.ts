import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ErrorPageLinks {
  path:string,
  label:string
}

@Component({
  selector: 'app-notfound',
  imports: [CommonModule, RouterLink],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css',
})
export class NotfoundComponent {


  quickLinks:ErrorPageLinks[] = [
    { path: '/products', label: 'Products' },
    { path: '/categories', label: 'Categories' },
    { path: '/home', label: 'Home Page' }
  ];

}
