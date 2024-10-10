import useSWRInfinite from 'swr/infinite';
import { COLUMNS, NESTED_COLUMNS } from './headers';
import { fetcher } from '../../Utility/fetchData';
import { Reservation, ReservationApiResponse } from './Table.types';
import ExpandableTable from './ExpandableTable';
import LoadingIndicator from '../Loader';
import InfiniteScrollSwr from '../InfiniteScroll';
import { ToolBar } from '../Cards/Cards.style';
import FilterReservations from './Filter';
import { numberWithCommas } from '../../Utility/helper';
import { useFilter } from '../../Utility/hooks';
import './index.css'

const PAGE_SIZE = 50;

export default function InfiniteScroll() {

  const swr = useSWRInfinite<ReservationApiResponse, Error>(
    (index, prev) =>
      `http://localhost:8080/api/reservations?page=${index + 1}&limit=${PAGE_SIZE}`,
    fetcher,
    { revalidateFirstPage: false }
  );

  const [selectedUuid, filterReservations] = useFilter();

  const reservations: Reservation[] = swr.data?.flatMap(page => page.data) ?? [];
  const totalRowCount = swr.data?.at(0)?.meta.totalRowCount || 0;

  const filteredReservations = selectedUuid ?
    reservations.filter(({ reservation_uuid }) =>
      reservation_uuid.startsWith(selectedUuid)
    ) :
    reservations;

  return (
    <InfiniteScrollSwr
      swr={swr}
      loadingIndicator={<LoadingIndicator style={{ margin: '30px auto' }} />}
      endingIndicator={selectedUuid ? null :
        <div style={{ margin: '30px auto', textAlign: 'center' }}>No more records! 🎉</div>
      }
      errorgIndicator={
        <div style={{ margin: '30px auto', textAlign: 'center', color: 'red' }}>ⓘ Error!</div>
      }
      isReachingEnd={(swr) => selectedUuid ? true : (
        swr.data?.at(0)?.data.length === 0 ||
        (swr.data?.at(swr.data?.length - 1)?.data.length ?? 0) < PAGE_SIZE
      )}
      totalFetchIndicator={
        selectedUuid ? null :
          <h3 style={{ textAlign: 'center' }}>
            Fetched {numberWithCommas(reservations.length)} of {numberWithCommas(totalRowCount)} total records.
          </h3>
      }
    >
      <ToolBar>
        <FilterReservations
          onFilterReservations={filterReservations}
          selectedUuid={selectedUuid}
        />
      </ToolBar>
      <ExpandableTable
        columns={COLUMNS}
        data={filteredReservations}
        nestedKey='products'
        primaryKey='reservation_uuid'
        nestedColumns={NESTED_COLUMNS}
      />
    </InfiniteScrollSwr>
  );
};
