import React from "react";
import { TableProps } from "./headers";
import TableSection from "./TableSection";

const ExpandableTable: <T, K> (p: TableProps<T, K>) =>
    React.ReactElement = ({ columns, data, nestedColumns, nestedKey, primaryKey }) => {
        return (
            <table>
                <thead>
                    <tr>
                        {nestedKey && <th style={{ width: '3%' }}></th>}
                        {columns.map(column => (
                            <th key={column.header}>{column.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <TableSection
                        columns={columns}
                        data={data}
                        nestedColumns={nestedColumns}
                        nestedKey={nestedKey}
                        primaryKey={primaryKey}
                    />
                </tbody>
            </table>
        );
    };

export default ExpandableTable;
