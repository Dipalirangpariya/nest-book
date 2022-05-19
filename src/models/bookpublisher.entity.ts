
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm';
import { bookdetails } from './bookDetails.entity';

@Entity('BookPublisher')
export class bookPublisher {

    @PrimaryGeneratedColumn()
    Book_Publisher_Id: number;

    @Column({unique:true})
    Book_Publisher_Name: string

    @OneToMany(() => bookdetails, bookpublisher => bookpublisher.Book_Publisher_Id)
    book: bookdetails[];
}





