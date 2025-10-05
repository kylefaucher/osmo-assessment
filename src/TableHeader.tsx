import type { PerfumeFormula, SortConfig } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

type TableHeaderProps = {
  sortBy: SortConfig,
  handleSort: (field: keyof PerfumeFormula) => void;
}

const TableHeader = ({sortBy, handleSort}: TableHeaderProps) => {

  const columns: { label: string; key: keyof PerfumeFormula }[] = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Creator", key: "creator" },
    { label: "Category", key: "category" },
    { label: "Creation Date", key: "date" },
    { label: "Notes", key: "notes" },
  ];

  return (
      <thead>
        <tr className="headerRow">
          {columns.map(({ label, key }) => {
            const isActive = sortBy.value === key;
            const direction = isActive ? sortBy.direction : null;

            return (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="cursor-pointer select-none"
              >
                <span>{label}</span>
                <FontAwesomeIcon
                  icon={
                    direction === "asc"
                      ? faArrowUp
                      : direction === "desc"
                      ? faArrowDown
                      : faArrowUp
                  }
                  className={isActive ? "active-icon" : "inactive-icon"}
                />
              </th>
            );
          })}
        </tr>
      </thead>
  )
}

export default TableHeader