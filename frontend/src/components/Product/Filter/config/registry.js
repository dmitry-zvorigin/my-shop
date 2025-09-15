import { BooleanFilter, ListFilter, RangeFilter } from "../ui/controls";

export const filterRegistry = {
  list: ListFilter,
  boolean: BooleanFilter,
  range: RangeFilter,
};