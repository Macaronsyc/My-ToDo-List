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

    function onEditFinished() {
        console.log('clicked')
        setisEdit(false)
        console.log(edit)
    }

    function showConfirm() {
        confirm({
            title: '确认删除此待办事项？',
            content: '你不能撤销此操作',
            onOk() {
                props.onDelete(props.index)
            }
        }

        )
    }
    const [isEdit, setisEdit] = useState(false)
    useEffect(() => {
        edit.current && edit.current.focus()
    }, [isEdit])
    return (
        <>
            <Checkbox
                onChange={props.onChange}
                checked={props.content.isDone}
                on
            ></Checkbox>
            {!isEdit ? (
                <div className='todo-text'>
                    <span>{props.content.work}</span>
                </div>
            ) : (
                <Input
                    ref={edit}
                    onPressEnter={onEditFinished}
                    className="edit"
                    value={props.content.work}
                    onBlur={() => setisEdit(false)}
                ></Input>
            )}
            <div className="controlBtns">
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => onEditClicked(props.index)}
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
