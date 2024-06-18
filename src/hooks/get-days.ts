import { Day, Month } from '@/types/enums.types';

import { type Date } from '@/types/date.types';
import { useState } from 'react';
import { API_URL } from '@/constants/api';

export interface DateExtended extends Date {
  isComplete: boolean;
}

export const useGetDays = () => {
  const [calendar, setCalendar] = useState<DateExtended[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getDaysInMonth = (month: number, year: number) => {
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    const firstDayOfMonth = days[0].getDay();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.unshift(null);
    }

    return days;
  };

  const setData = async (month: number, year: number) => {
    setLoading(true);
    const days = getDaysInMonth(month, year);

    try {
      const response = await fetch(
        `${API_URL}/hours?month=${month}&year=${year}`,
        {
          method: 'GET',
        },
      );
      if (response.ok) {
        const { daysWithShiftsAssigned, daysWithoutHoursEnabled } =
          await response.json();

        const parsedDays = () => {
          return days.map((day) => {
            if (day === null) {
              return {
                day: null as unknown as number,
                month: month,
                year: year,
                dayWeek: null as unknown as number,
                dateString: '',
                isComplete: null as unknown as boolean,
              };
            }
            const dayFinded = daysWithShiftsAssigned.find(
              (dayWithShift: any) => {
                return (
                  dayWithShift.day === day.getDate() &&
                  dayWithShift.month === day.getMonth() &&
                  dayWithShift.year === day.getFullYear()
                );
              },
            );

            const dayFindedWithoutHours = daysWithoutHoursEnabled.find(
              (dayWithoutHours: any) => {
                return dayWithoutHours.weekday === day.getDay();
              },
            );

            return {
              day: day.getDate(),
              month: day.getMonth(),
              year: day.getFullYear(),
              dayWeek: day.getDay(),
              dateString: `${Day[day.getDay()]}. ${day.getDate()} de ${
                Month[day.getMonth()]
              }`,
              isComplete: dayFinded
                ? dayFinded.isComplete
                : dayFindedWithoutHours
                  ? dayFindedWithoutHours.isComplete
                  : false,
            };
          });
        };
        setCalendar(parsedDays());
      }
    } catch (error) {
      setError(true);
      throw new Error('Ocurrío un error al obtener los datos del calendario');
    }
    setLoading(false);
  };

  return {
    calendar,
    error,
    loading,
    setData,
  };
};
