import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import './App.css'
import FormulasTable from './FormulasTable'
import type { PerfumeMaterial, PerfumeFormula} from './types'

const App = () => {
  const [formulasList, setFormulasList] = useState<PerfumeFormula[] | null>(null);

  const dataFilePath: string = '/osmo-assessment/data.csv';

  useEffect(() => {
    fetch(dataFilePath)
      .then((res) => res.text())
      .then((text) => {
        const { data } = Papa.parse(text, { header: true });
        // TODO: better typing of data / row
        const grouped = Object.groupBy(data, row => row.formula_id);
        const groupedFormulas: PerfumeFormula[] = Object.entries(grouped).map(
          ([id, rows]) => ({
            id,
            name: rows[0].formula_name,
            creator: rows[0].creator,
            category: rows[0].category,
            date: rows[0].creation_date,
            notes: rows[0].notes,
            materials: rows.map<PerfumeMaterial>(row => ({
              name: row.material_name,
              matType: row.material_type,
              quantity: row.quantity_ml,
              percentage: row.percentage,
              cost: row.cost_per_ml,
              supplier: row.supplier,
              notes: row.material_notes,
            })),
          })
          // TODO: more robust error handling
        )
        setFormulasList(groupedFormulas);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  return (
    <>
      <div>
      <h1>Fragrance Formula Manager</h1>
      {
        formulasList==null ? <p>loading...</p> : <FormulasTable formulasList={formulasList}/>
      }
      </div>
    </>
  )
}

export default App
