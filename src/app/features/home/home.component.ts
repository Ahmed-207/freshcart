import { Component} from '@angular/core';
import { PopularProductsComponent } from "./popular-products/popular-products.component";
import { CategoriesSliderComponent } from "./categories-slider/categories-slider.component";
import { MainSliderComponent } from "./main-slider/main-slider.component";



@Component({
  selector: 'app-home',
  imports: [PopularProductsComponent, CategoriesSliderComponent, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent{

}
