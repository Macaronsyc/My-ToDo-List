const INPUT_CHANGED = 'input changed'
const INPUT_PRESS_ENTER = 'input press enter'
const CHECK_CHANGED = 'check changed'
const DELETE_ITEM = 'delete item'
const EDIT_FINISHED = 'edit finished'
const INIT = 'initialize'

export function initialize(init) {
	return {
		type: INIT,
		payload: init,
	}
}
export function inputChanged(newToDo) {
	return {
		type: INPUT_CHANGED,
		payload: newToDo,
	}
}

export function inputPressEnter(newToDo) {
	return {
		type: INPUT_PRESS_ENTER,
		payload: newToDo,
	}
}

export function checkBoxChanged(id, isChecked) {
	return {
		type: CHECK_CHANGED,
		payload: { id, isChecked },
	}
}

export function deleteItem(id) {
	return {
		type: DELETE_ITEM,
		payload: id,
	}
}

export function editFinished(id, work) {
	return {
		type: EDIT_FINISHED,
		payload: { id, work },
	}
}

const initialState = {
	newToDo: '',
	_toDoList: [],
}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case INIT:
			return Object.assign({}, state, { _toDoList: action.payload })
		case INPUT_CHANGED:
			return Object.assign({}, state, { newToDo: action.payload })
		case INPUT_PRESS_ENTER:
			return Object.assign({}, state, {
				_toDoList: [
					{ work: action.payload.work, isDone: false, id: action.payload.id },
					...state._toDoList,
				],
				newToDo: '',
			})

		case CHECK_CHANGED:
			return Object.assign({}, state, {
				_toDoList: state._toDoList.map((item) => {
					if (Number(item.id) === Number(action.payload.id)) {
						return Object.assign(item, {
							isDone: action.payload.isChecked,
						})
					} else {
						return item
					}
				}),
			})
		case DELETE_ITEM:
			return Object.assign({}, state, {
				_toDoList: state._toDoList.filter((item) => {
					if (Number(item.id) !== Number(action.payload)) {
						return true
					} else {
						return false
					}
				}),
			})
		case EDIT_FINISHED:
			return Object.assign({}, state, {
				_toDoList: state._toDoList.map((item) => {
					if (Number(item.id) === Number(action.payload.id)) {
						return Object.assign(item, {
							work: action.payload.work,
						})
					} else {
						return item
					}
				}),
			})
		default:
			return state
	}
}
