import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { cart, login, product, signUp } from '../data-type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showLogin:boolean=true
  authError:string="";
  constructor(private user: UserService, private product:ProductService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: signUp) {
    this.user.userSignUp(data);
  }
  login(data:login) {
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result)=>{
      console.warn(result);
      if(result){
         this.authError="User not found"
      }else{
        this.localCartToRemoteCart();
      }
      
    })
  }
  openSignUp(){
    this.showLogin=false
  }
  openLogin(){
this.showLogin=true;
  }

  localCartToRemoteCart(){
   let data = localStorage.getItem('localCart');
   let user = localStorage.getItem('user');
   let userId= user && JSON.parse(user).id;
   if(data){
    let cartDataList:product[]= JSON.parse(data);
  
    cartDataList.forEach((product:product, index)=>{
      let cartData:cart={
        ...product,
        productId:product.id,
        userId
      }
      delete cartData.id;
      setTimeout(() => {
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            console.warn("data is stored in DB");
          }
        })
      }, 500);
      if(cartDataList.length===index+1){
        localStorage.removeItem('localCart')
      }
    })
   }

   setTimeout(() => {
    this.product.getCartList(userId)
   }, 2000);
    
  }
//   formdata = {name:"", email:"",password:""};
//   showLogin:boolean=true;
//   submit=false;
//   loading=false;
//   errorMessage="";
//   constructor(private auth:UserService) { }

//   ngOnInit(): void {
//     this.auth.canAuthenticate();
//   }

//   onSubmit(){
//     this.loading=true;
//     //call login service
//     this.auth.login(this.formdata.email,this.formdata.password)
//     .subscribe({
//         next:data=>{
//             //store token
//             this.auth.storeToken(data.idToken);
//             console.log('logged user token is '+data.idToken);
//             this.auth.canAuthenticate();
//         },
//         error:data=>{
//             if (data.error.error.message=="INVALID_PASSWORD" || data.error.error.message=="INVALID_EMAIL") {
//                 this.errorMessage = "Invalid Credentials!";
//             } else{
//                 this.errorMessage = "Unknown error when logging into this account!";
//             }
//         }
//     }).add(()=>{
//         this.loading =false;
//         console.log('login process completed!');

//     })
//   }
//   openSignUp(){
//     this.showLogin=false
//   }
//   openLogin(){
// this.showLogin=true;
//   }

}
