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

export const Currency = {
    USD: 'USD',
    ILS: 'ILS',
    EUR: 'EUR',
    GBP: 'GBP',
    CAD: 'CAD'
} as const;

export type CurrencyType = (typeof Currency)[keyof typeof Currency];

export const Hotels = [
    'Leonardo Plaza Ashdod',
    'Rothschild 22',
    'Herods Vitalis Eilat',
    'U Magic Palace',
    'NYX Tel Aviv'
] as const;

export const Rooms = [
    'Standard',
    'Delux',
    'Botique',
    'Panroam with Pool',
    'Animi'
] as const;

const CurrencyArr = ['USD', 'ILS', 'EUR', 'GBP', 'CAD'] as const;
type CurrencyArrType = (typeof CurrencyArr)[number];