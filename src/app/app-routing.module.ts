import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import {LoginComponent} from './login/login.component';
import { SellerAddProdutsComponent } from './seller-add-produts/seller-add-produts.component';
import { SellerUpdateProductsComponent } from './seller-update-products/seller-update-products.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'seller-auth', component: SellerAuthComponent },
  { path: 'seller-home', component: SellerHomeComponent},
  { path: 'seller-add-products', component: SellerAddProdutsComponent},
  { path: 'seller-update-products', component: SellerUpdateProductsComponent},
  { path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
