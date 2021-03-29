import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Acceuil",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/icons",
    title: "Profile",
    rtlTitle: "الرموز",
    icon: "icon-atom",
    class: ""
  },
  {
    path: "/maps",
    title: "Catégories",
    rtlTitle: "خرائط",
    icon: "icon-pin",
    class: "" },
  {
    path: "/notifications",
    title: "Produits",
    rtlTitle: "إخطارات",
    icon: "icon-bell-55",
    class: ""
  },

  {
    path: "/user",
    title: "Utilisateurs",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/tables",
    title: "Commandes",
    rtlTitle: "قائمة الجدول",
    icon: "icon-puzzle-10",
    class: ""
  },
  {
    path: "/typography",
    title: "Déconnexion",
    rtlTitle: "طباعة",
    icon: "icon-lock-center",
    class: ""
  },
  {
    path: "/rtl",
    title: "Version arabe",
    rtlTitle: "ار تي ال",
    icon: "icon-world",
    class: ""
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
