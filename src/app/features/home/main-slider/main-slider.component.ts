import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
})
export class MainSliderComponent {

  private readonly translator = inject(TranslateService);
  private readonly plat_id = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.onLangChanged();
  }

  mainSliderCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
    rtl: this.translator.getCurrentLang() === 'ar' ? true : false
  }

  onLangChanged(): void {
    if (isPlatformBrowser(this.plat_id)) {
      this.translator.onLangChange.subscribe({
        next: (res) => {
          this.mainSliderCustomOptions = {
            ...this.mainSliderCustomOptions, rtl: res.lang === 'ar' ? true : false
          }
        }
      })
    }
  }

}
