import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Availability } from "./TimePicker/TimePicker";

interface Props {
  value: Dayjs | null;
  handleDateChange: (value: Dayjs | null) => void;
  availability?: Availability[];
}

export default function DatePicker({
  value,
  handleDateChange,
  availability,
}: Props) {
  // console.log(availability);

  const dateToDisable = (date: Dayjs | null) => {
    let shouldDisable = "";
    if (availability) {
      availability.forEach((elem) => {
        const filterElem = elem.slot.filter((slot) => slot.availableSlot === 0);
        if (filterElem.length > 0) {
          shouldDisable = elem.date;
        }
      });
    }
    // console.log(date?.date() === parseInt(shouldDisable.split("-")[0], 10));

    return (
      date?.date() === parseInt(shouldDisable.split("-")[0], 10) ||
      date?.day() === 0 ||
      date?.day() === 6
    );
  };

  return (
    <div className="container">
      <h2>Choose available Date</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label="Choose Date"
            inputFormat="DD/MM/YYYY"
            value={value}
            shouldDisableDate={dateToDisable} //attribute for disable date
            onChange={(value) => handleDateChange(value)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
}
