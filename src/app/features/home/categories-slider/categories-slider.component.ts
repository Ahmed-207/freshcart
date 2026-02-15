import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Categories } from '../../../core/models/categories/categories.interface';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-categories-slider',
  imports: [CarouselModule,TranslatePipe],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css',
})
export class CategoriesSliderComponent {
  private readonly categoriesService = inject(CategoriesService);
  private readonly translator = inject(TranslateService);
  private readonly plat_id = inject(PLATFORM_ID);

  categoriesSliderData: WritableSignal<Categories[]> = signal([]);


  getPopularCategories(): void {

    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesSliderData.set(res.data);
      }
    })
  }

  ngOnInit(): void {

    this.onLangChanged();
    this.getPopularCategories();

  }
  categoriesCustomOptions: OwlOptions = {
    autoplay:true,
    autoplayTimeout:3500,
    autoplayHoverPause:true,
    slideTransition:'linear',
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 5
      }
    },
    nav: false
  }

    onLangChanged():void{
    if(isPlatformBrowser(this.plat_id)){
      this.translator.onLangChange.subscribe({
        next: (res)=>{
          this.categoriesCustomOptions = {
            ...this.categoriesCustomOptions, rtl : res.lang === 'ar'? true : false
          }
        }
      })
    }
  }


}
