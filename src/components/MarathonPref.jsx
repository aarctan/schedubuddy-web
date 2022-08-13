import MiniSelect from "components/FormInputs/MiniSelect";

const options = [
  { label: "1 Hour", value: 0 },
  { label: "2 Hours", value: 1 },
  { label: "3 Hours", value: 2 },
  { label: "4 Hours", value: 3 },
  { label: "5 Hours", value: 4 },
];

const MarathonPref = (props) => (
  <MiniSelect
    isObj
    label="Preferred hours of class before a break"
    options={options}
    {...props}
  />
);

export default MarathonPref;
