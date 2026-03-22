import { Component, HostListener } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auth.service";
import * as i2 from "@angular/router";
import * as i3 from "../../../core/services/marketplace-ui.service";
import * as i4 from "@angular/common";
function HeaderComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 34)(1, "a", 35);
    i0.ɵɵlistener("click", function HeaderComponent_div_7_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵelement(2, "img", 36);
    i0.ɵɵelementStart(3, "span", 37);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r1.isPageActive(item_r3.key) ? "text-red-600" : "text-gray-500");
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", item_r3.route);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", item_r3.icon, i0.ɵɵsanitizeUrl)("alt", item_r3.mobileLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.mobileLabel);
} }
function HeaderComponent_a_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 38);
    i0.ɵɵelement(1, "img", 39);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", item_r4.route)("ngClass", ctx_r1.isPageActive(item_r4.key) ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-100");
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", item_r4.icon, i0.ɵɵsanitizeUrl)("alt", item_r4.desktopLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r4.desktopLabel);
} }
function HeaderComponent_div_20_ng_container_41_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 67)(2, "a", 68);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_container_41_Template_a_click_2_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 69);
    i0.ɵɵelement(4, "path", 70);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " Connexion ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "a", 71);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_container_41_Template_a_click_6_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(7, "svg", 69);
    i0.ɵɵelement(8, "path", 72);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, " Inscription ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} }
