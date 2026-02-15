import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest-guard';
import { authGuard } from './core/guards/auth-guard';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        loadComponent: () => import('./core/layouts/auth/auth.component').then(c => c.AuthComponent),
        canActivate: [guestGuard],
        children: [
            {
                path: 'register',
                loadComponent: () => import('./core/auth/register/register.component').then(c => c.RegisterComponent),
                data: { titleKey: 'AUTH.REGISTER' }
            },
            {
                path: 'login',
                loadComponent: () => import('./core/auth/login/login.component').then(c => c.LoginComponent),
                data: { titleKey: 'AUTH.LOGIN' }
            },
            {
                path: 'forgotpassword',
                loadComponent: () => import('./core/auth/email-verify/email-verify.component').then(c => c.EmailVerifyComponent),
                data: { titleKey: 'AUTH.FORGOT_PASSWORD' }
            },
            {
                path: 'codeverify',
                loadComponent: () => import('./core/auth/code-verify/code-verify.component').then(c => c.CodeVerifyComponent),
                data: { titleKey: 'AUTH.CODE_VERIFY' }
            },
            {
                path: 'resetpass',
                loadComponent: () => import('./core/auth/reset-password/reset-password.component').then(c => c.ResetPasswordComponent),
                data: { titleKey: 'AUTH.RESET_PASS' }
            }
        ]
    },
    {
        path: '',
        loadComponent: () => import('./core/layouts/main/main.component').then(c => c.MainComponent),
        canActivate: [authGuard],
        children: [
            {
                path: 'home',
                loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent),
                data: { titleKey: 'HOME.TITLE' }
            },
            {
                path: 'products',
                loadComponent: () => import('./features/products/products.component').then(c => c.ProductsComponent),
                data: { titleKey: 'PRODUCTS.TITLE' }
            },
            {
                path: 'categories',
                loadComponent: () => import('./features/categories/categories.component').then(c => c.CategoriesComponent),
                data: { titleKey: 'CATEGORIES.TITLE' }
            },
            {
                path: 'brands',
                loadComponent: () => import('./features/brands/brands.component').then(c => c.BrandsComponent),
                data: { titleKey: 'BRANDS.TITLE' }
            },
            {
                path: 'details/:slug/:id',
                loadComponent: () => import('./features/details/details.component').then(c => c.DetailsComponent),
                data: { titleKey: 'DETAILS.TITLE' }
            },
            {
                path: 'cart',
                loadComponent: () => import('./features/cart/cart.component').then(c => c.CartComponent),
                data: { titleKey: 'CART.TITLE' }
            },
            {
                path: 'checkout/:id',
                loadComponent: () => import('./features/checkout/checkout.component').then(c => c.CheckoutComponent),
                data: { titleKey: 'CHECKOUT.TITLE' }
            },
            {
                path: 'allorders',
                loadComponent: () => import('./features/all-orders/all-orders.component').then(c => c.AllOrdersComponent),
                data: { titleKey: 'ORDERS.TITLE' }
            },
            {
                path: 'profile',
                loadComponent: () => import('./features/userprofile/userprofile.component').then(c => c.UserprofileComponent),
                data: { titleKey: 'PROFILE.TITLE' }
            },
            {
                path: 'changepass',
                loadComponent: () => import('./features/userprofile/components/change-pass/change-pass.component').then(c => c.ChangePassComponent),
                data: { titleKey: 'PROFILE.CHANGE_PASS' }
            },
            {
                path: 'wishlist',
                loadComponent: () => import('./features/wishlist/wishlist.component').then((c) => c.WishlistComponent),
                data: { titleKey: 'WISHLIST.TITLE' }
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./features/notfound/notfound.component').then(c => c.NotfoundComponent),
        data: { titleKey: 'ERROR.NOT_FOUND' }
    }
]