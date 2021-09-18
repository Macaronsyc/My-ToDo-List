import './App.scss'
import React, { useEffect, useCallback } from 'react'
import Listitem from './components/Listitem'
import axios from 'axios'
import { Input, List, Tabs, Spin, message } from 'antd'

function App(props) {
	const { TabPane } = Tabs
	const key = 'key'
	const fetchInitialData = useCallback(() => {
		axios
			.get('http://localhost:3003/getList')
			.then((res) => {
				props.initialize(JSON.parse(res.data.list))
			})
			.catch((error) => {
				console.log(error)
				message.error({ content: '信号飞到了外太空', key })
			})
		// eslint-disable-next-line
	}, [])
	useEffect(fetchInitialData, [fetchInitialData])
	const showSaveProcess = () => {
		message
			.loading({
				content: '保存中',
				key,
				duration: 10,
				style: {
					marginTop: '4vh',
				},
			})
			.then(() => {
				message.error({
					content: '保存失败，请检查网络连接！',
					style: {
						marginTop: '4vh',
					},
				})
			})
	}
	const api_AddWork = (obj) => {
		axios
			.post('http://localhost:3003/addWork', obj)
			.then((res) => {
				if (res.data.isSuccess) props.inputPressEnter(obj)
				message.success({
					content: '保存成功',
					key,
					duration: 1,
					style: {
						marginTop: '4vh',
					},
				})
			})
			.catch((error) => {
				message.error({ content: '保存失败', key })
			})
	}

	const api_DeleteItem = (obj) => {
		axios
			.post('http://localhost:3003/deleteItem', obj)
			.then((res) => {
				if (res.data.isSuccess) props.deleteItem(obj.id)
				message.success({
					content: '保存成功',
					key,
					duration: 1,
					style: {
						marginTop: '4vh',
					},
				})
			})
			.catch((error) => {
				console.log(error)
				message.error({ content: '保存失败', key })
			})
	}
	const api_CheckBoxChanged = (obj) => {
		axios
			.post('http://localhost:3003/checkBoxChange', obj)
			.then((res) => {
				if (res.data.isSuccess) props.checkBoxChanged(obj.id, obj.isChecked)
				message.success({
					content: '保存成功',
					key,
					duration: 1,
					style: {
						marginTop: '4vh',
					},
				})
			})
			.catch((error) => {
				console.log(error)
				message.error({ content: '保存失败', key })
			})
	}
	const api_changeWork = (obj) => {
		axios
			.post('http://localhost:3003/updateWork', obj)
			.then((res) => {
				if (res.data.isSuccess) props.editFinished(obj.id, obj.newWork)
				message.success({
					content: '保存成功',
					key,
					duration: 1,
					style: {
						marginTop: '4vh',
					},
				})
			})
			.catch((error) => {
				console.log(error)
				message.error({ content: '保存失败', key })
			})
	}
	const handleOnPressEnter = (e) => {
		showSaveProcess()
		let obj = { id: Math.random(), work: e.target.value, isDone: false }
		api_AddWork(obj)
	}
	const handleDeleteItem = (id) => {
		showSaveProcess()
		api_DeleteItem({ id })
	}
	const handleCheckBoxChanged = (obj) => {
		showSaveProcess()
		api_CheckBoxChanged(obj)
	}
	const handleEditFinished = (obj) => {
		showSaveProcess()
		api_changeWork(obj)
	}
	return (
		<div className="App">
			<div className="main">
				<h1 style={{ marginBottom: '40px' }}>Yuchao's To-Do List</h1>
				<Input
					placeholder="What to do today?"
					value={props.App.newToDo}
					onChange={(e) => props.inputChanged(e.target.value)}
					size="large"
					onPressEnter={(e) => handleOnPressEnter(e)}
					className="input"
				/>

				<Tabs defaultActiveKey="1">
					<TabPane tab="All" key="1">
						{props.App._toDoList.length !== 0 ? (
							<List
								pagination={{
									onChange: (page) => {
										console.log(page)
									},
								}}
								dataSource={props.App._toDoList}
								bordered
								className="list"
								renderItem={(item, i) => (
									<List.Item key={i} className="list-item">
										<Listitem
											content={item}
											index={i}
											onDelete={(id) => handleDeleteItem(id)}
											onCheckBoxChange={(id, isChecked) => {
												handleCheckBoxChanged({ id, isChecked })
											}}
											onEditPressEnter={(id, newWork) => {
												handleEditFinished({ id, newWork })
											}}
										/>
									</List.Item>
								)}
							/>
						) : (
							<Spin size="large" tip="loading" className="loading" />
						)}
					</TabPane>
					<TabPane tab="Undone" key="2">
						<List
							pagination={{
								onChange: (page) => {
									console.log(page)
								},
							}}
							dataSource={props.App._toDoList.filter((item) => !item.isDone)}
							bordered
							className="list"
							renderItem={(item, i) => (
								<List.Item key={i} className="list-item">
									<Listitem
										content={item}
										index={i}
										onDelete={props.deleteItem}
										onCheckBoxChange={props.checkBoxChanged}
										onEditPressEnter={props.editFinished}
									/>
								</List.Item>
							)}
						/>
					</TabPane>
					<TabPane tab="Done" key="3">
						<List
							pagination={{
								onChange: (page) => {
									console.log(page)
								},
							}}
							dataSource={props.App._toDoList.filter((item) => item.isDone)}
							bordered
							className="list"
							renderItem={(item, i) => (
								<List.Item key={i} className="list-item">
									<Listitem
										content={item}
										index={i}
										onDelete={props.deleteItem}
										onCheckBoxChange={props.checkBoxChanged}
										onEditPressEnter={props.editFinished}
									/>
								</List.Item>
							)}
						/>
					</TabPane>
				</Tabs>
			</div>
		</div>
	)
}

export default App
