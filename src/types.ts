export type PerfumeMaterial = {
  name: string,
  matType: string,
  quantity: number,
  percentage: number,
  cost: number, 
  supplier: string,
  notes: string
}

export type PerfumeFormula = {
  id: string,
  name: string,
  creator: string,
  category: string,
  date: string,
  notes: string,
  materials: PerfumeMaterial[]
}

export type SortConfig = {
  value: keyof PerfumeFormula,
  direction: "asc" | "desc"
};