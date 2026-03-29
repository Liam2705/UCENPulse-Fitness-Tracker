import { useState } from 'react';
import '../../styles/Dashboard.css';
import settings from '../../assets/images/settings.svg';
import account from '../../assets/images/account.svg';
import SettingsModal from '../../utils/SettingsModal';
import { logout } from '../../utils/auth'
import { useNavigate } from 'react-router-dom'
import { LogoutOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import useUser from '../../hooks/useUser'

const AccountMenu = ({ onGoalsUpdated }) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const user = useUser()

    return (
        <>
            <div className="account-menu">
                <h3 className="menu-title">User</h3>
                <div className="account-info">
                    <img src={account} alt="account-icon" />
                    <p className="menu-text">{user?.firstName} {user?.lastName}</p>
                    <div className="settings">
                        <Tooltip title="Settings">
                            <button className="settings-button" onClick={() => setOpen(true)}>
                                <img src={settings} alt='settings' className="menu-icon" />
                            </button>
                        </Tooltip>
                        <Tooltip title="Logout">
                            <IconButton
                                onClick={() => logout(navigate)}
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: '8px',
                                    color: '#838383',
                                    '&:hover': { backgroundColor: 'var(--accent-colour)' }
                                }}
                            >
                                <LogoutOutlined sx={{ fontSize: 20 }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <SettingsModal
                open={open}
                handleClose={() => {
                    setOpen(false)
                    onGoalsUpdated?.()
                }}
            />
        </>
    )
}

export default AccountMenu