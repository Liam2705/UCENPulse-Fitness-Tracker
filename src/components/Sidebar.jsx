function Sidebar() {
    return (
        <div className="sidebar">
            <image src="logo.svg" alt="Logo" className="logo" />
            <ul>
                <li>Home</li>
                <li>Profile</li>
                <li>Settings</li>
            </ul>
        </div>
    );
}

export {Sidebar};