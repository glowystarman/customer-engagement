import { Injectable } from '@angular/core';
import { EngagementDay } from './models/engagement-day.model';
import { Weather } from './models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class EngagementService {

  constructor() { }

  getEngagementDays(fiveDayForecast: any): EngagementDay[] {
    var engagementDays = [];
    fiveDayForecast.list.forEach(weatherPoint => {
      if (this.isNoonForecast(weatherPoint)) {
        var engagementDay = this.getEngagementDay(weatherPoint);
        engagementDays.push(engagementDay);
      }
    });
    return engagementDays;
  }

  private isNoonForecast(weatherPoint: any): boolean {
    if (weatherPoint.dt_txt.endsWith("12:00:00")) {
      return true;
    }
    return false;
  }

  private getEngagementDay(weatherPoint: any): EngagementDay {
    var time = weatherPoint.dt_txt;
    var weather = this.getWeather(weatherPoint);
    var contactMethod = this.getEngagementType(weather);

    return { time: time, weather: weather, contactMethod: contactMethod };
  }

  private getWeather(weatherPoint: any): Weather {
    var temperature = weatherPoint.main.temp;
    var clear = false;
    var rain = false;
    weatherPoint.weather.forEach(weather => {
      if (weather.main == "Rain") {
        rain = true;
      }
      if (weather.main == "Clear") {
        clear = true;
      }
    });

    return { sunny: clear, raining: rain, degreesFahrenheit: temperature };
  }

  getEngagementType(weather: Weather): string {
    var contactMethod = "None";

    if (weather.sunny && weather.degreesFahrenheit > 75) {
      contactMethod = "Text";
    } else if (weather.degreesFahrenheit < 55 || weather.raining) {
      contactMethod = "Phone";
    }else if (weather.degreesFahrenheit >= 55 && weather.degreesFahrenheit <= 75) {
      contactMethod = "Email";
    } 

    return contactMethod;
  }
}
