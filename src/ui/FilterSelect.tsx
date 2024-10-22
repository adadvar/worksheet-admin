import { useSearchParams } from "react-router-dom";
import Select from "./Select";

interface Option {
  value: string;
  label: string;
}

const FilterSelect = ({
  filterField,
  options,
}: {
  filterField: string;
  options: Option[];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set(filterField, e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      options={options}
      type="white"
      value={currentFilter}
      onChange={handleChange}
    />
  );
};

export default FilterSelect;
