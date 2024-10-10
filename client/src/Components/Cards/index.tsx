import { useState } from 'react';
import useSWR from "swr";
import Logo from './Logo';
import FilterReservations from './FilterReservations';
import SelectCurrency from './SelectCurrency';
import {
    Welcome,
    ReservationsSection,
    ToolBar,
    ReservationSection
} from './Cards.style';
import Reservation from './Reservation';
import Pagination from './Pagination';
import { fetcher } from '../../Utility/fetchData';
import Loader from './Loader';
import Error from './Error';
import { Currency, CurrencyType, ReservationApiResponse } from './Cards.types';

const PAGE_SIZE = 15;

export default function Reservations() {
    const [pageIndex, setPageIndex] = useState(1);
    const [selectedUuid, setSelectedUuid] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType>(Currency.USD);

    const { data, isLoading, error } = useSWR<ReservationApiResponse, Error>(
        `http://localhost:8080/api/reservationsV2?page=${pageIndex}&limit=${PAGE_SIZE}`,
        fetcher
    );

    // const { data: quotes, isLoading: isLoadingQuote, error: errorQuote } =
    //     useSWR<Record<string, number>, Error>(
    //         `http://localhost:8080/api/liveExchange?baseCurrency=${selectedCurrency}`,
    //         fetcher
    //     );

    const handleFilterReservations = (selectedUuid: string) => {
        setSelectedUuid(selectedUuid);
    }

    const handleChangeCurrency = (selectedCurrency: CurrencyType) => {
        setSelectedCurrency(selectedCurrency);
    }

    if (error /*|| errorQuote*/) return (
        <ReservationsSection>
            <Logo />
            <Welcome>
                Reservations
            </Welcome>
            <Error />
        </ReservationsSection>
    );


    if (isLoading /*|| isLoadingQuote*/) return (
        <ReservationsSection>
            <Logo />
            <Welcome>
                Reservations
            </Welcome>
            <Loader />
        </ReservationsSection>
    );

    const { meta: { totalRowCount: count }, data: reservations } = data!;
    const filterReservations = selectedUuid ?
        reservations.filter(({ reservation_id }) =>
            reservation_id.startsWith(selectedUuid)
        ) :
        reservations;

    return (
        <ReservationsSection>
            <Logo />
            <Welcome>Reservations</Welcome>
            <ToolBar>
                <FilterReservations
                    onFilterReservations={handleFilterReservations}
                    selectedUuid={selectedUuid}
                />
                <SelectCurrency
                    currencies={Object.values(Currency)}
                    onChangeCurrency={handleChangeCurrency}
                    selectedCurrency={selectedCurrency}
                />
            </ToolBar>
            <ReservationSection>
                {filterReservations.map(reservation => {
                    return <Reservation
                        key={reservation.reservation_id}
                        reservation={reservation}
                        selectedCurrency={selectedCurrency}
                    //quotes={quotes!}
                    />
                }
                )}
            </ReservationSection>
            <Pagination
                page={pageIndex}
                setPage={setPageIndex}
                limit={PAGE_SIZE}
                total={count} />
        </ReservationsSection>
    );
};
