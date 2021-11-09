import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { BooksComponent } from './books/books.component';


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {

  }
}
