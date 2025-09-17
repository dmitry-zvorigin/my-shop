import { BooleanFilter, ListFilter, PriceFilter, RangeFilter } from "../ui/controls";

export const filterRegistry = {
  list: ListFilter,
  boolean: BooleanFilter,
  range: RangeFilter,
  price: PriceFilter,
};