import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  static parseDate(sDate: string): Date {
    let arr = /^(\d+)\/(\d+)\/(\d+)/.exec(sDate);
    return new Date(Number(arr[3]) + 2000, Number(arr[1]) - 1, Number(arr[2]));
  }

  /**
   * Returns a date with only the year, month and date elements of the given one
   */
  dateOnly(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }

  /**
   *  Returns a date object representing today, with the time element set as 0
   */
  today() {
    return this.dateOnly(new Date());
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
