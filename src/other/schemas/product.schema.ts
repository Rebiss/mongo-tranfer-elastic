import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Document from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({
    es_indexed: true,
  })
  name: string;

  @Prop()
  price: number;

  @Prop()
  isComplet: boolean;

  @Prop({
    es_indexed: true,
  })
  llc: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
