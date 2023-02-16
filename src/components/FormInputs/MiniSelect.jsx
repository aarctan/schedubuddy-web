import { Grid, InputLabel } from "@mui/material";
import { styled } from "@mui/material";
import BasicSelect from "./BasicSelect";

const UnstyledMiniSelect = ({ className, label, ...rest }) => {
  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="center">
      <Grid item xs={12} lg={6}>
        <InputLabel className={className}>{label}</InputLabel>
      </Grid>
      <Grid item xs={12} lg={4}>
        <BasicSelect {...rest} />
      </Grid>
    </Grid>
  );
};

const MiniSelect = styled(UnstyledMiniSelect)(({ theme }) => ({
  color: theme.palette.text.primary,
  whiteSpace: "normal",
}));

export default MiniSelect;
