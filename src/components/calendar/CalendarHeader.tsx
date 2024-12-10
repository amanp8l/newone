import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
}) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
        Content Calendar
      </h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={onPrevMonth}
          className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <FiChevronLeft className="w-5 h-5 text-indigo-600" />
        </button>
        <h2 className="text-xl font-semibold text-indigo-900">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={onNextMonth}
          className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <FiChevronRight className="w-5 h-5 text-indigo-600" />
        </button>
      </div>
    </div>
  );
};