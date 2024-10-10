import { Tooltip as ReactTooltip } from 'react-tooltip'
import getSymbolFromCurrency from 'currency-symbol-map';
import {
    Card,
    Label,
    Value,
    Uuid,
    CheckIn,
    CheckOut,
    Hotel,
    Room,
    Price
} from './Cards.style';
import { Reservation, Hotels, Rooms, CurrencyType, Currency } from './Cards.types';
import { faker } from '@faker-js/faker';
import { useMemo } from 'react';

const dateFormat = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
} as const;

interface ReservationProps {
    reservation: Reservation,
    selectedCurrency: CurrencyType,
    /*quotes: Record<string, number>*/
}

export default function ReservationNew({ reservation, selectedCurrency/*, quotes*/ }: ReservationProps) {
    const { reservation_id, hotel_id, room_id, arrival_date, nights } = reservation;
    const checkIn = new Date(arrival_date);
    const chekOut = new Date(arrival_date);
    chekOut.setDate(checkIn.getDate() + nights);
    const memoData = useMemo(() => ({
        hotelName: faker.helpers.shuffle<string>(Object.values(Hotels))[0],
        roomName: faker.helpers.shuffle<string>(Object.values(Rooms))[0],
        price: faker.number.float({ min: 100, max: 500, multipleOf: 0.01 }),
        currency: faker.helpers.shuffle<string>(Object.values(Currency))[0]
    }), [reservation_id]);
    const convertedPrice = (memoData.price/* / quotes[memoData.currency]*/).toFixed(2);

    return (
        <Card>
            <Uuid>{reservation_id}</Uuid>
            <CheckIn>
                <Label>Check-in</Label>
                <Value>{checkIn.toLocaleDateString('en-GB', dateFormat)}</Value>
            </CheckIn>
            <CheckOut>
                <Label>Check-out</Label>
                <Value>{chekOut.toLocaleDateString('en-GB', dateFormat)}</Value>
            </CheckOut>
            <Hotel>
                <Label>Hotel</Label>
                <Value data-tip={hotel_id}>{memoData.hotelName}</Value>
            </Hotel>
            <Room>
                <Label>Room</Label>
                <Value data-tip={room_id}>{memoData.roomName}</Value>
            </Room>
            <Price>
                {`${convertedPrice}${getSymbolFromCurrency(selectedCurrency)}`}
            </Price>
            <ReactTooltip />
        </Card>
    );
};
