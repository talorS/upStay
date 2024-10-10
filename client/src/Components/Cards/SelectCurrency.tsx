import { Select, Label } from './Cards.style';
import { Currency, CurrencyType } from './Cards.types';

type SelectCurrencyProps = {
    onChangeCurrency: (selectedCurrency: CurrencyType) => void;
    currencies: CurrencyType[];
    selectedCurrency: CurrencyType
}

const SelectCurrency = ({ currencies, selectedCurrency, onChangeCurrency }: SelectCurrencyProps) => {
    return (
        <Select>
            <Label>Change Currency: </Label>
            <select
                onChange={e => {
                    onChangeCurrency(Currency[e.target.value]);
                }}
                defaultValue={selectedCurrency}
            >
                {currencies.sort().map(currency => {
                    return (
                        <option
                            key={currency}
                            value={currency}
                        >
                            {currency}
                        </option>
                    );
                })}
            </select>
        </Select>
    );
};

export default SelectCurrency;
