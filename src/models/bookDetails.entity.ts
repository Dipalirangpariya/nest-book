import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { bookcatogery } from "./bookCategory.entity";
import { bookPublisher } from "./bookpublisher.entity";
import { users } from "./user.entity";

@Entity('bookdetails')

export class bookdetails {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public Book_id?: number;

    @Column({ unique: true })
    Book_Name: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    bookCreated_at: Date;

    @UpdateDateColumn({
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    bookUpdated_at: Date;


    @ManyToOne(() => bookcatogery,( bookcatogery:bookcatogery) => bookcatogery.Book_Category_Id, { onDelete: 'SET NULL' })
    Book_Category_Id: string;


    @ManyToOne(()=> bookPublisher, (bookpublisher:bookPublisher) => bookpublisher.Book_Publisher_Id)
    Book_Publisher_Id:string;

    @ManyToOne(() => users, (bookuser: users) => bookuser.User_id, { onDelete: 'SET NULL' })
    bookUser_id: string;

}