import { Test, TestingModule } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import * as request from "supertest"
import { AppModule } from "./../src/app.module"
import { CreateReviewDto } from "src/review/dto/create-review.dto"
import { Types } from "mongoose"

const productId = new Types.ObjectId().toHexString()

const testDto: CreateReviewDto = {
	name: "Тст",
	title: "Заголовок",
	description: "Описание товара",
	rating: 5,
	productId
}

describe("AppController (e2e)", () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it("/review/create (POST)", () => {
		return request(app.getHttpServer())
			.post("/")
			.send(testDto)
			.expect(201)
			.expect("Hello World!")
	})
})
