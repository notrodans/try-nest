import { Prop } from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"
import { Types } from "mongoose"

export interface ReviewModel extends Base {}
export class ReviewModel extends TimeStamps {
	@Prop()
	name: string

	@Prop()
	title: string

	@Prop()
	description: string

	@Prop()
	rating: number

	@Prop()
	productId: Types.ObjectId
}
