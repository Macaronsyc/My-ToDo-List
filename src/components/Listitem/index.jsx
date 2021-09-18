import React, { useState, useRef, useEffect } from 'react'
import { Button, Checkbox, Input, Modal } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

function Listitem(props) {
    const edit = useRef(null)
    const { confirm } = Modal
    function onEditClicked(i) {
        setisEdit(true)
        edit.current && edit.current.focus()
    }

    function onEditFinished(index, newWork) {
        setisEdit(false)
        props.onEditPressEnter(index, newWork)
    }

    function showConfirm() {
        confirm({
            title: 'Are you sure to delete this?',
            content: 'You are not able to revoke this operation',
            onOk() {
                props.onDelete(props.content.id)
            },
        })
    }
    const [isEdit, setisEdit] = useState(false)
    useEffect(() => {
        edit.current && edit.current.focus()
    }, [isEdit])
    useEffect(() => {
        setlocalWork(props.content.work)
    }, [props])
    const [localWork, setlocalWork] = useState(props.content.work)
    const [oldWork, setoldWork] = useState(props.content.work)


    return (
        <>
            <Checkbox
                onChange={(e) =>
                    props.onCheckBoxChange(props.content.id, e.target.checked)
                }
                checked={props.content.isDone}
            ></Checkbox>
            {!isEdit ? (
                <div className="todo-text">
                    <span className={`${props.content.isDone ? 'line-thru' : ''}`}>
                        {props.content.work}
                    </span>
                </div>
            ) : (
                <Input
                    ref={edit}
                    onPressEnter={(e) => {
                        if (localWork !== oldWork) {
                            onEditFinished(props.content.id, e.target.value)
                            setoldWork(localWork)
                        }
                        setisEdit(false)
                    }}
                    onChange={(e) => setlocalWork(e.target.value)}
                    className="edit"
                    value={localWork}
                    onBlur={(e) => {

                        if (localWork !== oldWork) {
                            onEditFinished(props.content.id, e.target.value)
                            setoldWork(localWork)
                        }
                        setisEdit(false)
                    }}
                ></Input>
            )}
            <div className="controlBtns">
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => onEditClicked(props.content.id)}
                />
                <Button
                    className="deleteBtn"
                    type="primary"
                    danger
                    onClick={showConfirm}
                    icon={<DeleteOutlined />}
                ></Button>
            </div>
        </>
    )
}

export default Listitem
