import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Categories } from '../../core/models/categories/categories.interface';
import { CategoryCardComponent } from "./components/category-card/category-card.component";
import { Router } from '@angular/router';



@Component({
  selector: 'app-categories',
  imports: [CategoryCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService);
  private readonly router = inject(Router);

  categoriesDetailsArr : WritableSignal<Categories[]> = signal([]);

  ngOnInit(): void {
      this.categoriesService.getAllCategories().subscribe({
        next:(res)=>{
          this.categoriesDetailsArr.set(res.data);
        }
      })
  }

  navigateToCategory(catId:string):void{
    this.router.navigate(['products'], { queryParams: {categoryId : catId } })
  }


}
