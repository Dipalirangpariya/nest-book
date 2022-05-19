import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { bookdetails } from "./bookDetails.entity";


@Entity('bookcatogery')
export class bookcatogery {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public Book_Category_Id: number;

    @Column({ unique: true })
    Book_Category_Name: string;


    @Column({ type: 'character varying' })
    Book_Description: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    public updated_at: Date;

    @OneToMany(type => bookdetails, bookdetails => bookdetails.Book_Category_Id)
    Book_Details: bookdetails[];

}