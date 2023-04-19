import {Component} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="layout-topbar">
			<div class="layout-topbar-wrapper">
                <div class="layout-topbar-left">
					<div class="layout-topbar-logo-wrapper">
						<a href="#" class="layout-topbar-logo">
							<img src="assets/layout/images/logo-mirage@2x.png" alt="mirage-layout" />
							<span class="app-name">Mirage</span>
						</a>
					</div>		
                </div>

                <div class="layout-topbar-right fadeInDown">
					<ul class="layout-topbar-actions">
						
						<li #gift class="topbar-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === gift}">
							
							<ul class="fadeInDown">
								<li class="layout-submenu-header">
									<h1>Deals</h1>
								</li>

								<li class="deals">
									<ul>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-sapphire.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Sapphire</p>
												<span>Angular</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-roma.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Roma</p>
												<span>Minimalism</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-babylon.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Babylon</p>
												<span>Powerful</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
									</ul>
									<ul>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-harmony.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Harmony</p>
												<span>USWDS</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-prestige.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Prestige</p>
												<span>Elegancy</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-ultima.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Ultima</p>
												<span>Material</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
									</ul>
								</li>
							</ul>
						</li>

						<li #profile class="topbar-item profile-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === profile}">
							<a href="#" (click)="appMain.onTopbarItemClick($event,profile)">
                            <span class="profile-image-wrapper">
                                <img src="assets/layout/images/topbar/avatar-eklund.png" alt="mirage-layout" />
                            </span>
								<span class="profile-info-wrapper">
                                <h3>Olivia Eklund</h3>
                                <span>Design</span>
                            </span>
							</a>
							
						</li>
						<li>
							<a href="#" class="layout-rightpanel-button" (click)="appMain.onRightPanelButtonClick($event)">
								<i class="pi pi-arrow-left"></i>
							</a>
						</li>
                    </ul>

					<ul class="profile-mobile-wrapper">
						<li #mobileProfile class="topbar-item profile-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === mobileProfile}">
							<a href="#" (click)="appMain.onTopbarItemClick($event,mobileProfile)">
                            <span class="profile-image-wrapper">
                                <img src="assets/layout/images/topbar/avatar-eklund.png" alt="mirage-layout" />
                            </span>
								<span class="profile-info-wrapper">
                                <h3>Olivia Eklund</h3>
                                <span>Design</span>
                            </span>
							</a>
							<ul class="fadeInDown">
								<li class="profile-submenu-header">
									<div class="performance">
										<span>Weekly Performance</span>
										<img src="assets/layout/images/topbar/asset-bars.svg" alt="mirage-layout" />
									</div>
									<div class="profile">
										<img src="assets/layout/images/topbar/avatar-eklund.png" alt="mirage-layout" width="45" />
										<h1>Olivia Eklund</h1>
										<span>Design</span>
									</div>
								</li>
								<li>
									<i class="pi pi-list icon icon-1"></i>
									<div class="menu-text">
										<p>Tasks</p>
										<span>3 open issues</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li>
									<i class="pi pi-shopping-cart icon icon-2"></i>
									<div class="menu-text">
										<p>Payments</p>
										<span>24 new</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li>
									<i class="pi pi-users icon icon-3"></i>
									<div class="menu-text">
										<p>Clients</p>
										<span>+80%</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li class="layout-submenu-footer">
									<button class="signout-button">Sign Out</button>
									<button class="buy-mirage-button">Buy Mirage</button>
								</li>
							</ul>
						</li>
					</ul>
                </div>
            </div>
        </div>
    `
})
export class AppTopBarComponent {

    activeItem: number;

    constructor(public appMain: AppMainComponent) {}

    mobileMegaMenuItemClick(index) {
        this.appMain.megaMenuMobileClick = true;
        this.activeItem = this.activeItem === index ? null : index;
    }

}
