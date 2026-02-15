import { BrandsService } from './../../core/services/brands/brands.service';
import { Component, computed, inject, OnDestroy, OnInit, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Products } from '../../core/models/products/products.interface';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Categories } from '../../core/models/categories/categories.interface';
import { Brands } from '../../core/models/brands/brands.interface';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { TranslatePipe } from '@ngx-translate/core';
import { Paginator, PaginatorModule, PaginatorState } from 'primeng/paginator';
import { WishlistService } from '../wishlist/services/wishlist.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent, FormsModule, FloatLabelModule, InputTextModule, SearchPipe, MenubarModule, TranslatePipe, Paginator, PaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {

  searchValue: string = '';

  items: WritableSignal<MenuItem[]> = signal([]);

  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoriesService = inject(CategoriesService);
  private readonly brandsService = inject(BrandsService)
  private readonly router = inject(Router);
  categoryIdforFilter: WritableSignal<string> = signal('');
  brandIdforFilter: WritableSignal<string> = signal('');
  allCategoriestList: WritableSignal<Categories[]> = signal([]);
  allBrandsList: WritableSignal<Brands[]> = signal([]);
  productList: WritableSignal<Products[]> = signal<Products[]>([]);
  productsSubscription!: Subscription;
  categoriesSubscription!: Subscription;
  brandsSubscription!: Subscription;
  private readonly plat_id = inject(PLATFORM_ID);
  productsPerPage: WritableSignal<number> = signal<number>(10);
  totalProducts: WritableSignal<number> = signal<number>(0);
  currentPage: WritableSignal<number> = signal<number>(1);
  first: WritableSignal<number> = signal<number>(0);
  private readonly wishlistService = inject(WishlistService);

  itemsForCategory: Signal<MenuItem[]> = computed(() =>
    this.allCategoriestList().map(category => ({
      label: category.name,
      command: () => this.filterBySpecificCategory(category._id)
    }))
  );
  itemsForBrand: Signal<MenuItem[]> = computed(() =>
    this.allBrandsList().map(brand => ({
      label: brand.name,
      command: () => this.filterBySpecificBrand(brand._id)
    }))
  );
  mainMenuItems: Signal<MenuItem[]> = computed(() => [
    {
      label: 'Filter By Category',
      icon: 'pi pi-search',
      items: this.itemsForCategory()
    },
    {
      label: 'Filter By Brand',
      icon: 'pi pi-search',
      items: this.itemsForBrand()
    }
  ]);

  ngOnInit(): void {

    this.getCategoriesForProductPage();
    this.getBrandsForProductPage();
    if (isPlatformBrowser(this.plat_id)) {
      this.getUserWishList();
    }

    this.activatedRoute.queryParams.subscribe((params) => {
      const page = params['page'] ? parseInt(params['page']) : 1;
      const cat_id = params['categoryId'];
      const brand_id = params['brand'];
      this.brandIdforFilter.set(brand_id);
      this.categoryIdforFilter.set(cat_id);
      this.productsPerPage.set(10);
      this.currentPage.set(page);
      this.first.set((page - 1) * this.productsPerPage())


      this.getAllProducts(page, cat_id, brand_id)
    })

  }

  onPageChange(event: PaginatorState) {
    const page = (event.page ?? 0) + 1;
    this.updateUrl({ page });
  }

  getUserWishList(): void {
    this.wishlistService.reqGetUserWishList().subscribe({
      next: (res) => {
        this.wishlistService.wishListProds.set(res.data);
        const ids = res.data.map(item => item._id);
        this.wishlistService.wishListIds.set(ids);
      }
    })
  }


  getAllProducts(page: number, catId?: string, brandId?: string): void {
    this.productsSubscription = this.productsService.setGetAllProducts('price', undefined, page, 10, brandId, undefined, catId).subscribe({
      next: (res) => {
        this.productList.set(res.data);
        this.totalProducts.set(res.results);
      }
    })
  }

  getCategoriesForProductPage(): void {
    this.categoriesSubscription = this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategoriestList.set(res.data);
      }
    })
  }

  getBrandsForProductPage(): void {
    this.brandsSubscription = this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.allBrandsList.set(res.data);
      }
    })
  }

  updateUrl(params: any): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge'
    })
  }

  filterBySpecificCategory(cat_Id: string): void {
    this.updateUrl({ categoryId: cat_Id, page: 1, brand: undefined });
  }

  filterBySpecificBrand(brandId: string): void {
    this.updateUrl({ brand: brandId, page: 1, categoryId: undefined });
  }

  clearFilters(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: 1,
        categoryId: null,
        brand: null
      },
      queryParamsHandling: 'merge'
    });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
    this.brandsSubscription.unsubscribe();
  }

}
