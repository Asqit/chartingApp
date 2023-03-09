import { Users } from "@prisma/client";
import { UserSchema } from "../validation/user";

export class UserDTO {
	public username: string;
	public email: string;
	public id: number;

	constructor() {
		this.username = "";
		this.email = "";
		this.id = 0

		return this;
	}

	public async initialize(user: Users) {
		const isUserValid = await UserSchema.isValid(user);

		if (!isUserValid) {
			throw new Error("Cannot initialize DTO, because of invalid input");
		}
	
		this.username = user.username;
		this.email = user.email!;
		this.id = user.id;
	}

}
