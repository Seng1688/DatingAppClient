import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css'
})
export class ServerErrorComponent {
  error :any;

  constructor(router: Router) { 
    const navigation = router.getCurrentNavigation();
    console.log(navigation);
    this.error = navigation?.extras?.state?.error;
  }

}
