const request = require("supertest");
const app = require("..");

describe("searchController",  () => {
    describe("getSearch", () => {
        it("should call res.status(201) and res.json with data search", async () => {
            const res = await request(app)
                .get("/api/v1/search")
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("data");
          });      
    })
    describe("addSearch", () => {
        it("should call res.status(403) and res.json with forbidden", async () => {
            const code = "TEST";
            const city = "TEST";
            const airport = "TESTING";

            const res = await request(app)
                .post("/api/v1/admin/search")
                .set("Authorization", "Bearer 12345")
                .set("Content-Type", "application/json")
                .send({
                    code: code,
                    city: city,
                    airport: airport
                })
            expect(res.statusCode).toEqual(403);
            expect(res.body).toHaveProperty("message");
        });
    })
})