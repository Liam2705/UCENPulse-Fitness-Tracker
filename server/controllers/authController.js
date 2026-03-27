import pkg from '@prisma/client'
const { PrismaClient } = pkg
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    try {
        const hashed = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: { firstName, lastName, email, password: hashed }
        })
        res.status(201).json({ message: 'User created', userId: user.id })

    } catch (error) {
        res.status(400).json({ error: 'Email already in use' })
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        // Lookup user by email
        const user = prisma.user.findUnique({ where: { email } })
        if (!user) return res.status(401).json({ error: 'Invalid Credentials' })

        // Compare hashed password with the one entered on login
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(401).json({ error: 'Invalid Credentials' })

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } })

    } catch (error) {
        res.status(500).json({ error: err.message })
    }
}

export const logout = (req, res) => {
    res.json({ message: 'Logged out successfully' })
}