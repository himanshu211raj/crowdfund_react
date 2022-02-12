import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgressWithLabel from "./LinearProgress";

export default function OutlinedCard({
  title,
  duration,
  description,
  status,
  goalAmount,
  raisedAmount,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="flex flex-direction: row lg: col-3 md: col-2">
        <Card className="my-3 max-w-sm mr-3" variant="outlined">
          <CardContent>
            <Typography
              className="font-bold text-3xl"
              color="[#000000]"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography noWrap component="h2" variant="h5">
              {description}
            </Typography>
            <Button
              className="cursor-pointer"
              size="small"
              onClick={() => setIsOpen(true)}
            >
              Show more
            </Button>
            <Typography className="py-2">Up until {duration}</Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Status: <span className="bg-sky-300 p-2">{status}</span>
            </Typography>
            <Typography variant="body2" className="font-bold">
              Goal Amount {goalAmount} ETH
            </Typography>
            <div className="flex items-center justify-around p-5">
              <TextField
                id="outlined-number"
                label="Amount (in ETH)"
                type="number"
                className="mt-5"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button variant="contained" className="color-[#ffff]">
                Fund
              </Button>
            </div>

            <div className="flex items-center justify-center ">
              <Typography
                className="text-center font-semibold"
                sx={{ width: "10%" }}
              >
                {raisedAmount} ETH
              </Typography>
              {/* <LinearProgress
                className="mx-20 my-4"
                variant="determinate"
                value={(raisedAmount / goalAmount) * 100}
                sx={{
                  borderRadius: "10px",
                  width: "80%",
                  height: "10px",
                  marginTop: "5px",
                  backgroundColor: "rgba(0,0,0,0.1)",
                }}
              /> */}
              <LinearProgressWithLabel
                progress={(raisedAmount / goalAmount) * 100}
              />
              <Typography className="font-semibold">
                {goalAmount} ETH
              </Typography>
            </div>
          </CardContent>
        </Card>
        {isOpen && (
          <Dialog
            // eslint-disable-next-line no-restricted-globals
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </>
  );
}
