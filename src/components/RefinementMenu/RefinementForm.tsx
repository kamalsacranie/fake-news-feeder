import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, GroupBox, Select } from "react95";
import { SelectOption } from "react95/dist/Select/Select.types";
import { UseStateSet } from "../../types";

type SelectChangeFunction<T> = (
  selectedOption: T | undefined,
  setter: UseStateSet<T>
) => void | undefined;

const sortOptions: SelectOption<string>[] = [
  ["", ""],
  ["Date", "created_at"],
  ["Comment count", "comment_count"],
  ["Votes", "votes"],
].map(([label, value]) => ({
  value,
  label,
}));
const orderOptions: SelectOption<string>[] = [
  ["", ""],
  ["Ascending", "asc"],
  ["Descending", "desc"],
].map(([label, value]) => ({
  value,
  label,
}));

/**
 * @returns The refinement form used in our floatover menu
 *
 * @remarks
 * This form uses traditional react form controlled components because my UI library does not have vanilla <select> and <option> tags
 * We also use an odd naming convention for useState because of the way we name query parameters
 */
const RefinementForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort_by, setSort_by] = useState("");
  const [order, setOrder] = useState("");

  const onSelectBoxChange: SelectChangeFunction<string> = (
    selectedOptionValue,
    setter
  ) => {
    setter(selectedOptionValue || "");
  };

  useEffect(() => {
    setSort_by(searchParams.get("sort_by") || "");
    setOrder(searchParams.get("order") || "");
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    Object.entries({ sort_by, order }).forEach(([key, value]) => {
      if (value === "") return searchParams.delete(key);
      searchParams.set(key, value);
    });
    setSearchParams(searchParams);
  };

  return (
    <form onSubmit={onSubmit}>
      <GroupBox className="flex flex-col">
        <label htmlFor="sort_by">Sort by</label>
        <Select
          value={sort_by}
          name="sort_by"
          menuMaxHeight={160}
          options={sortOptions}
          onChange={({ value }) => onSelectBoxChange(value, setSort_by)}
          width={160}
        />
        <label htmlFor="order">Order by</label>
        <Select
          value={order}
          name="order"
          menuMaxHeight={160}
          options={orderOptions}
          onChange={({ value }) => onSelectBoxChange(value, setOrder)}
          width={160}
        />
        <Button type="submit">Refine 🍷</Button>
      </GroupBox>
    </form>
  );
};

export default RefinementForm;
