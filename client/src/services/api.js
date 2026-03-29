import { getToken } from '../utils/auth'

const headers = () => {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
    }
}

/*
    METRICS
*/
export const getMetrics = () => {
    return fetch(`/api/metrics`, {
        headers: headers()
    }).then(async r => {
        const json = await r.json()
        if (!r.ok) throw json
        return json
    })
}

export const createMetric = (data) => {
    return fetch('/api/metrics', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(async r => {
        const json = await r.json()
        if (!r.ok) throw json
        return json
    })
}

export const deleteMetric = (id) => {
    return fetch(`/api/metrics/${id}`, {
        method: 'DELETE',
        headers: headers(),
    }).then(async r => {
        const json = await r.json()
        if (!r.ok) throw json
        return json
    })
}

export const updateMetric = (id, data) => {
    return fetch(`/api/metrics/${id}`, {
        method: 'DELETE',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(async r => {
        const json = await r.json()
        if (!r.ok) throw json
        return json
    })
}

/*
    ACTIVITIES
*/
export const getActivities = () => {
    return fetch(`/api/activities`, {
        headers: headers()
    }).then(async r => {
        const json = await r.json()
        if (!r.ok) throw json
        return json
    })
}
export const createActivity = (data) => {
    return fetch(`/api/activities`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(async r => {
        const json = await r.json()
        if (!r.ok) throw json
        return json
    })
}
export const updateActivity = (id, data) => {
    return fetch(`/api/activities/${id}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(async r => {
        const json = await r.json()
        if (!r.ok) throw json
        return json
    })
}
export const deleteActivity = (id) => {
    return fetch(`/api/activities/${id}`, {
        method: 'DELETE',
        headers: headers()
    }).then(async r => {
        const json = await r.json()
        if (!r.ok) throw json
        return json
    })
}

/*
    GOALS
*/
export const getGoals = () => {
    return fetch('/api/goals', {
        headers: headers(),
    }).then(async r => {
        const json = await r.json()
        if (!r.ok) throw json
        return json
    })
}

export const updateGoals = (data) => {
    return fetch(`/api/goals`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(async r => {
        const json = await r.json()
        if (!r.ok) throw json
        return json
    })
}

/**
 * WEATHER API
 */

export const getWeather = (lat, lon) => {
    const params = lat && lon ? `?lat=${lat}&lon=${lon}` : ''
    return fetch(`/api/weather${params}`, {
        headers: headers()
    }).then(async r => {
        const json = await r.json()
        if (!r.ok) throw json
        return json
    })
}