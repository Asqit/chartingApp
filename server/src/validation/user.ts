import YupPassword from "yup-password";
import * as yup from "yup";
import { Users } from "@prisma/client";

YupPassword(yup);

const password = yup.string().password()
.minSymbols(0)
.minNumbers(4)
.length(9)
.minUppercase(1)
.required();

export const loginSchema = yup.object({
	password,
	email: yup.string().email().required()
});

export const registerSchema = yup.object({
	password,
	email: yup.string().email().required(),
	username: yup.string().trim().required(),
});

export const UserSchema = yup.object<Users>({
	id: yup.number().required(),
	email: yup.string().email().required(),
	username: yup.string().required(),
	verified: yup.boolean(),
	salt: yup.string(),
});
