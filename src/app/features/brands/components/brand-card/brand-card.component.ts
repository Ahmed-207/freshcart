import { Component, Input } from '@angular/core';
import { Brands } from '../../../../core/models/brands/brands.interface';

@Component({
  selector: 'app-brand-card',
  imports: [],
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.css',
})
export class BrandCardComponent {

  @Input() brandCardData:Brands = {} as Brands

}
