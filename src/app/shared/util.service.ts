import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {


  /**
   * Returns a date with only the year, month and date elements of the given one
   */
  dateOnly(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }

  /**
   * Checks if a date is today i.e. compares ignoring the time component
   * @param date - The date to Check
   * @param today - Allows to specify a date instead of today 
   */
  isToday(date: Date, today?: Date) {
    today = this.dateOnly(today || new Date());
    return today.getTime() == this.dateOnly(date).getTime();
  }

  /**
   * Check if a date is in the same week as today
   * @param date - The date to Check
   * @param today - Allows to specify a date instead of today
   */
  isSameWeek(date: Date, today?: Date) {
    today = this.dateOnly(today || new Date());
    let todaysDayOfWeek = today.getDay();
    let monday = new Date(today);
    monday.setDate(today.getDate() - todaysDayOfWeek + 1);
    let sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return monday <= date && date <= sunday;
  }
}
