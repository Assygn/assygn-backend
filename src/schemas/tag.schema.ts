import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TagDocument = Tag & Document;

@Schema({ timestamps: true })
export class Tag {
    @Prop({ required: true, type: String })
    name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);