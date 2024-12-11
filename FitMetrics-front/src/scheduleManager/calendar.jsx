import { useState } from 'react';
import Calendar from 'react-calendar';
import CalendarCard from './calendar_card';
import './calendar.css';

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [info, setInfo] = useState({
    "2024-12-01": {"Workout":"Chest", "Food":["Potatoe", "banana"], "Nutrition":"LOL!"},
  });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isBlurred, setIsBlurred] = useState(false); // Track if the calendar should be blurred

  const showDayInfo = (event) => {
    const localDate = new Date(event.getTime() - event.getTimezoneOffset() * 60000);
    const selectedDate = localDate.toISOString().split('T')[0];


    const message = info[selectedDate];
    setDate(event);
    setSelectedMessage({ date: selectedDate, message });
    setIsBlurred(true); // Apply blur effect when a day is clicked
  };

  const closeCard = () => {
    setSelectedMessage(null);
    setIsBlurred(false);
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
      <div className={`calendar-wrapper ${isBlurred ? 'blurred' : ''}`}> {/* Apply blur if isBlurred is true */}

        <Calendar
          onChange={setDate}
          value={date}
          calendarType="gregory"
          showNeighboringMonth={false}
          onClickDay={showDayInfo}
        />
      </div>
    </div>
  );
}
