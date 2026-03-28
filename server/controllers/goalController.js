import prisma from '../config/db.js'

export const getGoals = async (req, res) => {
    try {
        const goals = await prisma.userGoal.upsert({
            where: { userId: req.user.userId },
            update: {},
            create: { userId: req.user.userId }  // creates with schema defaults if none exist
        })
        res.json(goals)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

export const updateGoals = async (req, res) => {
    const goals = await prisma.userGoal.upsert({
        where: { userId: req.user.userId },
        update: req.body,
        create: { userId: req.user.userId, ...req.body }
    })
    res.json(goals)
}