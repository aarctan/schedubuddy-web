import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Grid } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#EDECEC",
    height: "100%",
  },
  Media: {
    height: "auto",
    width: "auto",
    maxHeight: "90%",
    maxWidth: "90%",
  },
});

const FormGrid = ({ children, sx }) => (
  <Grid item xs={12} sx={{ my: 2, ...sx }}>
    {children}
  </Grid>
);

export default function ScheduleContainer({ b64images }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <FormGrid sx={{ display: "flex", justifyContent: "center" }}>
          <img
            className={classes.Media}
            src={`data:image/png;base64,${b64images[0]}`}
            alt="Schedule"
          />
        </FormGrid>
      </CardContent>
    </Card>
  );
}
