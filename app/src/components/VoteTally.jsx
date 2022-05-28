import {
  Avatar,
  Box,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { formatWithCommas, percentize } from "../utils";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 48,
    width: 48,
    borderRadius: "initial",
    "&.left": {
      marginRight: theme.spacing(0.5),
    },
    "&.right": {
      marginLeft: theme.spacing(0.5),
    },
  },
  progress: {
    backgroundColor: theme.palette.primary.main,
    height: 25,
  },
}));

// Show vote counts for each side
export default function VoteTally({ votes }) {
  const classes = useStyles();

  function getProgress() {
    if (
      typeof votes.republicians !== "number" ||
      typeof votes.democrats !== "number" ||
      votes.republicians + votes.democrats === 0
    ) {
      return 50;
    }
    return (votes.republicians / (votes.democrats + votes.republicians)) * 100;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" marginBottom="5px">
        <Box display="flex" alignItems="flex-end">
          <Typography variant="h6">Republicians</Typography>
        </Box>
        <Box display="flex" alignItems="flex-end" textAlign="right">
          <Typography variant="h6">Democrats</Typography>
        </Box>
      </Box>
      <LinearProgress
        variant="determinate"
        value={getProgress()}
        color="secondary"
        className={classes.progress}
      />
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h3">
            {formatWithCommas(votes.republicians)}
          </Typography>
          <Typography variant="h6">
            {percentize(votes.republicians / (votes.republicians + votes.democrats))}
          </Typography>
        </Box>
        <Box textAlign="right">
          <Typography variant="h3">{formatWithCommas(votes.democrats)}</Typography>
          <Typography variant="h6">
            {percentize(votes.democrats / (votes.republicians + votes.democrats))}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
