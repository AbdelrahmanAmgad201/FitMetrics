import { useState } from 'react';
import Calendar from 'react-calendar';
import CalendarCard from './calendar_card';
import './calendar.css';

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [info, setInfo] = useState({
    "2024-12-01": { "Workout": ["Chest","Chest","Chest","Chest","Chest"], "Food": ["Potatoe", "Banana"], "Nutrition": ["LOL!"] },
    "2024-12-05": { "Workout": ["Back"], "Food": ["Apple"], "Nutrition": ["Healthy"] },
  });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isBlurred, setIsBlurred] = useState(false);

  const showDayInfo = (event) => {
    const localDate = new Date(event.getTime() - event.getTimezoneOffset() * 60000);
    const selectedDate = localDate.toISOString().split('T')[0];
    const message = info[selectedDate];
    setDate(event);
    setSelectedMessage({ date: selectedDate, message });
    setIsBlurred(true);
  };

  const closeCard = () => {
    setSelectedMessage(null);
    setIsBlurred(false);
  };

  // Add class for specific dates
  const highlightDates = ({ date }) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().split('T')[0];
    return info[formattedDate] ? 'highlight' : null;
  };

  return (
    <div className="calendar-container">
      {selectedMessage && (
        <div className="overlay">
          <CalendarCard
            title={selectedMessage.date}
            body={selectedMessage.message}
            closeCard={closeCard}
          />
        </div>
      )}
      <div className={`calendar-wrapper ${isBlurred ? 'blurred' : ''}`}>
        <Calendar
          onChange={setDate}
          value={date}
          calendarType="gregory"
          showNeighboringMonth={false}
          onClickDay={showDayInfo}
          tileClassName={highlightDates}
        />
      </div>
    </div>
  );
}
