import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authSrv: AuthService, private route: Router) { }
  ngOnInit(): void {

  }

  public async logout(): Promise<void> {
    try {
      await this.authSrv.logout();
      this.route.navigate(['/login']);
    } catch (error) {
      console.error(error);

    }

  }
}
