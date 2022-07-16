import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'longtext' })
    password: string;
    @BeforeInsert()
    lowwerCaseEmail() {
        this.email = this.email.toLowerCase();
    }
}
