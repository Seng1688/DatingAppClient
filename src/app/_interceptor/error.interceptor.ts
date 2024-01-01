import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modelStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modelStateErrors.push(error.error.errors[key])
                  }
                }
                throw modelStateErrors.flat();
              }
              else {
                this.toastr.error(error.error, error.status.toString())
              }
              break;

            case 401:
              this.toastr.error('Unauthorised', error.status.toString());
              break;

            case 404:
              this.router.navigateByUrl('/not-found');
              break;

            case 500:
              const navigationExtras: NavigationExtras = { state: { error: error.error } };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(error);
              break;

          }
        }
        throw error;
      })
    )
  }

}