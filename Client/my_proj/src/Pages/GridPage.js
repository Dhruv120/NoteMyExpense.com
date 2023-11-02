import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS


const GridPage = () => {

    const [rowData, setRowData] = useState();


    const columnDefs =[
        {
            field:'Date'
        },
        {
            field:'Amount'
        },
        {
            field:'Type'
        },
        {
            field:'Category'
        },
        {
            field:'Refrence'
        }
]



















  return (
    <div>

        <AgGridReact
        rowData={rowData} 
        columnDefs={columnDefs} 
        animateRows={true} 
        rowSelection='multiple'
        />
        
    </div>
  )
}

export default GridPage