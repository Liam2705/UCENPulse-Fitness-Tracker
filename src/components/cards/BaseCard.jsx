import { Card, CardContent, Typography, LinearProgress } from '@mui/material';

const BaseCard = ({ title, value, progress, color, icon}) => {
    return (
        <Card
            sx={{
                borderRadius: 2,
                backgroundColor: color,
                color: 'white',
                padding: 2,
                position: 'relative',
                height: '190px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <CardContent>
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                    {icon}
                    {title}
                </Typography>
                <Typography variant="h4" component="div">
                    {value}
                </Typography>
                <LinearProgress 
                    variant="determinate" 
                    value={progress}
                    sx={{ marginTop: 2, height: '5px', backgroundColor: 'rgba(255, 255, 255, 0.3)' }} 
                />
                <Typography variant="body2" color="white" sx={{ marginTop: 1 }}>
                    {`${(progress).toFixed(0)}% of your goals`}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BaseCard;
