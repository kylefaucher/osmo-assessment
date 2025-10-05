import type { PerfumeMaterial } from './types'

type FormulaDetailsProps = {
    materials: PerfumeMaterial[]
}

const FormulaDetails = ({ materials }: FormulaDetailsProps) => {

  const totalCost = materials.reduce((sum: number, material:PerfumeMaterial) => sum + material.cost * material.quantity, 0);

  return (
    <tr>
        <td colSpan={7} style={{padding:0}}>
            <table className="detailsTable">
                <thead>
                    <tr>
                        <th>Material</th>
                        <th>Type</th>
                        <th>Supplier</th>
                        <th>Notes</th>
                        <th>Quantity</th>
                        <th>%</th>
                        <th>Cost / mL</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {materials.map((item) => (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.matType}</td>
                            <td>{item.supplier}</td>
                            <td>{item.notes}</td>
                            <td>{item.quantity} mL</td>
                            <td>{item.percentage}%</td>
                            <td>{item.cost.toLocaleString("en-US", {style:"currency", currency:"USD"})}</td>
                        </tr>
                    ))}
                    <tr className="totalCostRow"><td colSpan={7}><strong>Total Cost: {totalCost.toLocaleString("en-US", {style:"currency", currency:"USD"})}</strong></td></tr>
                </tbody>
            </table>
        </td>
    </tr>
  )
}

export default FormulaDetails