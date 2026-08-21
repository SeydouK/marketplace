import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ListingCardComponent } from './components/listing-card/listing-card.component';
import { CitySectionComponent } from './components/city-section/city-section.component';
import { Menubar } from 'primeng/menubar';
import { Button } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';
import { StatusBannerComponent } from './components/status-banner/status-banner.component';
import { SellerRequestModalComponent } from './components/seller-request-modal/seller-request-modal.component';
import { AssetUrlPipe } from './pipes/asset-url.pipe';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoaderComponent, ListingCardComponent, CitySectionComponent, StatusBannerComponent, SellerRequestModalComponent],
  imports: [CommonModule, RouterModule, Menubar, Button, ProgressSpinner, AssetUrlPipe],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    ListingCardComponent,
    CitySectionComponent,
    Menubar,
    Button,
    ProgressSpinner,
    CommonModule,
    StatusBannerComponent,
    SellerRequestModalComponent,
    AssetUrlPipe,
  ],
})
export class SharedModule {}