import Date from '../../utils/Date.jsx';
import WeatherCard from '../cards/WeatherCard.jsx'

function Header({ pageTitle }) {
    return (
        <header className="header">
            <h1 className="header-text">{pageTitle}</h1>
            <WeatherCard />
            <Date />
        </header>
    );
}

export { Header };