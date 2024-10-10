import { Product, Reservation, Status } from "./Table.types";

export interface TableColumn<T> {
    key: string;
    header: string;
    accessorFn?: (originalRow: T) => any;
    getStyle?: (originalRow: T) => React.CSSProperties;
}

export interface TableProps<T, K> {
    columns: TableColumn<T>[];
    data: T[];
    nestedColumns?: TableColumn<K>[];
    primaryKey: string;
    nestedKey?: string;
}


export const COLUMNS: TableColumn<Reservation>[] = [
    {
        key: 'reservation_uuid',
        header: 'Reservation UUID',
        getStyle: (originalRow) => ({ fontWeight: '700' })
    },
    {
        key: 'numActivePurchases',
        header: 'Number of Active Purchases',
        accessorFn: (originalRow: Reservation) => {
            return originalRow
                .products
                ?.reduce((acc, prod) => acc + (prod.active ? 1 : 0), 0);
        },
    },
    {
        key: 'numActiveCharges',
        header: 'Number of Active Charges',
        accessorFn: (originalRow) => {
            return originalRow.products
                ?.reduce((acc, prod) => acc + (prod.amount ?? 0), 0);
        },
    },
];

export const NESTED_COLUMNS: TableColumn<Product>[] = [
    { key: 'name', header: 'Name' },
    {
        key: 'status',
        header: 'Status',
        accessorFn: (originalRow) => {
            switch (originalRow.active) {
                case true:
                    return Status.ACTIVE;
                case false:
                    return Status.CANCEL
                case null:
                    return Status.EMPTY
            }
        },
        getStyle: (originalRow) => {
            switch (originalRow.active) {
                case true:
                    return { backgroundColor: 'green' };
                case false:
                    return { backgroundColor: 'red' };
                default:
                    return { backgroundColor: 'white' };
            }
        },
    },
    { key: 'amount', header: 'Price' },
];