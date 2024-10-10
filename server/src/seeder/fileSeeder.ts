import { Charge, Reservation, Product, ReservationNew } from "@models/reservation";
import { PRODUCTS_PATH, PRODUCTS_CHARGES_PATH, RESERVATIONS_PATH } from "@configs/constants";
import { RecordCollector } from "@configs/redisCollection";
import {
    joinSchemas,
    readCsvFile,
    readJsonFile,
    readJsonFileStream
} from "@utils/helper";

let dbData: Reservation[] = [];
let dbRedis = new RecordCollector<ReservationNew>('reservations');

const shouldSeed = async () => {
    const count = await dbRedis.getLength();
    return !count;
}

const run = async () => {
    try {
        if (await shouldSeed()) {
            await readCsvFile(RESERVATIONS_PATH, dbRedis, 'reservation_id');
        }
        const products = await readJsonFile<Product[]>(PRODUCTS_PATH);
        const charges = await readJsonFile<Charge[]>(PRODUCTS_CHARGES_PATH);
        dbData = joinSchemas(products, charges);
    } catch (err) {
        throw new Error(`run() failed: ${err.message}`);
    }
}

export {
    dbData,
    dbRedis,
    run
};