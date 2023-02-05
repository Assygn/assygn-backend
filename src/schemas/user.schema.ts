import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({
        unique: true,
        required: true
    })
    username: string;

    @Prop({
        required: true,
        select: false,
        type: "string"
    })
    password: string | undefined;
}

export const UserSchema = SchemaFactory.createForClass(User);