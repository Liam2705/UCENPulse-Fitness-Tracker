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
    }).then(res => res.json())
}

export const createMetric = (data) => {
    return fetch('/api/metrics', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(res => res.json())
}

export const deleteMetric = (id) => {
    return fetch(`/api/metrics/${id}`, {
        method: 'DELETE',
        headers: headers(),
    }).then(res => res.json())
}

export const updateMetric = (id, data) => {
    return fetch(`/api/metrics/${id}`, {
        method: 'DELETE',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(res => res.json())
}

/*
    ACTIVITIES
*/ 
export const getActivities = () => {
    return fetch(`api/activities`, {
        headers: headers()
    }).then(r => r.json())
}
export const createActivity = (data) => {
    return fetch(`api/activities`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(r => r.json())
}
export const updateActivity = (id, data) => {
    return fetch(`api/activities/${id}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(r => r.json())
}
export const deleteActivity = (id) => {
    return fetch(`api/activities/${id}`, {
        method: 'DELETE',
        headers: headers()
    }).then(r => r.json())
}

/*
    GOALS
*/ 
export const getGoals = () => {
    return fetch('/api/goals', {
        headers: headers(),
    }).then(res => res.json())
}

export const updateGoals = (id, data) => {
    return fetch(`/api/goals/${id}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(res => res.json())
}