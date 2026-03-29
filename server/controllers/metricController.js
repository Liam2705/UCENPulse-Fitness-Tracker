import prisma from "../config/db.js";

export const createMetric = async (req, res) => {
    const { steps, waterIntake, caloriesBurned, sleepHours, date } = req.body
    const targetDate = date ? new Date(date) : new Date()
    const dateOnly = new Date(targetDate.toISOString().split('T')[0])

    try {
        const metric = await prisma.healthMetric.upsert({
            where: {
                userId_date: {
                    userId: req.user.userId,
                    date: dateOnly
                }
            },
            update: {
                steps: steps ? parseInt(steps) : undefined,
                waterIntake: waterIntake ? parseFloat(waterIntake) : undefined,
                caloriesBurned: caloriesBurned ? parseInt(caloriesBurned) : undefined,
                sleepHours: sleepHours ? parseFloat(sleepHours) : undefined,
            },
            create: {
                steps: steps ? parseInt(steps) : null,
                waterIntake: waterIntake ? parseFloat(waterIntake) : null,
                caloriesBurned: caloriesBurned ? parseInt(caloriesBurned) : null,
                sleepHours: sleepHours ? parseFloat(sleepHours) : null,
                date: dateOnly,
                userId: req.user.userId
            }
        })
        res.status(201).json(metric)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getMetric = async (req, res) => {
    try {
        const metrics = await prisma.healthMetric.findMany({
            where: { userId: req.user.userId },
            orderBy: { date: 'desc' }
        })
        res.json(metrics)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateMetric = async (req, res) => {
    const { id } = req.params
    const { steps, waterIntake, caloriesBurned, sleepHours, date } = req.body
    try {
        const existing = await prisma.healthMetric.findUnique({ where: { id } })

        if (!existing || existing.userId !== req.user.userId)
            return res.status(404).json({ error: 'Metric not found' })

        const updated = await prisma.healthMetric.update({
            where: { id },
            data: {
                steps: steps ? parseInt(steps) : null,
                waterIntake: waterIntake ? parseFloat(waterIntake) : null,
                caloriesBurned: caloriesBurned ? parseInt(caloriesBurned) : null,
                sleepHours: sleepHours ? parseFloat(sleepHours) : null,
                date: date ? new Date(date) : existing.date
            }
        })
        res.json(updated)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


export const deleteMetric = async (req, res) => {
    const { id } = req.params
    try {
        const existing = await prisma.healthMetric.findUnique({ where: { id } })

        if (!existing || existing.userId !== req.user.userId)
            return res.status(404).json({ error: 'Metric not found' })

        await prisma.healthMetric.delete({ where: { id } })
        res.json({ message: 'Metric deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}