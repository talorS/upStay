import { TableProps } from "./headers";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import ExpandableTable from "./ExpandableTable";
import { useToggle } from "../../Utility/hooks";

const TableSection: <T, K> (p: TableProps<T, K>) =>
    React.ReactElement = ({ columns, data, nestedColumns, nestedKey, primaryKey }) => {

        const [expandedRows, toggleRowExpansion] = useToggle();

        return (
            <>
                {data.map((row, rowIndex) => (
                    <React.Fragment key={row[primaryKey]}>
                        <tr>
                            {nestedKey && (
                                <td className="">
                                    <FontAwesomeIcon
                                        icon={expandedRows[rowIndex] ? faArrowDown : faArrowUp}
                                        onClick={() => toggleRowExpansion(rowIndex)}
                                    />
                                </td>
                            )}
                            {columns.map((column) => (
                                <td key={column.key} style={column.getStyle ? column.getStyle(row) : undefined}>
                                    {column.accessorFn ? column.accessorFn(row) : row[column.key]}
                                </td>
                            ))}
                        </tr>
                        {nestedKey && row[nestedKey] && expandedRows[rowIndex] && (
                            <tr>
                                <td colSpan={columns.length}>
                                    <ExpandableTable
                                        data={row[nestedKey]}
                                        columns={nestedColumns!}
                                        primaryKey='name'
                                    />
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </>
        );
    };

export default TableSection;
