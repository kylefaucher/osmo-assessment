import { useState } from 'react'

const TableHeader = () => {

  return (
    <>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Creator</th>
                <th>Category</th>
                <th>Creation Date</th>
                <th>Notes</th>
            </tr>
        </thead>
    </>
  )
}

export default TableHeader