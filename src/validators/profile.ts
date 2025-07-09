import { z } from "zod";

export const profile = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    address: z.string().min(1, "Address is required"),
});