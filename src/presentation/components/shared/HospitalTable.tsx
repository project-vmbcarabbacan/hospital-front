import React from "react";
import { Column, Row } from "../utils/types";
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";

interface TableProp {
    columns: Column[]
    rows: Row[]
    page: number
    total: number
    rowsPerPage: number
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const HospitalTable: React.FC<TableProp> = ({
    columns,
    rows,
    page,
    total,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage
}) => {

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer >
                <Table aria-label="table">
                    <TableHead>

                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.value}
                                    align={column.align}
                                    style={{ top: 57, minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value = row[column.value];
                                            return (
                                                <TableCell
                                                    key={column.value}
                                                    align={column.align}
                                                    onClick={() => column.action?.(row)}
                                                    style={{ cursor: column.action ? 'pointer' : 'default' }}
                                                >
                                                    {String(value)}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )

}

export default HospitalTable