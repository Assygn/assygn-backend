import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, type: String })
    firstName: string;

    @Prop({ required: true, type: String })
    lastName: string;

    @Prop({
        unique: true,
        required: true,
        type: String
    })
    username: string;

    @Prop({
        required: true,
        select: false,
        type: String
    })
    password: string | undefined;
}

export const UserSchema = SchemaFactory.createForClass(User);