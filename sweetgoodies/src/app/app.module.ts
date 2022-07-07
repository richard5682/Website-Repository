import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { BillboardComponent } from './components/component/billboard/billboard.component';
import { TabComponent } from './components/component/tab/tab.component';
import { ProductlistComponent } from './components/component/productlist/productlist.component';
import { FooterComponent } from './components/component/footer/footer.component';
import { ItemlistComponent } from './components/component/itemlist/itemlist.component';
import { ProductblockComponent } from './components/component/productblock/productblock.component';
import { LoaderComponent } from './components/component/loader/loader.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { MenuComponent } from './components/pages/menu/menu.component';
import { ItemcreationComponent } from './components/component/itemcreation/itemcreation.component';
import { ProductcreationComponent } from './components/component/productcreation/productcreation.component';
import { TextboxComponent } from './components/component/textbox/textbox.component';
import { FormsModule } from '@angular/forms';
import { ImageuploaderComponent } from './components/component/imageuploader/imageuploader.component';
import { BillboardeditorComponent } from './components/component/billboardeditor/billboardeditor.component';
import { Imageuploader_popupComponent } from './components/component/imageuploader_popup/imageuploader_popup.component';

var routes:Routes = [
  {path: 'homepage', component:HomepageComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'menu', component:MenuComponent},
  {path: '', component:HomepageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BillboardComponent,
    TabComponent,
    ProductlistComponent,
    FooterComponent,
    ItemlistComponent,
    ProductblockComponent,
    LoaderComponent,
    AdminComponent,
    MenuComponent,
    ItemcreationComponent,
    ProductcreationComponent,
    TextboxComponent,
    ImageuploaderComponent,
    BillboardeditorComponent,
    Imageuploader_popupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash:true})
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
