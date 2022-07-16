import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
    @ApiProperty()
    @IsString({ message: 'Name is not a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @IsEmail({}, { message: 'Email is not valid' })
    email: string;

    @ApiProperty()
    @IsString({ message: 'Password is not a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    password: string;

    @ApiProperty()
    @IsString({ message: 'Name is not a string' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty()
    @IsString({ message: 'Username is not a string' })
    @IsNotEmpty({ message: 'Username is required' })
    username: string;
}
