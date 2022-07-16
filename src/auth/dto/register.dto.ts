import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email is invalid' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
}
