import { Prop } from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class HhData {
	@Prop()
	count: number

	@Prop()
	juniorSalary: number

	@Prop()
	middleSalary: number

	@Prop()
	seniorSalary: number
}

export class PageAdvantage {
	@Prop()
	title: string

	@Prop()
	description: string
}

export interface PageModel extends Base {}
export class PageModel extends TimeStamps {
	@Prop({ enum: TopLevelCategory })
	firstLevelCategory: TopLevelCategory

	@Prop()
	secondCategory: string

	@Prop({ unique: true })
	alias: string

	@Prop()
	title: string

	@Prop()
	category: string

	@Prop({ type: () => HhData })
	hh?: HhData

	@Prop({ type: () => [PageAdvantage] })
	advantages: PageAdvantage[]

	@Prop()
	seoText: string

	@Prop()
	tagsTitle: string

	@Prop({ type: () => [String] })
	tags: string[]
}
