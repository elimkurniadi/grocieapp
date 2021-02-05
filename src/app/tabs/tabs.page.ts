import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  menus = [
    {
      icon: 'storefront-outline',
      label: 'Store',
      route: 'home',
    },

    {
      icon: 'heart-outline',
      label: 'Favorites',
      route: 'favorite',
    },

    {
      icon: 'cart-outline',
      label: 'My Cart',
      route: 'cart',
    },

    {
      icon: 'chatbubbles-outline',
      label: 'Chat',
      route: 'notification',
    },
    {
      icon: 'person-outline',
      label: 'Profile',
      route: 'profile',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
