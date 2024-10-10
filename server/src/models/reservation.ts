export type Product = {
    id: number
    reservation_uuid: string;
    name: string;
}

export type Charge = {
    id: number,
    special_product_assignment_id: number,
    amount: number,
    active: boolean
}

export type Reservation = {
    reservation_uuid: string;
    products: {
        name: string,
        active: boolean | null,
        amount: number | null
    }[]
};

export type ReservationNew = {
    reservation_id: string;
    room_id: string;
    hotel_id: number;
    guest_name: string;
    arrival_date: Date;
    nights: number;
    room_count: number;
};