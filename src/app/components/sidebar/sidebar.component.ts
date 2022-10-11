import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/banner', title: 'Banner',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/list-province', title: 'Province',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/list-district', title: 'District',  icon:'ni-bullet-list-67 text-red', class: '' },

    { path: '/list-ward', title: 'Ward',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/list-role', title: 'Role',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/list-employee', title: 'Employee',  icon:'ni-bullet-list-67 text-red', class: '' },
  ]



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}