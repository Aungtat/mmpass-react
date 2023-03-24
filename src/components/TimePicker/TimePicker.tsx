import React from "react";
import "./Timepicker.css";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export interface Availability {
  date: string;
  month: number;
  slot: Slot[];
}
export interface Slot {
  time: string;
  total: number;
  booked: number;
  availableSlot: number;
}
interface Props {
  availability?: Availability;
}
export default function TimePicker({ availability }: Props) {
  if (!availability) {
    return null;
  }

  const slots = availability.slot;
  return (
    <div className="container">
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Choose Time</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          {/* mapping slots array and show time */}
          {slots.map((slot) => {
            if (slot.availableSlot === 0) {
              return;
            }
            return (
              <FormControlLabel
                value={slot.time}
                control={<Radio />}
                label={slot.time}
                key={slot.time}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
