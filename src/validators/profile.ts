import { z } from "zod";

export const profile = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phone: z.string().min(10),
    address: z.string().min(1),
});