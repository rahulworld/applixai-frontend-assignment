import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

interface TrendTableProps {
    data: any;
    definedColumn: { field: string; }[],
}

const defaultColDef = {
    flex: 1,
};

const TrendTable = (props: TrendTableProps) => {
    return (
        <div
            className="ag-theme-quartz h-60 mt-4"
        >
            <AgGridReact
                rowData={props.data}
                columnDefs={props.definedColumn}
                defaultColDef={defaultColDef}
            />
        </div>)
}

export default TrendTable;