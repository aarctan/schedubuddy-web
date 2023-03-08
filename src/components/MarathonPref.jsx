import MiniSelect from "components/FormInputs/MiniSelect";

const options = [
  { label: "1 Hr", value: 0 },
  { label: "2 Hrs", value: 1 },
  { label: "3 Hrs", value: 2 },
  { label: "4 Hrs", value: 3 },
  { label: "5 Hrs", value: 4 },
  { label: "Max", value: 12 }
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
