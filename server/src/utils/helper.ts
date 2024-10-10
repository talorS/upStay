import { Charge, Product, Reservation } from '@models/reservation';
import { createReadStream } from 'node:fs';
import { readFile } from 'node:fs/promises';
import csv from "csvtojson";
import { RecordCollector } from '@configs/redisCollection';
import { parser } from 'stream-json/Parser'
import { streamArray } from 'stream-json/streamers/StreamArray';
import { TempFile } from '@utils/fileDisposable'

export const readCsvFile = async <T>(filePath: string, collection: RecordCollector<T>, key: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        csv()
            .fromStream(createReadStream(filePath))
            .subscribe(
                (row: T) => {
                    collection.write(row[key], row);
                },
                (err) => {
                    reject(`readCsvFile() error: ${err.message}`);
                },
                () => {
                    console.log('Uploaded all data!');
                    resolve();
                }

            )
    });
}

export const readJsonFile = async <T>(filePath: string): Promise<T> => {
    try {
        const contents = await readFile(filePath, { encoding: 'utf8' });
        const data: T = JSON.parse(contents);
        return data;
    } catch (err) {
        console.error(err.message);
        throw new Error(`readJsonFile error: ${err.message}`)
    }
}

export const readJsonFileStream = async <T>(filePath: string): Promise<T[]> => {
    const content: T[] = [];
    return new Promise((resolve, reject) => {
        createReadStream(filePath, { encoding: 'utf8' })
            .pipe(parser())
            .pipe(streamArray())
            .on('data', (row) => {
                content.push(row.value);
            })
            .on('end', () => {
                console.log('end');
                resolve(content);
            })
            .on('error', (err) => {
                console.error('readJsonFileStream error:', err);
                reject(new Error(err));
            });
    });
}

export function processFile(path: string) {
    using file = new TempFile(path);
}

export function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
    const map = new Map<K, Array<V>>();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

export const joinSchemas = (schemaA: Product[], schemaB: Charge[]) => {
    const schemaBMap = new Map(
        schemaB
            .filter(charge => charge.id)
            .map(charge => [charge.special_product_assignment_id, charge])
    );
    return schemaA.reduce((acc, product) => {
        const charge = schemaBMap.get(product.id) || { active: null, amount: null };
        const existingReservation = acc.find(res => res.reservation_uuid === product.reservation_uuid);

        if (!existingReservation) {
            acc.push({
                reservation_uuid: product.reservation_uuid,
                products: [{
                    name: product.name,
                    active: charge.active,
                    amount: charge.amount
                }]
            });
        } else {
            existingReservation.products.push({
                name: product.name,
                active: charge.active,
                amount: charge.amount
            });
        }

        return acc;
    }, [] as Reservation[]);
}