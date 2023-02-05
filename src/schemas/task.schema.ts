import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Timestamp } from "rxjs";

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
    @Prop({ required: true, type: String })
    name: string;

    @Prop({ type: String })
    description: string | undefined;

    @Prop({ type: Date })
    dueDate: string | undefined;

    @Prop({ required: true, type: String })
    status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);