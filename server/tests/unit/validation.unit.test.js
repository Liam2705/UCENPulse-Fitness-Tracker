import { validationResult } from 'express-validator'
import { activityValidation } from '../../routes/activityRoutes'

const runValidation = async (body) => {
  const req = { body }
  for (const validator of activityValidation) {
    await validator.run(req)
  }
  return validationResult(req)
}

describe('Activity Validation', () => {
  it('should pass with valid data', async () => {
    const result = await runValidation({ type: 'Running', duration: 30 })
    expect(result.isEmpty()).toBe(true)
  })

  it('should fail if type is missing', async () => {
    const result = await runValidation({ duration: 30 })
    expect(result.isEmpty()).toBe(false)
    expect(result.array()[0].path).toBe('type')
  })

  it('should fail if duration exceeds 1440', async () => {
    const result = await runValidation({ type: 'Running', duration: 9999 })
    expect(result.isEmpty()).toBe(false)
    expect(result.array()[0].path).toBe('duration')
  })

  it('should pass with optional notes field', async () => {
    const result = await runValidation({ type: 'Gym', duration: 45, notes: 'Leg day' })
    expect(result.isEmpty()).toBe(true)
  })
})