import { Input } from './Cards.style';

type FilterReservationsProps = {
    onFilterReservations: (selectedUuid: string) => void,
    selectedUuid: string
}

const FilterReservations = ({ onFilterReservations, selectedUuid }: FilterReservationsProps) => {
    return (
        <Input
            type="text"
            onChange={e => {
                onFilterReservations(e.target.value);
            }}
            placeholder="Filter by uuid"
            value={selectedUuid}
        />
    );
};

export default FilterReservations;
