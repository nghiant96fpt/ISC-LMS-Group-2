
import React, { useState } from 'react';
import CalendarInput from './components/CalendarInput';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleDateChoose = () => {
    console.log('Ngày đã chọn:', selectedDate);
  };
  return (
    <div className="App">
      <CalendarInput
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        handleDateChoose={handleDateChoose} />;
    </div>
  );
}

export default App;
