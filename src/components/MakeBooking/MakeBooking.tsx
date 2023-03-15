import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import ShortUniqueId from "short-unique-id";
import InputLabel from "@mui/material/InputLabel";
import { FormControl, FormHelperText, Snackbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ariaLabel = { "aria-label": "description" };
const bookingID = new ShortUniqueId({ length: 10 });
const bookID = bookingID();
interface Props {
  updateState: () => void;
}
export default function Booking({ updateState }: Props) {
  //   console.log(bookID);
  const [name, setName] = React.useState<string>("");
  const [phNumer, setPhNumber] = React.useState<string>("");
  const [nrcID, setNrcID] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const handleChange1 = (event: any) => {
    setName(event.target.value);
  };

  const handleChange2 = (event: any) => {
    setPhNumber(event.target.value);
  };

  const handleChange3 = (event: any) => {
    setNrcID(event.target.value);
  };

  const handleChange4 = (event: any) => {
    setEmail(event.target.value);
  };
  const choosenDate: string | null = localStorage.getItem("date");
  const choosenTime: string | null = localStorage.getItem("time");

  const handleClick = async () => {
    localStorage.setItem("ID", bookID);
    const bookingInfo = {
      bookID,
      name,
      phNumer,
      nrcID,
      email,
      choosenDate,
      choosenTime,
    };
    console.log(bookingInfo);
    const response = await fetch("http://localhost:5000/bookingInfo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookingInfo),
    });
    const newData = await response.json();
    console.log(newData);
    updateState();
  };

  const [open, setOpen] = React.useState(false);
  const handleClickCopy = () => {
    setOpen(true);
    navigator.clipboard.writeText(bookID);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        width: "90%",

        margin: "2px auto",
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          sx={{
            marginTop: "15px",
            marginBottom: "0px",

            width: "50%",
            backgroundColor: "lightGreen",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={handleClickCopy}
          id="outlined-read-only-input"
          label="Booking ID"
          defaultValue={bookID}
          InputProps={{
            readOnly: true,
          }}
        />
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={2000}
          message="Copied to clipboard"
        />
        <p>Click to Copy Booking ID</p>
      </div>
      <div>
        <h2>
          Appoiment at {choosenDate} | Time - {choosenTime}
        </h2>
        <FormControl fullWidth variant="standard">
          <InputLabel
            sx={{
              fontSize: "1.3rem",
              textShadow: "1px 1px 1px black",
              m: "5px 0px",
            }}
            htmlFor="name"
          >
            Name :
          </InputLabel>
          <Input
            required
            sx={{ fontSize: "1.3rem", textShadow: "1px 1px 1px black" }}
            id="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={handleChange1}
          />
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth variant="standard">
          <InputLabel
            sx={{
              fontSize: "1.3rem",
              textShadow: "1px 1px 1px black",
              m: "5px 0px",
            }}
            htmlFor="phNumber"
          >
            Phone Number :
          </InputLabel>
          <Input
            required
            sx={{
              fontSize: "1.3rem",
              textShadow: "1px 1px 1px black",

              display: "inline",
            }}
            id="phNumber"
            placeholder="Enter Your Phnoe Number"
            onChange={handleChange2}
            value={phNumer}
          />
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth variant="standard">
          <InputLabel
            sx={{
              fontSize: "1.3rem",
              textShadow: "1px 1px 1px black",
              m: "5px 0px",
            }}
            htmlFor="nrcID"
          >
            NRC Number :
          </InputLabel>
          <Input
            required
            sx={{
              fontSize: "1.3rem",
              textShadow: "1px 1px 1px black",

              display: "inline",
            }}
            id="nrcID"
            placeholder="Enter Your NRC number"
            onChange={handleChange3}
            value={nrcID}
          />
        </FormControl>
      </div>

      <div>
        <FormControl fullWidth variant="standard">
          <InputLabel
            sx={{
              fontSize: "1.3rem",
              textShadow: "1px 1px 1px black",
              m: "5px 0px",
            }}
            htmlFor="email"
          >
            Email :
          </InputLabel>
          <Input
            required
            sx={{
              fontSize: "1.3rem",
              textShadow: "1px 1px 1px black",

              display: "inline",
            }}
            id="email"
            placeholder="Enter Your Email"
            onChange={handleChange4}
            value={email}
            aria-describedby="component-helper-text"
          />
          <FormHelperText id="component-helper-text">
            Plase fill this form to make an Appoiment
          </FormHelperText>
        </FormControl>
      </div>
      <div>
        {name && phNumer && nrcID && email && (
          <Button variant="contained" onClick={handleClick}>
            Make An Appoiment
          </Button>
        )}
      </div>
    </Box>
  );
}
