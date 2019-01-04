// defines what happened or the actions that happens

// action types
export const ADD_PROJECT = 'ADD_PROJECT'
export const REMOVE_PROJECT = 'REMOVE_PROJECT'

export const ADD_GOAL = 'ADD_GOAL'
export const REMOVE_GOAL = 'REMOVE_GOAL'
export const CLEAR_PROJECT_GOAL = 'CLEAR_PROJECT_GOAL'

export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const CLEAR_GOAL_TASK = 'CLEAR_GOAL_TASK'

// action creators
export function addProject(name, color) {
    return {
        type: ADD_PROJECT,
        name,
        color
    }
}

export function removeProject(Id) {
    return {
        type: REMOVE_PROJECT,
        Id
    }
}

export function addGoal(name, due, projectId) {
    return {
        type: ADD_GOAL,
        name,
        due,
        projectId
    }
}

export function removeGoal(Id) {
    return {
        type: REMOVE_GOAL,
        Id
    }
}

export function clearProjectGoal(projectId) {
    return {
        type: CLEAR_PROJECT_GOAL,
        projectId
    }
}

export function addTask(name, due, goalId) {
    return {
        type: ADD_TASK,
        name,
        due,
        goalId
    }
}

export function removeTask(Id) {
    return {
        type: REMOVE_TASK,
        Id
    }
}

export function clearGoalTask(goalId) {
    return {
        type: CLEAR_GOAL_TASK,
        goalId
    }
}