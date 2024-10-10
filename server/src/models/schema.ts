import { z } from 'zod';

const paginationZod = z
    .coerce
    .number()
    .positive()
    .optional();


export const LimitSchema = z.object({
    query: z.object({
        page: paginationZod,
        limit: paginationZod
    }).superRefine((schema, ctx) => {
        if (schema.limit === undefined && schema.page) {
            ctx.addIssue({
                code: "custom",
                message: "Required, please specify limit",
                path: ["limit"]
            });
        }
        if (schema.limit && schema.page === undefined) {
            ctx.addIssue({
                code: "custom",
                message: "Required, please specify page",
                path: ["page"]
            });
        }
    })
});

export type ReservationDTO = z.infer<typeof LimitSchema>;
