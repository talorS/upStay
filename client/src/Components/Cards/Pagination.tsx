import { ContainerRow } from './Cards.style';
import './index.css';

type PaginationProps = {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>
    limit: number;
    total: number
}

export default function Pagination({ page, setPage, limit, total }: PaginationProps) {
    const totalCount = total;
    const totalPages = Math.ceil(totalCount / limit);
    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;

    return (
        <ContainerRow style={{ marginTop: '5px' }}>
            <button
                disabled={isFirstPage}
                onClick={() => setPage(1)}
            >
                First
            </button>
            <button
                onClick={() => setPage(page - 1)}
                disabled={isFirstPage}
            >
                Previous
            </button>
            <button
                onClick={() => setPage(page + 1)}
                disabled={isLastPage}
            >
                Next
            </button>
            <button
                onClick={() => setPage(totalPages)}
                disabled={isLastPage}
            >
                Last
            </button>
        </ContainerRow>
    );
}