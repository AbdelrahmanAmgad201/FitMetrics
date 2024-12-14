import { useEffect, useState, useRef } from 'react';
import Calendar from 'react-calendar';
import CalendarCard from './calendar_card';
import './calendar.css';
import axios from 'axios';

export default function MyCalendar({ userJWT }) {
  const [date, setDate] = useState(new Date());
  const [info, setInfo] = useState([]); 
  const selectedMessageRef = useRef(null);  
  const cardRef = useRef(null); // Ref for the CalendarCard
  const [isBlurred, setIsBlurred] = useState(false);

  const showDayInfo = async (event) => {
    const localDate = new Date(event.getTime() - event.getTimezoneOffset() * 60000);
    const selectedDate = localDate.toISOString().split('T')[0];

    console.log("Selected date: " + selectedDate);

    const fetchedMessage = await fetchDay(selectedDate);
    console.log(fetchedMessage)
    selectedMessageRef.current = { date: selectedDate, exercise: fetchedMessage[0], nutrition: fetchedMessage[1] || [] };

    setDate(event);
    setIsBlurred(true);
  };

  const closeCard = () => {
    selectedMessageRef.current = null;
    setIsBlurred(false);
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      closeCard();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const highlightDates = ({ date }) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().split('T')[0];
    return info?.includes(formattedDate) ? 'highlight' : null;
  };

  const handleActiveStartDateChange = async ({ activeStartDate }) => {
    const currentMonth = activeStartDate.getMonth() + 1;
    const currentYear = activeStartDate.getFullYear();
    const fetchedInfo = await fetchMonth(currentYear, currentMonth);
    setInfo(["0000-00-00", ...(fetchedInfo || [])]); 
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const fetchData = async () => {
      const fetchedInfo = await fetchMonth(currentYear, currentMonth);
      setInfo(["0000-00-00", ...(fetchedInfo || [])]); 
    };

    fetchData();
  }, []);

  const fetchMonth = async (year, month) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/calender/work-days",
        { year, month },
        { headers: { Authorization: `Bearer ${userJWT?.current}` } }
      );
      return response.data || [];
    } catch (error) {
      console.error('Error fetching work days:', error);
      return [];
    }
  };

  const fetchDay = async (date) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/calender/all-day-data",
        { date },
        { headers: { Authorization: `Bearer ${userJWT?.current}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching day data:', error);
      return [];
    }
  };

  return (
    <div className="calendar-container">
      {selectedMessageRef.current && (
        <div className="overlay" ref={cardRef}>
          <CalendarCard
            title={selectedMessageRef.current?.date}
            exercise={selectedMessageRef.current?.exercise}
            nutrition={selectedMessageRef.current?.nutrition}
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
          onActiveStartDateChange={handleActiveStartDateChange}
        />
      </div>
    </div>
  );
}
