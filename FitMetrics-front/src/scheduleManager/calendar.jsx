import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import CalendarCard from './calendar_card';
import './calendar.css';

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [info, setInfo] = useState({
    "2024-12-01": { "Workout": ["Chest", "Chest", "Chest"], "Food": ["Potato", "Banana"] },
    "2024-12-05": { "Workout": ["Back"], "Food": ["Apple"] },
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

  const highlightDates = ({ date }) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().split('T')[0];
    return info[formattedDate] ? 'highlight' : null;
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    // Get the current month and year from the activeStartDate
    const currentMonth = activeStartDate.toLocaleString('default', { month: 'long' });
    const currentYear = activeStartDate.getFullYear();

    // Log the current month and year when the activeStartDate changes (e.g., when the month changes)
    console.log(`Changed to month: ${currentMonth}, Current Year: ${currentYear}`);
  };

  useEffect(() => {
    ////////// Call API here /////////
    console.log("Started");

    // Get the current month and year only (current date)
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear();

    // Print current month and year (on mount)
    console.log(`Current Month: ${currentMonth}, Current Year: ${currentYear}`);
  }, []); // Empty dependency array ensures it runs only once when component mounts

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
          view="month"
          onActiveStartDateChange={handleActiveStartDateChange} // Trigger when the current month changes
        />
      </div>
    </div>
  );
}
