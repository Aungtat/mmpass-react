import { Box, Typography, Card } from "@mui/material";
import * as React from "react";
import QRCode from "react-qr-code";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
interface Slot {
  bookID: string;
  name: string;
  phNumer: string;
  nrcID: string;
  email: string;
  choosenDate: string;
  choosenTime: string;
}

interface Props {
  updateState: () => void;
}

interface Data {
  bookID: string;
  choosenDate: string;
  choosenTime: string;
  email: string;
  name: string;
  nrcID: string;
  phNumer: string;
}

// const card = (
//   <React.Fragment>
//     <CardContent>
//       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//         {}
//       </Typography>
//       <Typography variant="h5" component="div">
//         be{bull}nev{bull}o{bull}lent
//       </Typography>
//       <Typography sx={{ mb: 1.5 }} color="text.secondary">
//         adjective
//       </Typography>
//       <Typography variant="body2">
//         well meaning and kindly.
//         <br />
//         {'"a benevolent smile"'}
//       </Typography>
//     </CardContent>
//     <CardActions>
//       <Button size="small">Learn More</Button>
//     </CardActions>
//   </React.Fragment>
// );

export default function BookingInfo({ updateState }: Props) {
  let bookingID: any = localStorage.getItem("ID");

  const [data, setData] = React.useState<Data>();
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/bookingInfo?date=${bookingID}`
      );
      const newData = await response.json();

      setData(newData);
      console.log(bookingID);
    };

    fetchData();
  }, []);
  //WhQD2qC8Tx
  console.log(data);
  return (
    <div>
      <h4>You are Booked an appoiment, successfully!</h4>

      <h3></h3>
      <div className="container">
        <Card sx={{ width: "50vw", m: "5px auto" }}>
          <QRCode
            value={bookingID}
            bgColor="LightCyan"
            fgColor="black"
            size={200}
          />
          <h1>{data?.bookID}</h1>
          <div>
            <Card
              sx={{
                width: "50vw",
                m: "5px auto",
                backgroundColor: "lightgreen",
                textAlign: "left",
              }}
            >
              <h2></h2>
              <h3>Name : {data?.name}</h3>
              <h3>NRC : {data?.nrcID}</h3>
            </Card>
            <Card
              sx={{
                width: "50vw",
                m: "5px auto",
                backgroundColor: "lightblue",
                textAlign: "left",
                padding: "0px 2px",
                fontSize: "2rem",
              }}
            >
              <div>
                <AccessTimeOutlinedIcon />
                <span>{data?.choosenTime}</span>
              </div>
              <div>
                <DateRangeIcon />
                {data?.choosenDate}
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
