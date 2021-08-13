import './App.scss'
import React, { useState } from 'react'
import Listitem from './components/Listitem'
import { Input, List } from 'antd'
// import { PlusOutlined } from '@ant-design/icons'

function App() {
	const { Search } = Input
	const [inputValue, setinputValue] = useState('')
	let toDoList = [
		{ work: 'Eat', isDone: false },
		{ work: 'Sleep', isDone: false },
		{ work: 'Beat DouDou', isDone: false },
	]
	toDoList = [...toDoList, ...toDoList]
	const [list, setlist] = useState(toDoList)

	function onPressEnter(e) {
		if (inputValue !== '')
			setlist([{ work: inputValue, isDone: false }, ...list])
		setinputValue('')
		console.log(list)
	}

	function handleDelete(index) {
		let newList = list
			.slice(0, index)
			.concat(list.slice(index + 1, list.length))
		return newList
	}
	function onTodoDelete(index) {
		setlist(handleDelete(index))
	}

	return (
		<div className="App">
			<div className="main">
				<h1 style={{ marginBottom: '40px' }}>宋煜超的ToDo List</h1>
				<Search
					placeholder="待办事项..."
					value={inputValue}
					onChange={(e) => setinputValue(e.target.value)}
					enterButton="+"
					size="large"
					onPressEnter={onPressEnter}
					onSearch={onPressEnter}
					className="input"
				/>

				<List
					dataSource={list}
					bordered
					className="list"
					renderItem={(item, i) => (
						<List.Item key={i} className="list-item">
							<Listitem content={item} index={i} onDelete={onTodoDelete} />

							{/* /> */}
						</List.Item>
					)}
				/>
			</div>
		</div>
	)
}

export default App
