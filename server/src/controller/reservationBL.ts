import { dbData, dbRedis } from "@seeder/fileSeeder";
import { Reservation, ReservationNew } from "@models/reservation";

export const getReservations = async (page?: number, perPage?: number)
  : Promise<{
    data: Reservation[],
    meta: {
      totalRowCount: number
    }
  }> => {
  const result = page && perPage ? dbData.slice((page - 1) * perPage, page * perPage) : dbData;
  const meta = {
    totalRowCount: dbData.length
  }
  return { data: result, meta };
}

export const getReservationsV2 = async (page?: number, perPage?: number)
  : Promise<{
    data: ReservationNew[],
    meta: {
      totalRowCount: number
    }
  }> => {
  const result = page && perPage ? await dbRedis.getPaginatedData(page, perPage)
    : await dbRedis.getAllData();
  const meta = {
    totalRowCount: await dbRedis.getLength()
  }
  return { data: result, meta };
}