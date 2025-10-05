import { useState, Fragment, type ChangeEvent } from 'react'
import TableHeader from './TableHeader'
import FormulaDetails from './FormulaDetails'
import type { PerfumeFormula } from './types'

type FormulasTableProps = {
    formulasList: PerfumeFormula[]
}

type SortConfig = {
  value: keyof PerfumeFormula,
  direction: "asc" | "desc"
};

const FormulasTable = ({ formulasList }: FormulasTableProps) => {
  const [currentlyExpanded, setCurrentlyExpanded] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortConfig>({ value: "id", direction: "asc" });
  const [searchTerm, setSearchTerm] = useState<string>("");

  function handleRowClick(id: string){
    setCurrentlyExpanded(id == currentlyExpanded ? null : id);
  }

  function handleSearchTermUpdate(e: ChangeEvent<HTMLInputElement>){
    setSearchTerm(e.target.value);
  }

  // filter formula list by search term (name or notes)
  const filteredList: PerfumeFormula[] = formulasList.filter(item => {
    return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.notes.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // sort formula list by selected key
  const sortedFilteredList: PerfumeFormula[] = [...filteredList].sort((a, b) => {
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
        <input type="text" placeholder="search" value={searchTerm} onChange={handleSearchTermUpdate}/>
        <table>
            <TableHeader />
            <tbody>
                {sortedFilteredList.map((item) => (
                    <Fragment key={item.id}>
                        <tr onClick={(e) => handleRowClick(item.id)}>
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