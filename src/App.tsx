import "./App.css";

import Bookingsteps from "./components/Bookingsteps/Bookingsteps";

function App() {
  //

  return (
    <div className="App">
      <Bookingsteps />
      {/* <DatePicker
        date={date}
        handleDateChange={setDate}
        availability={availability}
        month={month}
        handleMonthChange={setMonth}
        fetchData={fetchData}
      />

      <TimePicker availability={getSelectedDateSlots()} /> */}
      {/* <Main /> */}
    </div>
  );
}

export default App;
