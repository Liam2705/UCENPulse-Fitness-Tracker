import request from 'supertest'
import { app } from '../../server.js'

let token

beforeAll(async () => {
    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'metrics@example.com', password: 'password123' })
        console.log('Status:', res.status, 'Body:', res.body)
        token = res.body.token
})

describe('Metrics Routes', () => {
    let metricsId

    it('should log daily metrics', async () => {
        const res = await request(app)
            .post('/api/metrics')
            .set('Authorization', `Bearer ${token}`)
            .send({ steps: 8000, waterIntake: 2.5, sleepHours: 7.5, caloriesBurned: 450 })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('id')
        metricsId = res.body.id
    })

    it('should get all metrics', async () => {
        const res = await request(app)
            .get('/api/metrics')
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
    })

    it('should reject negative steps', async () => {
        const res = await request(app)
            .post('/api/metrics')
            .set('Authorization', `Bearer ${token}`)
            .send({ steps: -100 })

        expect(res.status).toBe(400)
    })

    it('should reject sleep hours over 24', async () => {
        const res = await request(app)
            .post('/api/metrics')
            .set('Authorization', `Bearer ${token}`)
            .send({ sleepHours: 25 })

        expect(res.status).toBe(400)
    })

    it('should delete a metrics entry', async () => {
        const res = await request(app)
            .delete(`/api/metrics/${metricsId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
    })
})