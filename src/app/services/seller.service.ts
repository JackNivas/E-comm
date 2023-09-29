import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { login, product, signUp } from '../data-type';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn= new BehaviorSubject<boolean>(false);
  isLoginError= new EventEmitter<boolean>(false)

  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(data:signUp){
    this.http.post('http://localhost:3000/seller',
    data,
    {observe:'response'}).subscribe((result)=>{
      console.warn(result)
      if(result){
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }
    })
  } 
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }
  userLogin(data:login){
   this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
   {observe:'response'}).subscribe((result:any)=>{
    console.warn(result)
    if(result && result.body && result.body.length===1){
      this.isLoginError.emit(false)
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
    }else{
      console.warn("login failed");
      this.isLoginError.emit(true)
    }
   })
  }  
  // constructor(private http: HttpClient, private router: Router) { }
  
  // isAuthenticated():boolean{
  //   if (sessionStorage.getItem('token')!==null) {
  //       return true;
  //   }
  //   return false;
  // }

  // // addProduct(data: product) {
  // //   return this.http.post('http://localhost:3000/products', data);
  // // }
  // canAccess(){
  //   if (!this.isAuthenticated()) {
  //       //redirect to login
  //       this.router.navigate(['/login']);
  //   }
  // }
  // canAuthenticate(){
  //   if (this.isAuthenticated()) {
  //     //redirect to Seller
  //     this.router.navigate(['/seller-home']);
  //   }
  // }

  // register(name:string,email:string,password:string){
  //     //send data to register api (firebase)
  //    return this.http
  //     .post<{idToken:string}>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_nHPDG5O0QtydFJa_47wn1HHMGoF-9a4',
  //         {displayName:name,email,password}
  //     );
  // }

  // storeToken(token:string){
  //     sessionStorage.setItem('token',token);
  // }

  // login(email:string,password:string){
  //   //send data to login api (firebase)
  //     return this.http
  //     .post<{idToken:string}>(
  //         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_nHPDG5O0QtydFJa_47wn1HHMGoF-9a4',
  //           {email,password}
  //     );
  // }

  // detail(){
  //   let token = sessionStorage.getItem('token');

  //   return this.http.post<{users:Array<{localId:string,displayName:string}>}>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]',
  //       {idToken:token}
  //   );
  // }

  // removeToken(){
  //   sessionStorage.removeItem('token');
  // }
}
