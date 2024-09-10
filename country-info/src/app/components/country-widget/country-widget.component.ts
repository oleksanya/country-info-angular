import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/Country.interface';
import { CountryService } from '../../services/country.service';
import { PublicHolidayService } from '../../services/public-holiday.service';
import { PublicHoliday } from '../../interfaces/PublicHoliday.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-country-widget',
  standalone: true,
  imports: [NgFor, RouterModule, CommonModule],
  templateUrl: './country-widget.component.html',
  styleUrl: './country-widget.component.scss',
})
export class CountryWidgetComponent implements OnInit {
  allCountries: Country[] = [];
  randomCountry: Country | null = null;
  holidays: PublicHoliday[] | null[] = [];

  constructor(
    private countryService: CountryService,
    private publicHolidayService: PublicHolidayService
  ) {}

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe((countries: Country[]) => {
      this.allCountries = countries;
      this.randomCountry = this.getRandomCountry(this.allCountries);

      this.publicHolidayService
        .nextPublicHolidays(this.randomCountry?.countryCode)
        .subscribe((holidaysList: PublicHoliday[]) => {
          this.holidays = holidaysList;
        });
    });
  }

  getRandomCountry(countries: Country[]): Country {
    return countries[Math.floor(Math.random() * countries.length)];
  }
}
