import { Grid, Card, CardContent, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    backgroundColor: "#EDECEC",
    display: "flex",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  Media: {
    height: "auto",
    width: "auto",
    maxHeight: "90%",
    maxWidth: "90%",
  },
});

const AliasDesc = ({ aliases, schedule }) => {
  const classes = useStyles();

  const 

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Grid container direction="column" className={classes.content}>
          <Typography variant="subtitle1">
            Hello
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AliasDesc;
