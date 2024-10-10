export interface Reservation {
    reservation_id: string;
    hotel_id: number;
    room_id: string;
    guest_name: string;
    arrival_date: Date;
    nights: number;
    room_count: number;
};

export type ReservationApiResponse = {
    data: Reservation[];
    meta: {
        totalRowCount: number;
    };
};