import React from "react";
import Button from "@mui/material/Button";
import Cards from "../components/Cards";
import FormDialog from "../components/Dialog";

const data = [
  {
    title: "React",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    duration: "Fri Jan 14 2022 11:59:59 GMT+5:30 (IST)",
    status: "Ongoing",
    goalAmount: 100,
    raisedAmount: 50,
  },
  {
    title: "Next",
    description: "A JavaScript library for building user interfaces.",
    duration: "Sat Jan 15 2022 11:59:59 GMT+5:30 (IST)",
    status: "Ongoing",
    goalAmount: 100,
    raisedAmount: 60,
  },
  {
    title: "React",
    description: "A JavaScript library for building user interfaces.",
    duration: "Sun Jan 16 2022 11:59:59 GMT+5:30 (IST)",
    status: "Ongoing",
    goalAmount: 100,
    raisedAmount: 20,
  },
  {
    title: "React",
    description: "A JavaScript library for building user interfaces.",
    duration: "Sun Jan 16 2022 11:59:59 GMT+5:30 (IST)",
    status: "Ongoing",
    goalAmount: 100,
    raisedAmount: 30,
  },
  {
    title: "React",
    description: "A JavaScript library for building user interfaces.",
    duration: "Sun Jan 16 2022 11:59:59 GMT+5:30 (IST)",
    status: "Ongoing",
    goalAmount: 100,
    raisedAmount: 90,
  },
];

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="flex flex-col">
      <div className="w-full text-center ">
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          className="mb-10"
        >
          Start Project
        </Button>
      </div>
      <h1 className=" text-5xl text-center pt-5">Projects</h1>
      <div className="flex flex-wrap p-5">
        {data.map((item, index) => (
          <Cards {...item} key={index} />
        ))}
      </div>
      {open && <FormDialog open={open} handleClose={handleClose} />}
    </div>
  );
};

export default Home;
