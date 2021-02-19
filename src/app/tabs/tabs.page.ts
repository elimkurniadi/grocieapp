import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  selectedTab;
  menus = [
    {
      icon: 'storefront-outline',
      icon_active: 'storefront',
      label: 'Store',
      route: 'home',
      selected: '',
    },
    {
      icon: 'heart-outline',
      icon_active: 'heart',
      label: 'Favorites',
      route: 'favorite',
      selected: '',
    },
    {
      icon: 'cart-outline',
      icon_active: 'cart',
      label: 'My Cart',
      route: 'cart',
      selected: '',
    },
    {
      icon: 'chatbubbles-outline',
      icon_active: 'chatbubbles',
      label: 'Chat',
      route: 'chat',
      selected: '',
    },
    {
      icon: 'person-outline',
      icon_active: 'person',
      label: 'Profile',
      route: 'profile',
      selected: '',
    },
  ];

  constructor() {}

  ngOnInit() {
    this.initMenuIcon();
  }

  setCurrentTab() {
    this.initMenuIcon();
    const idx = this.menus.find((menu) => menu.route === this.tabs.getSelected());
    if(idx) {
      idx.selected = idx.icon_active;
    }
  }

  initMenuIcon() {
    this.menus.forEach((element) => {
      Object.assign(element, { selected: element.icon });
    });
  }
}
