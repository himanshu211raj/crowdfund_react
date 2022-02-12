import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function LinearProgressWithLabel({ progress }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Stack sx={{ width: "100%", mr: 1 }}>
          <Typography
            className="text-center"
            variant="body2"
            color="text.secondary"
            sx={{ minWidth: 35 }}
          >{`${Math.round(progress)}%`}</Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            className="mx-5"
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default LinearProgressWithLabel;
