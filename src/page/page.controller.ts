import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common"
import { FindPageDto } from "./dto/find-page.dto"
import { PageModel } from "./page.model"

@Controller("page")
export class PageController {
	@Post("create")
	async create(@Body() dto: Omit<PageModel, "_id">) {}

	@Delete(":id")
	async delete(@Param("id") id: string) {}

	@Get("byProduct/:productid")
	async getByProduct(@Param("productId") productId: string) {}

	@Patch(":id")
	async patch(@Param("id") id: string, @Body() dto: PageModel) {}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindPageDto) {}
}
