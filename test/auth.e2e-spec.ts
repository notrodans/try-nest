import { Test, TestingModule } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import * as request from "supertest"
import { AppModule } from "./../src/app.module"
import { disconnect } from "mongoose"
import {
	USER_NOT_FOUND_ERROR,
	WRONG_PASSWORD_ERROR
} from "../src/auth/auth.constants"
import { AuthDto } from "../src/auth/dto/auth.dto"

const loginDto: AuthDto = {
	login: "notrodans@gmail.com",
	password: "onatnegra"
}

describe("AuthController (e2e)", () => {
	let app: INestApplication
	let token: string

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it("/auth/login (POST) — success", async () => {
		return request(app.getHttpServer())
			.post("/auth/login")
			.set("Authorization", "Bearer " + token)
			.send(loginDto)
			.expect(200)
			.then(({ body }) => {
				expect(body.access_token).toBeDefined()
			})
	})

	it("/auth/login (POST) — fail login", () => {
		return request(app.getHttpServer())
			.post("/auth/login")
			.send({ ...loginDto, login: "notrodans@gmai.com" })
			.expect(401, {
				statusCode: 401,
				message: USER_NOT_FOUND_ERROR,
				error: "Unauthorized"
			})
	})

	it("/auth/login (POST) — fail password", () => {
		return request(app.getHttpServer())
			.post("/auth/login")
			.send({ ...loginDto, password: "notrodans" })
			.expect(401, {
				statusCode: 401,
				message: WRONG_PASSWORD_ERROR,
				error: "Unauthorized"
			})
	})

	afterAll(() => {
		disconnect()
	})
})
