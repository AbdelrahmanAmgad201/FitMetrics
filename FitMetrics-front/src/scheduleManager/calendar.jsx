import { useEffect, useState, useRef } from 'react';
import Calendar from 'react-calendar';
import CalendarCard from './calendar_card';
import './calendar.css';
import axios from 'axios';

export default function MyCalendar({ userJWT }) {
  const [date, setDate] = useState(new Date());
  const [info, setInfo] = useState([]); // Ensure info is initialized as an empty array
  const selectedMessageRef = useRef(null);  // Using useRef for selectedMessage
  const [isBlurred, setIsBlurred] = useState(false);

  const showDayInfo = async (event) => {
    const localDate = new Date(event.getTime() - event.getTimezoneOffset() * 60000);
    const selectedDate = localDate.toISOString().split('T')[0];


    console.log("Selected date: " + selectedDate);

    // Wait for the result of fetchDay before updating state
    const fetchedMessage = await fetchDay(selectedDate);
    selectedMessageRef.current = { date: selectedDate, exercise: fetchedMessage[0], nutrition: fetchedMessage[1] || [] };
    console.log(selectedMessageRef.current.message)

    console.log("Selected message after update:", selectedMessageRef.current);

    setDate(event);
    setIsBlurred(true);
  };

  const closeCard = () => {
    selectedMessageRef.current = null;
    setIsBlurred(false);
  };

  const highlightDates = ({ date }) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().split('T')[0];
    return info?.includes(formattedDate) ? 'highlight' : null;
  };

  const handleActiveStartDateChange = async ({ activeStartDate }) => {
    const currentMonth = activeStartDate.getMonth() + 1; // Month is 0-indexed
    const currentYear = activeStartDate.getFullYear();
    console.log(currentMonth);
    console.log(currentYear);

    // Await the result of fetchMonth before updating state
    const fetchedInfo = await fetchMonth(currentYear, currentMonth);
    setInfo(["0000-00-00", ...(fetchedInfo || [])]); // Ensure info is always an array

    console.log(`Changed to month: ${currentMonth}, Current Year: ${currentYear}`);
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    console.log(`Current Month: ${currentMonth}, Current Year: ${currentYear}`);
    console.log("User JWT: " + userJWT?.current);

    // Await the result of fetchMonth before updating state
    const fetchData = async () => {
      const fetchedInfo = await fetchMonth(currentYear, currentMonth);
      setInfo(["0000-00-00", ...(fetchedInfo || [])]); // Ensure info is always an array
    };

    fetchData(); // Call the async function

  }, []); // Re-run when userJWT changes

  const fetchMonth = async (year, month) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/calender/work-days",
        {
          year: year,
          month: month,
        },
        {
          headers: {
            Authorization: `Bearer ${userJWT?.current}`,
          },
        }
      );
      console.log(response.data); // Handle response data
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
        {
          date: date, // Date in the format 'YYYY-MM-DD'
        },
        {
          headers: {
            Authorization: `Bearer ${userJWT?.current}`,
          },
        }
      );
      console.log(response.data); // Handle response data
      return response.data;
    } catch (error) {
      console.error('Error fetching day data:', error);
      return [];
    }
  };

  return (
    <div className="calendar-container">
      {selectedMessageRef.current && (
        <div className="overlay">
          <CalendarCard
            title={selectedMessageRef.current?.date}
            exercise={selectedMessageRef.current?.exercise}
            nutrition={selectedMessageRef.current?.nutrition}
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
          onActiveStartDateChange={handleActiveStartDateChange}
        />
      </div>
    </div>
  );
}
