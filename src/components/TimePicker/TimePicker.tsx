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
  month: string;
  slot: Slot[];
}
export interface Slot {
  time: string;
  total: number;
  booked: number;
  availableSlot: number;
}
interface Props {
  availability?: Availability[];
}
export default function TimePicker({ availability }: Props) {
  return <h1>{availability?.length}</h1>;
  // if (!slots) {
  //   return null;
  // }
  // return (
  //   <div className="container">
  //     <FormControl>
  //       <FormLabel id="demo-radio-buttons-group-label">Choose Time</FormLabel>
  //       <RadioGroup
  //         aria-labelledby="demo-radio-buttons-group-label"
  //         name="radio-buttons-group"
  //       >
  //         {/* mapping slots array and show time */}
  //         {slots.map((slot) => {
  //           return (
  //             <FormControlLabel
  //               value={slot.time}
  //               control={<Radio />}
  //               label={slot.time}
  //             />
  //           );
  //         })}
  //       </RadioGroup>
  //     </FormControl>
  //   </div>
  // );
}
