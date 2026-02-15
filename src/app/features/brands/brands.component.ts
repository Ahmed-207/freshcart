import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Brands } from '../../core/models/brands/brands.interface';
import { BrandCardComponent } from "./components/brand-card/brand-card.component";
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-brands',
  imports: [BrandCardComponent,TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {

  private readonly brandsService = inject(BrandsService);
  private readonly router = inject(Router);

  brandsData: WritableSignal<Brands[]> = signal([]);

  ngOnInit(): void {

    this.callBrands();

  }

  callBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsData.set(res.data);
      }
    })
  }

  navigateToProductsByBrand(brandId:string):void{

    this.router.navigate(['/products'], {queryParams : {brand : brandId}})

  }


}
