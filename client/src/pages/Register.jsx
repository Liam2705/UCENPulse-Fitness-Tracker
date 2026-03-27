import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton,
    Divider
} from '@mui/material'
import {
    Visibility,
    VisibilityOff,
    EmailOutlined,
    LockOutlined,
    PersonOutlined
} from '@mui/icons-material'
import toast from 'react-hot-toast'

export default function Register() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (form.password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setLoading(true)

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                    password: form.password
                })
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'Something went wrong')
                return
            }

            toast.success('Account created successfully! 🎉')
            navigate('/login')

        } catch (error) {
            console.error(error);
            setError('Unable to connect to server')
            toast.error('Unable to connect to server')
        } finally {
            setLoading(false)
        }
    }

    const fieldStyles = {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': { borderColor: '#214984' }
        },
        '& .MuiInputLabel-root.Mui-focused': { color: '#214984' }
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #214984 0%, #1a3a6b 100%)',
                p: 2
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    maxWidth: 900,
                    minHeight: { md: 580 },
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.3)'
                }}
            >
                {/* left panel - hides on mobile */}
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        background: 'linear-gradient(160deg, #1a3a6b 0%, #214984 60%, #2d62b8 100%)',
                        p: 6,
                        gap: 2
                    }}
                >
                    <Typography variant="h3" fontWeight="800" color="white" lineHeight={1.2}>
                        UCENPulse
                    </Typography>
                    <Divider sx={{ width: 48, borderColor: 'rgba(255,255,255,0.4)', borderWidth: 2 }} />
                    <Typography variant="body1" color="rgba(255,255,255,0.75)" mt={1}>
                        Join thousands of users tracking their health and activity with UCENPulse.
                    </Typography>

                    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {[
                            'Free to get started',
                            'Track unlimited activities',
                            'Visual health analytics',
                            'Secure & private'
                        ].map((item) => (
                            <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255,255,255,0.8)'
                                    }}
                                />
                                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                                    {item}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Right Panel - Register Form */}
                <Paper
                    elevation={0}
                    sx={{
                        flex: { xs: 1, md: 'none' },
                        width: { md: 420 },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: { xs: 3, sm: 5 },
                        borderRadius: { xs: 4, md: 0 },
                    }}
                >
                    {/* Mobile logo */}
                    <Typography
                        variant="h5"
                        fontWeight="800"
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            color: '#214984',
                            mb: 3,
                            textAlign: 'center'
                        }}
                    >
                        UCENPulse
                    </Typography>

                    <Typography variant="h5" fontWeight="700" color="text.primary">
                        Create an account
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={0.5} mb={3}>
                        Fill in your details to get started
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleRegister}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                fullWidth
                                required
                                value={form.firstName}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonOutlined sx={{ color: '#214984' }} />
                                        </InputAdornment>
                                    )
                                }}
                                sx={fieldStyles}
                            />
                            <TextField
                                label="Last Name"
                                name="lastName"
                                fullWidth
                                required
                                value={form.lastName}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">

                                        </InputAdornment>
                                    )
                                }}
                                sx={fieldStyles}
                            />
                        </Box>

                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            fullWidth
                            required
                            value={form.email}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlined sx={{ color: '#214984' }} />
                                    </InputAdornment>
                                )
                            }}
                            sx={fieldStyles}
                        />

                        <TextField
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            required
                            value={form.password}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined sx={{ color: '#214984' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={fieldStyles}
                        />

                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            type={showConfirm ? 'text' : 'password'}
                            fullWidth
                            required
                            value={form.confirmPassword}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined sx={{ color: '#214984' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                                            {showConfirm ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={fieldStyles}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={loading}
                            sx={{
                                mt: 1,
                                py: 1.5,
                                backgroundColor: '#214984',
                                borderRadius: 2,
                                fontWeight: 700,
                                fontSize: '1rem',
                                textTransform: 'none',
                                boxShadow: '0 6px 10px rgba(33,73,132,0.5)',
                                '&:hover': {
                                    backgroundColor: '#1a3a6b',
                                    boxShadow: '0 6px 20px rgba(33,73,132,0.5)'
                                }
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
                        </Button>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="body2" textAlign="center" color="text.secondary">
                        Already have an account?{' '}
                        <Typography
                            component="span"
                            variant="body2"
                            sx={{
                                color: '#214984',
                                fontWeight: 600,
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                            onClick={() => navigate('/login')}
                        >
                            Sign in
                        </Typography>
                    </Typography>
                </Paper>
            </Box>
        </Box>
    )
}