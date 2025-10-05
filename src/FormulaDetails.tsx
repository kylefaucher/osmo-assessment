import type { PerfumeMaterial } from './types'

type FormulaDetailsProps = {
    materials: PerfumeMaterial[]
}

const FormulaDetails = ({ materials }: FormulaDetailsProps) => {

  return (
    <tr>
        <td colSpan={7} style={{padding:0}}>
            <table className="detailsTable">
                <thead>
                    <tr>
                        <th>Material</th>
                        <th>Type</th>
                        <th>Quantity (mL)</th>
                        <th>%</th>
                        <th>Cost (per mL)</th>
                        <th>Supplier</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map((item) => (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.matType}</td>
                            <td>{item.quantity}</td>
                            <td>{item.percentage}</td>
                            <td>{item.cost}</td>
                            <td>{item.supplier}</td>
                            <td>{item.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </td>
    </tr>
  )
}

export default FormulaDetails