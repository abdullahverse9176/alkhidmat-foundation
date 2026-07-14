// lib/validators.ts

import { z } from "zod";

export const requiredText = (label: string) =>
    z.string().trim().min(1, `${label} is required`);

export const nameField = (label: string) =>
    requiredText(label).min(3, `${label} must be at least 3 characters`);

export const phoneField = (label: string) =>
    requiredText(label).min(11, `${label} must be at least 11 characters`);

export const emailField = (label: string) =>
    z.email(`${label} is invalid`);