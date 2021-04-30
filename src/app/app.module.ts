import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { MakeTransferComponent } from './components/make-transfer/make-transfer.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TransactionModule } from './transaction/transaction.module';

const COMPONENTS = [
  AppComponent,
  FooterComponent,
  LogoComponent,
  SubmitButtonComponent,
  MakeTransferComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    TransactionModule
  ],
  exports: COMPONENTS,
  providers: [
    NgbActiveModal,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
