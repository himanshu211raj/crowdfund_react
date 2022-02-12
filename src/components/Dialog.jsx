import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

export default function FormDialog({ open, handleClose, handleSubmit }) {
  const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Project creation form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new project to be funded, please fill out the form.
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Title"
            type="title"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Description"
            type="description"
            fullWidth
            variant="standard"
          />
          <div style={{ display: "flex", marginTop: 10 }}>
            <TextField
              id="outlined-number"
              label="Amount (in ETH)"
              type="number"
              className="mr-5"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Select duration"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
