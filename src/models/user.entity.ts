import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export type UserRoleType = "admin" | "user";
@Entity('users')
export class users {
    @PrimaryGeneratedColumn('uuid')
    public User_id: string;

    @Column({ type: 'character varying' })
    User_name: string;

    @Column({ unique: true })
    User_Emailid: string;

    @Column({ type: 'character varying' })
    User_password: string;

    @Column({ default: false })
    Confirmed: boolean;

    @Column({ type: 'character varying' })
    Contact_number: string;


    @Column({
        type: "enum",
        enum: ["admin", "user"],
        default: "user"
    })
    role: UserRoleType;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    public updated_at: Date;


}
