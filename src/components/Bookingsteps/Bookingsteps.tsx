import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import DatePicker from "../DatePicker";
import TimePicker, { Availability } from "../TimePicker/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { AccountCircle } from "@mui/icons-material";
import { FormControl, InputLabel, Input, InputAdornment } from "@mui/material";

const steps = [
  "Select Date and Time",
  "Personal Information",
  "Review and comfirm",
];

export default function Bookingsteps() {
  // code from App.tsx
  const [date, setDate] = useState<Dayjs | null>(null);
  const [availability, setAvilability] = useState<Availability[]>();
  const [month, setMonth] = useState<number>();

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    const selectedMonth = month ? month : dayjs().month();
    const url = `http://localhost:5000/available?month=${selectedMonth}`;
    const response = await fetch(url);
    const data = await response.json();

    setAvilability(data);
  };

  //Get slot from seleted Date
  const getSelectedDateSlots = (): Availability | undefined => {
    const selectedDateAvailability = availability?.filter(
      (item) => item.date === date?.format("DD-MM-YYYY")
    )[0];
    console.log(selectedDateAvailability);
    return selectedDateAvailability;
  };

  // end of code from App.tsx

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Render step
  const renderStep = () => {
    if (activeStep === 0) {
      return (
        <>
          <DatePicker
            date={date}
            handleDateChange={setDate}
            availability={availability}
            month={month}
            handleMonthChange={setMonth}
            fetchData={fetchData}
          />

          <TimePicker availability={getSelectedDateSlots()} />
        </>
      );
    } else if (activeStep === 1) {
      return (
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <FormControl variant="standard" sx={{ width: "50%", m: "5px" }}>
            <InputLabel htmlFor="name">Name:</InputLabel>
            <Input
              id="name"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard" sx={{ width: "50%", m: "5px" }}>
            <InputLabel htmlFor="name">Email:</InputLabel>
            <Input
              id="email"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard" sx={{ width: "50%", m: "5px" }}>
            <InputLabel htmlFor="nrc">NRC Number:</InputLabel>
            <Input
              id="nrc"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard" sx={{ width: "50%", m: "5px" }}>
            <InputLabel htmlFor="dob">Date of birth:</InputLabel>
            <Input
              id="dob"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
      );
    }
  };
  // end of Render step
  return (
    <Box sx={{ width: "80%", mx: "auto", my: "10px" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </>
      ) : (
        <>
          {/* change render display */}
          {renderStep()}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              minHeight: "300px",
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
