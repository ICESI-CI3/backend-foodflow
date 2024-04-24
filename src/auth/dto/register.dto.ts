import { Transform } from 'class-transformer';
import { IsEmail, IsString, Min, MinLength, IsIn } from 'class-validator';
import { ValidRoles } from '../interfaces/valid-roles';
export class RegisterDto {

  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @IsString({ each: true })
  @IsIn(Object.values(ValidRoles), { each: true })
  role: string[];
  
}
