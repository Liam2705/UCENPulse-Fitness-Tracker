import request from 'supertest'
import { app } from '../../server.js'

let token
let activityId

beforeAll(async () => {

    await request(app)
        .post('/api/auth/register')
        .send({
            firstName: 'Activity',
            lastName: 'User',
            email: 'activitytest@example.com',
            password: 'password123'
        })


    const res = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'activitytest@example.com',
            password: 'password123'
        })

    token = res.body.token
})

describe('POST /api/activities', () => {
    it('should create an activity and return 201', async () => {
        const res = await request(app)
            .post('/api/activities')
            .set('Authorization', `Bearer ${token}`)
            .send({ type: 'Running', duration: 30, notes: 'Morning run' })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body.type).toBe('Running')
        expect(res.body.duration).toBe(30)
        activityId = res.body.id
    })

    it('should return 400 if type is missing', async () => {
        const res = await request(app)
            .post('/api/activities')
            .set('Authorization', `Bearer ${token}`)
            .send({ duration: 30 })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
    })

    it('should return 400 if duration is out of range', async () => {
        const res = await request(app)
            .post('/api/activities')
            .set('Authorization', `Bearer ${token}`)
            .send({ type: 'Running', duration: 9999 })

        expect(res.status).toBe(400)
    })

    it('should return 401 without a token', async () => {
        const res = await request(app)
            .post('/api/activities')
            .send({ type: 'Running', duration: 30 })

        expect(res.status).toBe(401)
    })
})

describe('GET /api/activities', () => {
    it('should return all activities for the user', async () => {
        const res = await request(app)
            .get('/api/activities')
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body.length).toBeGreaterThan(0)
    })

    it('should return 401 without a token', async () => {
        const res = await request(app).get('/api/activities')
        expect(res.status).toBe(401)
    })
})

describe('PUT /api/activities/:id', () => {
    it('should update an activity', async () => {
        const res = await request(app)
            .put(`/api/activities/${activityId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ type: 'Cycling', duration: 45, notes: 'Updated' })

        expect(res.status).toBe(200)
        expect(res.body.type).toBe('Cycling')
        expect(res.body.duration).toBe(45)
    })

    it('should return 404 for a non-existent activity', async () => {
        const res = await request(app)
            .put('/api/activities/nonexistent-id-999')
            .set('Authorization', `Bearer ${token}`)
            .send({ type: 'Running', duration: 30 })

        expect(res.status).toBe(404)
    })
})

describe('DELETE /api/activities/:id', () => {
    it('should delete an activity', async () => {
        const res = await request(app)
            .delete(`/api/activities/${activityId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
    })

    it('should return 404 for an already deleted activity', async () => {
        const res = await request(app)
            .delete(`/api/activities/${activityId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(404)
    })
})