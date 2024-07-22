import { useState } from 'react';
import down from '../assets/angle-down-solid.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Sort = ({ setFrom, setTo, setDate }) => {
  const locations = ['Chennai', 'Hyderabad', 'Banglore', 'Coimbatore'];
  const [startDate, setStartDate] = useState(null);

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setDate(date ? `${date.getMonth() + 1}-${date.getDate()}` : null); // Store month-day format
  };

  return (
    <div className="sort">
      <select id="from" onChange={handleFromChange} className="sort__select">
        <option value="">From</option>
        {locations.map((location) => (
          <option key={location} value={location}>{location}</option>
        ))}
      </select>

      <select id="to" onChange={handleToChange} className="sort__select">
        <option value="">To</option>
        {locations.map((location) => (
          <option key={location} value={location}>{location}</option>
        ))}
      </select>

      <DatePicker  
          selected={startDate}
          onChange={handleDateChange}
          placeholderText="  Select Your Date"
          dateFormat="MMMM d" // Show month and day only
          className="sort__select datepicker"
        />

    </div>
  );
};

export default Sort;
