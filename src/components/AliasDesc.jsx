import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(1),
    width: "90%",
  },
}));

const AliasDesc = ({ aliases, schedule }) => {
  const classes = useStyles();

  const aliasMap = (classObj) => {
    const classId = classObj.class;
    if (classId in aliases) {
      const alias_str = aliases[classId]
        .map((alias) => `${alias[1]} (${alias[0]})`)
        .join(", ");
      return `${classObj.asString} has the same times as: ${alias_str}.`;
    }
  };

  return (
    <Box className={classes.root}>
      <Typography key="Note" variant="caption">
        Note:
      </Typography>
      {schedule.map((sched, index) => (
        <Typography key={index} variant="caption">
          {aliasMap(sched.objects)}
        </Typography>
      ))}
    </Box>
  );
};

export default AliasDesc;
