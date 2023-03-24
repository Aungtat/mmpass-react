import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Availability } from "./TimePicker/TimePicker";

interface Props {
  date: Dayjs | null;
  handleDateChange: (value: Dayjs | null) => void;
  availability?: Availability[];
  month?: number;
  handleMonthChange: (month?: number) => void;
  fetchData: () => Promise<void>;
}

export default function DatePicker({
  date,
  handleDateChange,
  availability,
  handleMonthChange,
  month,
  fetchData,
}: Props) {
  const selectedMonth = month ? month : dayjs().month();
  console.log("selectedMonth", selectedMonth);
  const currentMonthAvailability = availability?.filter(
    (item) => item.month === selectedMonth
  );
  console.log("day", availability);

  const dateToDisable = (date: Dayjs | null) => {
    const currentDate = currentMonthAvailability?.find(
      (item) => item.date === date?.format("DD-MM-YYYY")
    );

    const isAvailable = currentDate?.slot.some(
      (item) => item.availableSlot !== 0
    );
    return isAvailable ? false : true;
  };

  return (
    <div className="container">
      <h2>Choose available Date</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label="Choose Date"
            inputFormat="DD/MM/YYYY"
            value={date}
            shouldDisableDate={dateToDisable} //attribute for disable date
            onChange={(value) => handleDateChange(value)}
            onMonthChange={(value) => handleMonthChange(value?.month())}
            disableHighlightToday
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
}
