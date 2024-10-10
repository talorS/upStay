export type ReservationApiResponse = {
    data: Reservation[];
    meta: {
        totalRowCount: number;
    };
};

export enum Status {
    ACTIVE = 'active',
    CANCEL = 'canceled',
    EMPTY = ''
};

export interface Product {
    name: string,
    active: boolean | null,
    amount: number | null
};

export interface Reservation {
    reservation_uuid: string;
    products: Product[]
};