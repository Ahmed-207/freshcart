import { Component, Input } from '@angular/core';
import { Categories } from '../../../../core/models/categories/categories.interface';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {

  @Input() categoriesDetails: Categories = {} as Categories;
}
