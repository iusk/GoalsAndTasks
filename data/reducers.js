// updates state according to the actions
import { combineReducers } from 'redux'

import { 
    ADD_PROJECT, REMOVE_PROJECT,
    ADD_GOAL, REMOVE_GOAL, CLEAR_PROJECT_GOAL,
    ADD_TASK, REMOVE_TASK, CLEAR_GOAL_TASK
} from './action'

let projectCounter = 1
let goalCounter = 1
let taskCounter = 1

function manageProjects(state = [], action) {
    switch(action.type) {
        case ADD_PROJECT:
            return [
                ...state,
                {
                    Id: projectCounter++,
                    name: action.name,
                    color: action.color
                }
            ]
        case REMOVE_PROJECT:
            return state.filter(state => state.Id !== action.Id)
        default:
            return state
    }
}

function manageGoals(state = [], action) {
    switch(action.type) {
        case ADD_GOAL:
            return [
                ...state,
                {
                    Id: goalCounter++,
                    name: action.name,
                    due: action.due,
                    projectId: action.projectId,
                    completed: false
                }
            ]
        case REMOVE_GOAL:
            return state.filter(state => state.Id !== action.Id)
        case CLEAR_PROJECT_GOAL:
            return state.filter(state => state.projectId !== action.projectId)
        default:
            return state
    }
}

function manageTasks(state = [], action) {
    switch(action.type) {
        case ADD_TASK:
            return [
                ...state,
                {
                    Id: taskCounter++,
                    name: action.name,
                    due: action.due,
                    goalId: action.goalId,
                    completed: false
                }
            ]
        case REMOVE_TASK:
            return state.filter(state => state.Id !== action.Id)
        case CLEAR_GOAL_TASK:
            return state.filter(state => state.goalId !== action.goalId)
        default:
            return state
    }
}

const combinedReducers = combineReducers({
    projects: manageProjects,
    goals: manageGoals,
    tasks: manageTasks
})

export default combinedReducers