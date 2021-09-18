import { connect } from 'react-redux'
import App from '../App.js'
import {
	inputChanged,
	inputPressEnter,
	checkBoxChanged,
	deleteItem,
	editFinished,
	initialize,
} from '../redux/containers/myApp'

function mapStateToProps(state) {
	return {
		App: state.mytoDoApp,
	}
}

function mapDispatchtoProps(dispatch) {
	return {
		initialize: (init) => dispatch(initialize(init)),
		inputChanged: (value) => dispatch(inputChanged(value)),
		inputPressEnter: (value) => dispatch(inputPressEnter(value)),
		checkBoxChanged: (id, isChecked) =>
			dispatch(checkBoxChanged(id, isChecked)),
		deleteItem: (id) => dispatch(deleteItem(id)),
		editFinished: (id, work) => dispatch(editFinished(id, work)),
	}
}

export default connect(mapStateToProps, mapDispatchtoProps)(App)
