import { CommonModule, NgFor } from '@angular/common';
import { CountryService } from './../../services/country.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Country } from '../../interfaces/Country.interface';

@Component({
  selector: 'app-country-search',
  standalone: true,
  imports: [FormsModule, NgFor, RouterModule, CommonModule, MatIconModule],
  templateUrl: './country-search.component.html',
  styleUrl: './country-search.component.scss',
})
export class CountrySearchComponent implements OnInit {
  searchCountry: string = '';

  allCountries: Country[] = [];
  searchedCountries: Country[] = [];
  countries: Country[] = [];

  constructor(private readonly countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe((data) => {
      this.allCountries = data;
      this.searchedCountries = this.allCountries;
    });
  }

  searchChange() {
    const query = this.searchCountry.toLowerCase();
    this.searchedCountries = this.allCountries.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.countryCode.toLowerCase().includes(query)
    );
  }
}
