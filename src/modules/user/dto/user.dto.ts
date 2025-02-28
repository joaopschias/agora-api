export class CreateUserDTO {
  name!: string;
  email!: string;
  password!: string;
}

export class UpdateUserDTO {
  name?: string;
  email?: string;
}

export class UserResponseDTO {
  id!: number;
  name!: string;
  email!: string;
  email_verified!: boolean;
  created_at!: Date;
  updated_at!: Date;
}
