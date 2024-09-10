import { Component, OnInit } from '@angular/core';
import { PublicHoliday } from '../../interfaces/PublicHoliday.interface';
import { PublicHolidayService } from '../../services/public-holiday.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { CountryInfo } from '../../interfaces/Country-info.interface';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  countryCode: string | null = null;
  countryName: string = '';
  countryBorders: CountryInfo[] = [];
  holidays: PublicHoliday[] = [];
  currentYear: number = new Date().getFullYear();
  years: number[] = Array.from({ length: 11 }, (_, i) => 2020 + i);

  constructor(
    private route: ActivatedRoute,
    private publicHolidayService: PublicHolidayService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.countryCode = params.get('countryCode');

      this.countryService
        .getCountryInfo(this.countryCode!)
        .subscribe((country: CountryInfo) => {
          this.countryBorders = country.borders;
          this.countryName = country.commonName;
        });

      if (this.countryCode) {
        this.fetchHolidays(this.currentYear);
      }
    });
  }

  fetchHolidays(year: number): void {
    this.publicHolidayService
      .getPublicHolidays(year, this.countryCode!)
      .subscribe((holidaysList: PublicHoliday[]) => {
        this.holidays = holidaysList;
      });
  }

  onYearChange(year: number): void {
    this.currentYear = year;
    this.fetchHolidays(year);
  }
}
