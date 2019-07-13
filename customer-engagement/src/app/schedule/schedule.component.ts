import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { EngagementDay } from '../models/engagement-day.model';
import { EngagementService } from '../engagement.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  private engagementDays: EngagementDay[];

  constructor(private weatherService: WeatherService, private engagementService: EngagementService) { }

  ngOnInit() {
    this.weatherService.getFiveDayForcast().subscribe(data => {
      this.engagementDays = [];
      this.engagementDays = this.engagementService.getEngagementDays(data);
    });
  }
}
