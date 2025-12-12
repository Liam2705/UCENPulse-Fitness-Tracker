const getMetrics = (metric) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date
    const metricsData = JSON.parse(localStorage.getItem('healthMetrics'));
    
    if (!metricsData) {
        return 0; // Return 0 if no metrics are found
    }
    
    // Find today's metrics entry
    const todayMetrics = metricsData.find(data => data.date === currentDate);
    
    // Return the requested metric for today if it exists, otherwise return 0
    return todayMetrics ? todayMetrics[metric] || 0 : 0;
}

export default getMetrics;
