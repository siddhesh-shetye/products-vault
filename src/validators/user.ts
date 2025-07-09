import { z } from "zod";

// At least 8 characters, one uppercase, one lowercase, one digit, one special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;

export const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, "Password must be at least 8 characters").regex(passwordRegex, "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"),
    profile: z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        phone: z.string().min(10, "Phone number must be at least 10 characters"),
        address: z.string().min(1, "Address is required"),
    }),
});

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, "Password is required"),
});