import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { from, Observable, switchMap, map } from 'rxjs';
import { UserService } from 'src/user/service/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/model/user.interface';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
    ) {}
    //hash password
    hashPassword(password: string): Observable<string> {
        return from(bcrypt.hash(password, 10));
    }
    //compare password
    comparePassword(password: string, hash: string): Observable<boolean> {
        return from(bcrypt.compare(password, hash));
    }
    //generate jwt

    //validate user return Observable<User> or null
    validateUser(loginDto: LoginDto): Observable<User> {
        return this.userService.findOneByUsername(loginDto.username).pipe(
            switchMap((user) => {
                return this.comparePassword(loginDto.password, user.password).pipe(
                    switchMap((isValid) => {
                        if (isValid) {
                            return from(
                                this.userService.findOneByUsername(loginDto.username).pipe(
                                    map((user) => {
                                        delete user.password;
                                        return user;
                                    }),
                                ),
                            );
                        } else {
                            return null;
                        }
                    }),
                );
            }),
        );
    }
    login(loginDto: LoginDto): Observable<User> {
        //return user from validateUser
        return this.validateUser(loginDto);
    }
}
