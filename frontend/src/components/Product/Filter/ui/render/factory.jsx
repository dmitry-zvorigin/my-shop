import { filterRegistry } from "../../config/registry";
import { adapters } from "../../model/adapters";

export default function createFilterRenderer (q, patchQuery, extraProps = {}) {

  return function renderFilter(filter, variant = "sidebar") {
    const Comp = filterRegistry[filter.type];
    if (!Comp) return null;
 
    const adapter = adapters[filter.type];
    const value = adapter.get(q, filter.value);

    const onChange = (next) => {
      patchQuery({
        [filter.value]: adapter.set(next),
        page: 1,
      });
      extraProps.onAfterChange?.(filter, next);
    };
 
    const common = { title: filter.title, value, onChange, variant };
    if (filter.type === 'list') {
      common.options = filter.options ?? [];
      if (variant === 'sidebar' && extraProps.showApplyAtEl) {
        common.showApplyAtEl = extraProps.showApplyAtEl;
      }
    }
    if (filter.type === 'range') {
      Object.assign(common, {
        min: filter.min, max: filter.max, step: filter.step, unit: filter.unit
      });
    }
    if (filter.type === 'boolean') {
      common.options = filter ?? [];
    }
    console.log(common);
    return <Comp key={filter.value} {...common} />
  }
}