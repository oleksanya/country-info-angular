import { Component } from '@angular/core';
import { CountrySearchComponent } from '../../components/country-search/country-search.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CountryWidgetComponent } from '../../components/country-widget/country-widget.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CountrySearchComponent,
    HeaderComponent,
    CountryWidgetComponent,
    NgFor,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
