import React, { useEffect, useState } from "react";
import "./App.css";
import DatePicker from "./components/DatePicker";
// chang Slot ot Availability
import TimePicker, { Availability } from "./components/TimePicker/TimePicker";
import dayjs, { Dayjs } from "dayjs";

function App() {
  const [value, setValue] = useState<Dayjs | null>(dayjs());

  // before --> const [slots, setSlots] = useState<Slot[]>();
  //after
  const [availability, setAvilability] = useState<Availability[]>();

  useEffect(() => {
    fetchData(value);
  }, [value]);

  const fetchData = async (date: Dayjs | null) => {
    const choosenDate = date?.format("DD-MM-YYYY");

    // change query param (Date to month)
    const url = `http://localhost:5000/available?month=${value?.month()}`;
    const response = await fetch(url);
    const data = await response.json();

    //before -- > setSlots(data);
    //after
    setAvilability(data);
  };

  return (
    <div className="App">
      <DatePicker
        value={value}
        handleDateChange={setValue}
        availability={availability}
      />

      {/* before --> <TimePicker slots={slots} /> */}
      {/* after */}
      <TimePicker availability={availability} />
    </div>
  );
}

export default App;
