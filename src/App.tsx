import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import './App.css'
import FormulasTable from './FormulasTable'
import type { PerfumeMaterial, PerfumeFormula} from './types'

type RawParsedDataItem = {
  formula_id: string;
  formula_name: string;
  creator: string;
  category: string;
  creation_date: string;
  notes: string;
  material_name: string;
  material_type: string;
  quantity_ml: string;
  percentage: string;
  cost_per_ml: string;
  supplier: string;
  material_notes: string;
};

const App = () => {
  const [formulasList, setFormulasList] = useState<PerfumeFormula[] | null>(null);

  const dataFilePath: string = '/osmo-assessment/data.csv';

  useEffect(() => {
    fetch(dataFilePath)
      .then((res) => res.text())
      .then((text) => {
        const { data } = Papa.parse<RawParsedDataItem>(text, { header: true });
        const grouped = Object.groupBy(data, row => row.formula_id) as Record<string, RawParsedDataItem[]>;
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
              quantity: parseFloat(row.quantity_ml),
              percentage: parseFloat(row.percentage),
              cost: parseFloat(row.cost_per_ml),
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
