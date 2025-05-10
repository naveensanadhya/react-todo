import React from "react";
import { Statuses } from "./Constants";

const Status = ({
  firstOptionLabel = "Change Status",
  dropdownClass = "w-full rounded px-1 py-2 cursor-pointer",
  value,
  onChange,
  ...rest
}) => {
  return (
    <select value={value} onChange={onChange} className={dropdownClass}>
      <option value="">{firstOptionLabel}</option>
      <option value={Statuses.PENDING}>{Statuses.PENDING}</option>
      <option value={Statuses.COMPLETED}>{Statuses.COMPLETED}</option>
    </select>
  );
};

export default Status;