function HeaderComponent_div_20_ng_template_42_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 67)(1, "div", 73)(2, "div", 74);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 75)(5, "p", 76);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 77);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "a", 78);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_template_42_Template_a_click_9_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(10, "svg", 69);
    i0.ɵɵelement(11, "path", 79);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12, " Mon Dashboard ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(13, "a", 80);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_template_42_Template_a_click_13_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(14, "svg", 69);
    i0.ɵɵelement(15, "path", 81);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(16, " Mes Annonces ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(17, "a", 82);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_template_42_Template_a_click_17_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(18, "svg", 69);
    i0.ɵɵelement(19, "path", 83);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(20, " Cr\u00E9er une annonce ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(21, "button", 84);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_template_42_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.logout()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(22, "svg", 69);
    i0.ɵɵelement(23, "path", 85);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(24, " D\u00E9connexion ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.currentUserInitial, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.currentUser == null ? null : ctx_r1.currentUser.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.currentUser == null ? null : ctx_r1.currentUser.email);
} }
function HeaderComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40)(1, "div", 41)(2, "div", 42);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 43);
    i0.ɵɵelement(4, "path", 44);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "div", 45)(6, "h2", 46);
    i0.ɵɵtext(7, "Centre d'aide");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 47);
    i0.ɵɵtext(9, "Besoin d'assistance ?");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 48)(11, "div", 49)(12, "div", 50);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(13, "svg", 51);
    i0.ɵɵelement(14, "path", 52);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(15, "div", 45)(16, "h3", 53);
    i0.ɵɵtext(17, "Devenir vendeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "p", 54);
    i0.ɵɵtext(19, " Rejoignez notre marketplace et commencez \u00E0 vendre ! ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 55);
    i0.ɵɵtext(21, " En savoir plus ");
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(22, "svg", 56);
    i0.ɵɵelement(23, "path", 57);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(24, "div", 58)(25, "a", 59);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(26, "svg", 60);
    i0.ɵɵelement(27, "path", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(28, "span", 62);
    i0.ɵɵtext(29, "Parrainez un vendeur");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "a", 59);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(31, "svg", 60);
    i0.ɵɵelement(32, "path", 63);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(33, "span", 62);
    i0.ɵɵtext(34, "Trouver un co-vendeur");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "a", 59);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(36, "svg", 60);
    i0.ɵɵelement(37, "path", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(38, "span", 62);
    i0.ɵɵtext(39, "Cartes cadeaux");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(40, "div", 65);
    i0.ɵɵtemplate(41, HeaderComponent_div_20_ng_container_41_Template, 10, 0, "ng-container", 66)(42, HeaderComponent_div_20_ng_template_42_Template, 25, 3, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const authenticatedMenu_r7 = i0.ɵɵreference(43);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(41);
    i0.ɵɵproperty("ngIf", !ctx_r1.currentUser)("ngIfElse", authenticatedMenu_r7);
} }
function HeaderComponent_button_41_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 86);
    i0.ɵɵlistener("click", function HeaderComponent_button_41_Template_button_click_0_listener() { const filter_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setAnimalFilter(filter_r9.value)); });
    i0.ɵɵelementStart(1, "div", 87);
    i0.ɵɵelement(2, "img", 88);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 89);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const filter_r9 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.animalFilter === filter_r9.value ? "border-red-500 bg-red-50" : "border-gray-200 bg-white group-hover:border-red-500");
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", filter_r9.icon, i0.ɵɵsanitizeUrl)("alt", filter_r9.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(filter_r9.label);
} }
export class HeaderComponent {
    constructor(auth, router, elementRef, uiState) {
        this.auth = auth;
        this.router = router;
        this.elementRef = elementRef;
        this.uiState = uiState;
        this.currentUser = null;
        this.currentUrl = '/';
        this.menuOpen = false;
        this.animalFilter = '';
        this.searchTerm = '';
        this.subscriptions = new Subscription();
        this.navItems = [
            {
                key: 'homes',
                route: '/',
                desktopLabel: 'Accueil',
                mobileLabel: 'Accueil',
                icon: 'assets/images/home.png',
            },
            {
                key: 'experiences',
                route: '/experiences',
                desktopLabel: 'Annonces',
                mobileLabel: 'Exp\u00E9riences',
                icon: 'assets/images/light-bulb.png',
            },
            {
                key: 'services',
                route: '/services',
                desktopLabel: 'Services',
                mobileLabel: 'Services',
                icon: 'assets/images/bell.png',
            },
        ];
        this.animalFilters = [
            { value: '', label: 'Tout', icon: 'assets/images/infinity.png' },
            { value: 'poulet', label: 'Poulets', icon: 'assets/images/chicken.png' },
            { value: 'boeuf', label: 'Bovins', icon: 'assets/images/cow.png' },
            { value: 'mouton', label: 'Moutons', icon: 'assets/images/sheep.png' },
            { value: 'porc', label: 'Porcs', icon: 'assets/images/pig.png' },
        ];
    }
    ngOnInit() {
        this.currentUrl = this.router.url;
        this.subscriptions.add(this.auth.currentUser$.subscribe((user) => {
            this.currentUser = user;
        }));
        this.subscriptions.add(this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl = event.urlAfterRedirects;
                this.menuOpen = false;
            }
        }));
        this.subscriptions.add(this.uiState.animalFilter$.subscribe((animalFilter) => {
            this.animalFilter = animalFilter;
        }));
        this.subscriptions.add(this.uiState.searchTerm$.subscribe((searchTerm) => {
            this.searchTerm = searchTerm;
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    onDocumentClick(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.menuOpen = false;
        }
    }
    logout() {
        this.auth.logout();
        this.router.navigate(['/']);
    }
    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
    closeMenu() {
        this.menuOpen = false;
    }
    setAnimalFilter(filter) {
        this.uiState.setAnimalFilter(filter);
    }
    updateSearchTerm(value) {
        this.uiState.setSearchTerm(value);
    }
    isPageActive(key) {
        if (key === 'homes') {
            return this.currentUrl === '/';
        }
        return this.currentUrl.startsWith(`/${key}`);
    }
    get currentUserInitial() {
        return (this.currentUser?.name ?? '?').charAt(0).toUpperCase();
    }
    static { this.ɵfac = function HeaderComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HeaderComponent)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i3.MarketplaceUiService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HeaderComponent, selectors: [["app-header"]], hostBindings: function HeaderComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function HeaderComponent_click_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, i0.ɵɵresolveDocument);
        } }, standalone: false, decls: 42, vars: 5, consts: [["authenticatedMenu", ""], [1, "border", "border-transparent", "md:border-2", "w-full", "px-4", "bg-[#f7f7f7]"], [1, "flex", "flex-col", "md:hidden"], ["type", "button", 1, "flex", "items-center", "gap-3", "mx-4", "my-4", "px-4", "py-3", "bg-white", "rounded-full", "shadow-md", "border", "border-gray-200", "hover:shadow-lg", "transition-shadow"], ["src", "assets/images/find_black.png", "alt", "search", 1, "w-5", "h-5"], [1, "text-gray-600", "text-sm"], [1, "flex", "justify-around", "border-t", "border-gray-200", "pt-2", "pb-3"], ["class", "flex flex-col items-center gap-1", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "hidden", "md:flex", "justify-between", "items-center", "w-full", "px-8", "py-4"], [1, "flex-shrink-0"], ["routerLink", "/"], ["src", "assets/images/airbnb-desktop.png", "alt", "Marketplace Betail", 1, "h-10", "w-auto"], [1, "flex", "gap-8", "text-base", "font-medium"], ["class", "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors", 3, "routerLink", "ngClass", 4, "ngFor", "ngForOf"], [1, "flex", "gap-3"], ["type", "button", 1, "flex", "items-center", "justify-center", "bg-white", "border", "border-gray-200", "rounded-lg", "w-10", "h-10", "hover:shadow-md", "transition-shadow"], ["src", "assets/images/globe.png", "alt", "language", 1, "h-5", "w-5"], [1, "relative"], ["type", "button", 1, "flex", "items-center", "justify-center", "bg-white", "border", "border-gray-200", "rounded-lg", "w-10", "h-10", "hover:shadow-md", "transition-shadow", 3, "click"], ["src", "assets/images/menu.png", "alt", "menu", 1, "h-5", "w-5"], ["class", "absolute right-0 top-full mt-2 bg-white w-80 shadow-xl rounded-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn", 4, "ngIf"], [1, "hidden", "md:flex", "justify-center", "mt-5"], [1, "w-full", "max-w-4xl", "border", "rounded-full", "shadow-xl", "px-6", "py-3", "bg-white"], [1, "flex", "justify-between", "items-center"], [1, "flex", "flex-col"], ["type", "text", "placeholder", "Search city or landmark", 1, "flex-1", "outline-none", "bg-[#f7f7f7]", 3, "input", "value"], [1, "h-6", "w-px", "bg-gray-300"], [1, "flex", "flex-col", "m-[10px]"], ["type", "text", "placeholder", "Add dates", 1, "flex-1", "outline-none", "border-0", "bg-[#f7f7f7]"], ["type", "text", "placeholder", "Add guests", 1, "flex-1", "outline-none", "bg-[#f7f7f7]"], ["type", "button", 1, "flex", "justify-center", "items-center", "rounded-full", "hover:bg-red-800", "bg-red-600", "w-[60px]", "h-[60px]"], ["src", "assets/images/find.png", "alt", "search", 1, "w-auto", "h-[45px]"], [1, "flex", "gap-4", "py-6", "px-4", "overflow-x-auto", "scrollbar-hide", "md:justify-center"], ["type", "button", "class", "group flex-shrink-0 bg-transparent border-0 p-0", 3, "click", 4, "ngFor", "ngForOf"], [1, "flex", "flex-col", "items-center", "gap-1", 3, "ngClass"], [1, "flex", "flex-col", "items-center", 3, "click", "routerLink"], [1, "h-6", "w-6", 3, "src", "alt"], [1, "text-xs", "mt-1"], [1, "flex", "items-center", "gap-2", "px-4", "py-2", "rounded-lg", "transition-colors", 3, "routerLink", "ngClass"], [1, "h-5", "w-5", 3, "src", "alt"], [1, "absolute", "right-0", "top-full", "mt-2", "bg-white", "w-80", "shadow-xl", "rounded-2xl", "border", "border-gray-200", "overflow-hidden", "z-50", "animate-fadeIn"], [1, "flex", "items-center", "gap-3", "p-4", "border-b", "border-gray-100", "hover:bg-gray-50", "transition-colors", "cursor-pointer"], [1, "flex", "items-center", "justify-center", "w-10", "h-10", "bg-red-50", "rounded-full"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-red-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "flex-1"], [1, "font-semibold", "text-gray-900"], [1, "text-xs", "text-gray-500"], [1, "p-4", "bg-gradient-to-br", "from-red-50", "to-orange-50", "border-b", "border-gray-100"], [1, "flex", "items-start", "gap-3"], [1, "flex-shrink-0", "w-10", "h-10", "bg-red-600", "rounded-lg", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-white"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "font-semibold", "text-gray-900", "mb-1"], [1, "text-xs", "text-gray-600", "leading-relaxed", "mb-2"], ["type", "button", 1, "text-xs", "font-medium", "text-red-600", "hover:text-red-700", "flex", "items-center", "gap-1", "group"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-3", "h-3", "group-hover:translate-x-1", "transition-transform"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 5l7 7-7 7"], [1, "py-2"], ["href", "#", 1, "flex", "items-center", "gap-3", "px-4", "py-3", "hover:bg-gray-50", "transition-colors", "group"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-gray-400", "group-hover:text-red-600", "transition-colors"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"], [1, "text-sm", "font-medium", "text-gray-700", "group-hover:text-gray-900"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"], [1, "border-t", "border-gray-100", "p-4"], [4, "ngIf", "ngIfElse"], [1, "flex", "flex-col", "gap-3"], ["routerLink", "/login", 1, "w-full", "bg-red-600", "hover:bg-red-700", "text-white", "font-medium", "py-2.5", "px-4", "rounded-lg", "transition-colors", "shadow-sm", "hover:shadow-md", "flex", "items-center", "justify-center", "gap-2", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"], ["routerLink", "/register", 1, "w-full", "bg-white", "hover:bg-gray-50", "text-gray-900", "font-medium", "py-2.5", "px-4", "rounded-lg", "transition-colors", "border", "border-gray-300", "flex", "items-center", "justify-center", "gap-2", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"], [1, "flex", "items-center", "gap-3", "p-3", "bg-gray-50", "rounded-lg"], [1, "w-10", "h-10", "bg-red-600", "rounded-full", "flex", "items-center", "justify-center", "text-white", "font-semibold"], [1, "flex-1", "min-w-0"], [1, "font-medium", "text-gray-900", "truncate"], [1, "text-sm", "text-gray-500", "truncate"], ["routerLink", "/dashboard", 1, "w-full", "bg-white", "hover:bg-gray-50", "text-gray-900", "font-medium", "py-2.5", "px-4", "rounded-lg", "transition-colors", "border", "border-gray-300", "flex", "items-center", "gap-2", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"], ["routerLink", "/profil/mes-annonces", 1, "w-full", "bg-white", "hover:bg-gray-50", "text-gray-900", "font-medium", "py-2.5", "px-4", "rounded-lg", "transition-colors", "border", "border-gray-300", "flex", "items-center", "gap-2", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], ["routerLink", "/annonces/creer", 1, "w-full", "bg-red-600", "hover:bg-red-700", "text-white", "font-medium", "py-2.5", "px-4", "rounded-lg", "transition-colors", "shadow-sm", "hover:shadow-md", "flex", "items-center", "justify-center", "gap-2", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], ["type", "button", 1, "w-full", "bg-white", "hover:bg-red-50", "text-red-600", "font-medium", "py-2.5", "px-4", "rounded-lg", "transition-colors", "border", "border-red-200", "flex", "items-center", "justify-center", "gap-2", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"], ["type", "button", 1, "group", "flex-shrink-0", "bg-transparent", "border-0", "p-0", 3, "click"], [1, "flex", "items-center", "justify-center", "rounded-full", "h-16", "w-16", "border-2", "transition-colors", 3, "ngClass"], [1, "h-8", "w-8", 3, "src", "alt"], [1, "text-xs", "text-gray-600", "group-hover:text-red-600"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "button", 3);
            i0.ɵɵelement(3, "img", 4);
            i0.ɵɵelementStart(4, "span", 5);
            i0.ɵɵtext(5, "Rechercher un animal...");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 6);
            i0.ɵɵtemplate(7, HeaderComponent_div_7_Template, 5, 5, "div", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 8)(9, "div", 9)(10, "a", 10);
            i0.ɵɵelement(11, "img", 11);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "div", 12);
            i0.ɵɵtemplate(13, HeaderComponent_a_13_Template, 4, 5, "a", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 14)(15, "button", 15);
            i0.ɵɵelement(16, "img", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "div", 17)(18, "button", 18);
            i0.ɵɵlistener("click", function HeaderComponent_Template_button_click_18_listener() { return ctx.toggleMenu(); });
            i0.ɵɵelement(19, "img", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(20, HeaderComponent_div_20_Template, 44, 2, "div", 20);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(21, "div", 21)(22, "div", 22)(23, "div", 23)(24, "div", 24)(25, "h2");
            i0.ɵɵtext(26, "Where");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "input", 25);
            i0.ɵɵlistener("input", function HeaderComponent_Template_input_input_27_listener($event) { return ctx.updateSearchTerm($event.target.value); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(28, "div", 26);
            i0.ɵɵelementStart(29, "div", 27)(30, "h2");
            i0.ɵɵtext(31, "When");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(32, "input", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(33, "div", 26);
            i0.ɵɵelementStart(34, "div", 27)(35, "h2");
            i0.ɵɵtext(36, "Who");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(37, "input", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "button", 30);
            i0.ɵɵelement(39, "img", 31);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(40, "div", 32);
            i0.ɵɵtemplate(41, HeaderComponent_button_41_Template, 5, 4, "button", 33);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngForOf", ctx.navItems);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngForOf", ctx.navItems);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.menuOpen);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("value", ctx.searchTerm);
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngForOf", ctx.animalFilters);
        } }, dependencies: [i4.NgClass, i4.NgForOf, i4.NgIf, i2.RouterLink], styles: ["[_nghost-%COMP%] {\n  display: block;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HeaderComponent, [{
        type: Component,
        args: [{ selector: 'app-header', standalone: false, template: "<div class=\"border border-transparent md:border-2 w-full px-4 bg-[#f7f7f7]\">\n  <div class=\"flex flex-col md:hidden\">\n    <button\n      type=\"button\"\n      class=\"flex items-center gap-3 mx-4 my-4 px-4 py-3 bg-white rounded-full shadow-md border border-gray-200 hover:shadow-lg transition-shadow\"\n    >\n      <img src=\"assets/images/find_black.png\" alt=\"search\" class=\"w-5 h-5\" />\n      <span class=\"text-gray-600 text-sm\">Rechercher un animal...</span>\n    </button>\n\n    <div class=\"flex justify-around border-t border-gray-200 pt-2 pb-3\">\n      <div\n        *ngFor=\"let item of navItems\"\n        class=\"flex flex-col items-center gap-1\"\n        [ngClass]=\"isPageActive(item.key) ? 'text-red-600' : 'text-gray-500'\"\n      >\n        <a [routerLink]=\"item.route\" class=\"flex flex-col items-center\" (click)=\"closeMenu()\">\n          <img [src]=\"item.icon\" class=\"h-6 w-6\" [alt]=\"item.mobileLabel\" />\n          <span class=\"text-xs mt-1\">{{ item.mobileLabel }}</span>\n        </a>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"hidden md:flex justify-between items-center w-full px-8 py-4\">\n    <div class=\"flex-shrink-0\">\n      <a routerLink=\"/\">\n        <img src=\"assets/images/airbnb-desktop.png\" class=\"h-10 w-auto\" alt=\"Marketplace Betail\" />\n      </a>\n    </div>\n\n    <div class=\"flex gap-8 text-base font-medium\">\n      <a\n        *ngFor=\"let item of navItems\"\n        [routerLink]=\"item.route\"\n        class=\"flex items-center gap-2 px-4 py-2 rounded-lg transition-colors\"\n        [ngClass]=\"\n          isPageActive(item.key)\n            ? 'bg-red-50 text-red-600'\n            : 'text-gray-700 hover:bg-gray-100'\n        \"\n      >\n        <img [src]=\"item.icon\" class=\"h-5 w-5\" [alt]=\"item.desktopLabel\" />\n        <span>{{ item.desktopLabel }}</span>\n      </a>\n    </div>\n\n    <div class=\"flex gap-3\">\n      <button\n        type=\"button\"\n        class=\"flex items-center justify-center bg-white border border-gray-200 rounded-lg w-10 h-10 hover:shadow-md transition-shadow\"\n      >\n        <img src=\"assets/images/globe.png\" alt=\"language\" class=\"h-5 w-5\" />\n      </button>\n\n      <div class=\"relative\">\n        <button\n          type=\"button\"\n          (click)=\"toggleMenu()\"\n          class=\"flex items-center justify-center bg-white border border-gray-200 rounded-lg w-10 h-10 hover:shadow-md transition-shadow\"\n        >\n          <img src=\"assets/images/menu.png\" class=\"h-5 w-5\" alt=\"menu\" />\n        </button>\n\n        <div\n          *ngIf=\"menuOpen\"\n          class=\"absolute right-0 top-full mt-2 bg-white w-80 shadow-xl rounded-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn\"\n        >\n          <div class=\"flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer\">\n            <div class=\"flex items-center justify-center w-10 h-10 bg-red-50 rounded-full\">\n              <svg class=\"w-5 h-5 text-red-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />\n              </svg>\n            </div>\n            <div class=\"flex-1\">\n              <h2 class=\"font-semibold text-gray-900\">Centre d'aide</h2>\n              <p class=\"text-xs text-gray-500\">Besoin d'assistance ?</p>\n            </div>\n          </div>\n\n          <div class=\"p-4 bg-gradient-to-br from-red-50 to-orange-50 border-b border-gray-100\">\n            <div class=\"flex items-start gap-3\">\n              <div class=\"flex-shrink-0 w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center\">\n                <svg class=\"w-5 h-5 text-white\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />\n                </svg>\n              </div>\n              <div class=\"flex-1\">\n                <h3 class=\"font-semibold text-gray-900 mb-1\">Devenir vendeur</h3>\n                <p class=\"text-xs text-gray-600 leading-relaxed mb-2\">\n                  Rejoignez notre marketplace et commencez &agrave; vendre !\n                </p>\n                <button type=\"button\" class=\"text-xs font-medium text-red-600 hover:text-red-700 flex items-center gap-1 group\">\n                  En savoir plus\n                  <svg class=\"w-3 h-3 group-hover:translate-x-1 transition-transform\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 5l7 7-7 7\" />\n                  </svg>\n                </button>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"py-2\">\n            <a href=\"#\" class=\"flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group\">\n              <svg class=\"w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z\" />\n              </svg>\n              <span class=\"text-sm font-medium text-gray-700 group-hover:text-gray-900\">Parrainez un vendeur</span>\n            </a>\n\n            <a href=\"#\" class=\"flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group\">\n              <svg class=\"w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\" />\n              </svg>\n              <span class=\"text-sm font-medium text-gray-700 group-hover:text-gray-900\">Trouver un co-vendeur</span>\n            </a>\n\n            <a href=\"#\" class=\"flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group\">\n              <svg class=\"w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7\" />\n              </svg>\n              <span class=\"text-sm font-medium text-gray-700 group-hover:text-gray-900\">Cartes cadeaux</span>\n            </a>\n          </div>\n\n          <div class=\"border-t border-gray-100 p-4\">\n            <ng-container *ngIf=\"!currentUser; else authenticatedMenu\">\n              <div class=\"flex flex-col gap-3\">\n                <a\n                  routerLink=\"/login\"\n                  (click)=\"closeMenu()\"\n                  class=\"w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2\"\n                >\n                  <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1\" />\n                  </svg>\n                  Connexion\n                </a>\n\n                <a\n                  routerLink=\"/register\"\n                  (click)=\"closeMenu()\"\n                  class=\"w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-300 flex items-center justify-center gap-2\"\n                >\n                  <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z\" />\n                  </svg>\n                  Inscription\n                </a>\n              </div>\n            </ng-container>\n\n            <ng-template #authenticatedMenu>\n              <div class=\"flex flex-col gap-3\">\n                <div class=\"flex items-center gap-3 p-3 bg-gray-50 rounded-lg\">\n                  <div class=\"w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold\">\n                    {{ currentUserInitial }}\n                  </div>\n                  <div class=\"flex-1 min-w-0\">\n                    <p class=\"font-medium text-gray-900 truncate\">{{ currentUser?.name }}</p>\n                    <p class=\"text-sm text-gray-500 truncate\">{{ currentUser?.email }}</p>\n                  </div>\n                </div>\n\n                <a\n                  routerLink=\"/dashboard\"\n                  (click)=\"closeMenu()\"\n                  class=\"w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-300 flex items-center gap-2\"\n                >\n                  <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z\" />\n                  </svg>\n                  Mon Dashboard\n                </a>\n\n                <a\n                  routerLink=\"/profil/mes-annonces\"\n                  (click)=\"closeMenu()\"\n                  class=\"w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-300 flex items-center gap-2\"\n                >\n                  <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\" />\n                  </svg>\n                  Mes Annonces\n                </a>\n\n                <a\n                  routerLink=\"/annonces/creer\"\n                  (click)=\"closeMenu()\"\n                  class=\"w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2\"\n                >\n                  <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 4v16m8-8H4\" />\n                  </svg>\n                  Cr&eacute;er une annonce\n                </a>\n\n                <button\n                  type=\"button\"\n                  (click)=\"logout()\"\n                  class=\"w-full bg-white hover:bg-red-50 text-red-600 font-medium py-2.5 px-4 rounded-lg transition-colors border border-red-200 flex items-center justify-center gap-2\"\n                >\n                  <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1\" />\n                  </svg>\n                  D&eacute;connexion\n                </button>\n              </div>\n            </ng-template>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"hidden md:flex justify-center mt-5\">\n    <div class=\"w-full max-w-4xl border rounded-full shadow-xl px-6 py-3 bg-white\">\n      <div class=\"flex justify-between items-center\">\n        <div class=\"flex flex-col\">\n          <h2>Where</h2>\n          <input\n            type=\"text\"\n            placeholder=\"Search city or landmark\"\n            class=\"flex-1 outline-none bg-[#f7f7f7]\"\n            [value]=\"searchTerm\"\n            (input)=\"updateSearchTerm(($any($event.target)).value)\"\n          />\n        </div>\n        <div class=\"h-6 w-px bg-gray-300\"></div>\n        <div class=\"flex flex-col m-[10px]\">\n          <h2>When</h2>\n          <input type=\"text\" placeholder=\"Add dates\" class=\"flex-1 outline-none border-0 bg-[#f7f7f7]\" />\n        </div>\n        <div class=\"h-6 w-px bg-gray-300\"></div>\n        <div class=\"flex flex-col m-[10px]\">\n          <h2>Who</h2>\n          <input type=\"text\" placeholder=\"Add guests\" class=\"flex-1 outline-none bg-[#f7f7f7]\" />\n        </div>\n        <button\n          type=\"button\"\n          class=\"flex justify-center items-center rounded-full hover:bg-red-800 bg-red-600 w-[60px] h-[60px]\"\n        >\n          <img src=\"assets/images/find.png\" alt=\"search\" class=\"w-auto h-[45px]\" />\n        </button>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"flex gap-4 py-6 px-4 overflow-x-auto scrollbar-hide md:justify-center\">\n    <button\n      *ngFor=\"let filter of animalFilters\"\n      type=\"button\"\n      (click)=\"setAnimalFilter(filter.value)\"\n      class=\"group flex-shrink-0 bg-transparent border-0 p-0\"\n    >\n      <div\n        class=\"flex items-center justify-center rounded-full h-16 w-16 border-2 transition-colors\"\n        [ngClass]=\"\n          animalFilter === filter.value\n            ? 'border-red-500 bg-red-50'\n            : 'border-gray-200 bg-white group-hover:border-red-500'\n        \"\n      >\n        <img [src]=\"filter.icon\" class=\"h-8 w-8\" [alt]=\"filter.label\" />\n      </div>\n      <span class=\"text-xs text-gray-600 group-hover:text-red-600\">{{ filter.label }}</span>\n    </button>\n  </div>\n</div>\n", styles: [":host {\n  display: block;\n}\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.Router }, { type: i0.ElementRef }, { type: i3.MarketplaceUiService }], { onDocumentClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src/app/shared/components/header/header.component.ts", lineNumber: 28 }); })();
//# sourceMappingURL=header.component.js.map