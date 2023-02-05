import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type SchemaDocument = Space & Document;

@Schema({ timestamps: true })
export class Space {
    @Prop({ required: true, type: String })
    name: string;

    @Prop({ type: String })
    description: string;
}

export const SpaceSchema = SchemaFactory.createForClass(Space);