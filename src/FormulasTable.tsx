import { useState, Fragment, type ChangeEvent } from 'react'
import TableHeader from './TableHeader'
import FormulaDetails from './FormulaDetails'
import type { PerfumeFormula, SortConfig } from './types'

type FormulasTableProps = {
    formulasList: PerfumeFormula[]
}

const FormulasTable = ({ formulasList }: FormulasTableProps) => {
  const [currentlyExpanded, setCurrentlyExpanded] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortConfig>({ value: "id", direction: "asc" });
  const [searchTerm, setSearchTerm] = useState<string>("");

  // update currently expanded state when formula row is clicked
  function handleRowClick(id: string){
    setCurrentlyExpanded(id == currentlyExpanded ? null : id);
  }

  // update searchTerm state when new searchterm entered
  function handleSearchTermUpdate(e: ChangeEvent<HTMLInputElement>){
    setSearchTerm(e.target.value);
  }

  // update sortBy state when table header rows are clicked
  function handleSort (field: keyof PerfumeFormula){
    setSortBy(prev => ({
        value: field,
        direction: prev.value === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  }

  // filter formula list by search term (name or notes)
  const filteredList: PerfumeFormula[] = formulasList.filter(item => {
    return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.notes.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // sort formula list by selected key
  const sortedFilteredList: PerfumeFormula[] = filteredList.sort((a, b) => {
    const aVal = a[sortBy.value];
    const bVal = b[sortBy.value];

    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();

    if (aStr < bStr) return sortBy.direction === "asc" ? -1 : 1;
    if (aStr > bStr) return sortBy.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <>
        <input type="text" placeholder="search" value={searchTerm} onChange={handleSearchTermUpdate} className="search"/>
        <table className="formulas-table">
            <TableHeader handleSort={handleSort} sortBy={sortBy}/>
            <tbody>
                {sortedFilteredList.map((item) => (
                    <Fragment key={item.id}>
                        <tr onClick={() => handleRowClick(item.id)} className="formula-row cursor-pointer">
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.creator}</td>
                            <td>{item.category}</td>
                            <td>{item.date}</td>
                            <td>{item.notes}</td>
                        </tr>
                        {item.id == currentlyExpanded && <FormulaDetails materials={item.materials}/>}
                    </Fragment>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default FormulasTable