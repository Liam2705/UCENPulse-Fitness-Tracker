import prisma from "../config/db.js"

export const createActivity = async (req, res) => {
    const { type, duration, calories, notes, date } = req.body
    try {
        const activity = await prisma.activity.create({
            data: {
                type,
                duration: parseInt(duration),
                calories: calories ? parseInt(calories) : null,
                notes: notes || null,
                date: date ? new Date(date) : new Date(),
                userId: req.user.userId
            }
        })
        res.status(201).json(activity)
    } catch (error) {
        next(error)
    }
}

export const getActivity = async (req, res) => {
    try {
        const activities = await prisma.activity.findMany({
            where: { userId: req.user.userId },
            orderBy: { date: 'desc' }
        })
        res.json(activities)
    } catch (error) {
        next(error)
    }
}

export const updateActivity = async (req, res) => {
  const { id } = req.params
  const { type, duration, calories, notes, date } = req.body
  try {
    const existing = await prisma.activity.findUnique({ where: { id } })

    if (!existing || existing.userId !== req.user.userId)
      return res.status(404).json({ error: 'Activity not found' })

    const updated = await prisma.activity.update({
      where: { id },
      data: {
        type,
        duration: parseInt(duration),
        calories: calories ? parseInt(calories) : null,
        notes: notes || null,
        date: date ? new Date(date) : existing.date
      }
    })
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

export const deleteActivity = async (req, res) => {
  const { id } = req.params
  try {
    const existing = await prisma.activity.findUnique({ where: { id } })

    if (!existing || existing.userId !== req.user.userId)
      return res.status(404).json({ error: 'Activity not found' })

    await prisma.activity.delete({ where: { id } })
    res.json({ message: 'Activity deleted successfully' })
  } catch (error) {
    next(error)
  }
}