import "./TermFilter.css";

const TermFilter = (props) => {
//  const [selectedYear, setFilteredYear] = useState("2021");
  const termChangedHandler = (event) => {};

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <select value={props.selected} onChange={termChangedHandler}>
          <option value="Fall 2020">Fall 2020</option>
          <option value="Winter 2021">Winter 2021</option>
        </select>
      </div>
    </div>
  );
};

export default TermFilter;
