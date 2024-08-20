import { Table as MuiTable, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'

interface TableProps<T> {
    data: T[];
    headers: string[];
    className?: string
}

function Table<T>(props: TableProps<T>) {
    const { headers } = props;

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error fetching data</div>;

    function renderTableData() {
        const data: T[] = props.data || [];

        return data.map((row: any) => {
            return (
                <TableRow key={row.initTx}>
                    {
                        headers.map((cell: any, i: number) => {
                            return (
                                <TableCell key={i}>{cell.field}</TableCell>
                            )
                        })
                    }
                </TableRow>
            )
        })
    }


    function renderTableHeader() {
        return headers.map((cell: any, i: number) => {
            return (
                <TableCell key={i}>{cell.title}</TableCell>
            )
        })

    }

    return (
        <MuiTable stickyHeader={true}>
            <TableHead>
                {renderTableHeader()}
            </TableHead>
            <TableBody>
                {renderTableData()}
            </TableBody>
        </MuiTable>
    )
}

export default Table

