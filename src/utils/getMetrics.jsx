import React from 'react'

const getMetrics = (metric) => {

    const metricsData = JSON.parse(localStorage.getItem('healthMetrics'));
    if (metricsData == null) { return 0 };
    return (metricsData[metric]);
}

export default getMetrics