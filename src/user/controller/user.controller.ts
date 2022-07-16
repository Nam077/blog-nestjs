import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        if (isNaN(+id)) {
            throw new HttpException('Id must be number', HttpStatus.BAD_REQUEST);
        }
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        if (isNaN(+id)) {
            throw new HttpException('Id must be number', HttpStatus.BAD_REQUEST);
        }
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        //check id is number and throw HttpException if not (id must be number)
        if (isNaN(+id)) {
            throw new HttpException('Id must be number', HttpStatus.BAD_REQUEST);
        }
        return this.userService.remove(+id);
    }
}
