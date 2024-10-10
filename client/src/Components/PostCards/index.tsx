import useSWRInfinite from "swr/infinite"
import InfiniteScroll from "../InfiniteScroll"
import LoadingIndicator from "../Loader"
import { fetcher } from "../../Utility/fetchData"
import { ReservationApiResponse } from "./PostCards.types";

export default function PostCards() {
    const PAGE_SIZE = 15;

    const swr = useSWRInfinite<ReservationApiResponse, Error>(
        (index, prev) =>
            `http://localhost:8080/api/reservationsV2?page=${index + 1}&limit=${PAGE_SIZE}`,
        fetcher,
        { revalidateFirstPage: false }
    );

    return (
        <InfiniteScroll
            swr={swr}
            loadingIndicator={<LoadingIndicator style={{ margin: '30px auto' }} />}
            endingIndicator={
                <div style={{ margin: '30px auto', textAlign: 'center' }}>No more issues! 🎉</div>
            }
            isReachingEnd={(swr) =>
                swr.data?.at(0)?.data.length === 0 ||
                (swr.data?.at(swr.data?.length - 1)?.data.length ?? 0) < PAGE_SIZE
            }
        >
            {(response) =>
                response?.data.map((issue) => (
                    <div
                        key={issue.reservation_id}
                        style={{
                            padding: '20px',
                            borderRadius: '8px',
                            border: 'solid #ccc 1px',
                            margin: '20px auto',
                            maxWidth: '400px',
                        }}
                    >
                        <div style={{ fontWeight: 700 }}>{issue.reservation_id}</div>
                        <div style={{ color: '#aaa', marginTop: '8px' }}>
                            {issue.guest_name} • {new Date(issue.arrival_date).toDateString()}
                        </div>
                    </div>
                ))
            }
        </InfiniteScroll>
    )
}