const request = require('supertest');
const app = require('./app'); // your express app

describe('GET /add', () => {

    it('should return sum of two numbers', async () => {
        const res = await request(app)
        .get('/add')
        .send({ num1: 5, num2: 3 });

        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe(8);
    });

    it('should return error if inputs are not numbers', async () => {
        const res = await request(app)
        .get('/add')
        .send({ num1: "a", num2: 3 });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe(
        "Invalid input. Both num1 and num2 should be numbers."
        );
    });

});