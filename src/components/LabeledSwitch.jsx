import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const LabeledSwitch = ({ label, checked, onChange }) => (
  <FormGroup>
    <FormControlLabel
      control={<Switch checked={checked} onChange={onChange} />}
      label={label}
    />
  </FormGroup>
);

export default LabeledSwitch;
