import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AccountService } from "../_services/account.service";


@Injectable()
export class JWTInterceptor implements HttpInterceptor  {

  constructor(private accountService : AccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next : user => {
        if(user){
          req = req.clone({
            setHeaders : {
              Authorization : `Bearer ${user.token}`
            }
          })
        }
      }
    })
    
   return next.handle(req);
  }

}