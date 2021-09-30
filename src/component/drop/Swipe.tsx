import React, { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DragDropBox from './DragDropBox'
import { cloneDeep } from 'lodash';
import Card from 'antd' // 类似饿了么ui的el-card，把他当成div吧
import   './swipe.less'

import {
    MinusOutlined
} from '@ant-design/icons'
import { Button, Popconfirm, message } from 'antd'

const initData = [
    {
        id: 1,
        text: '111'
    },
    {
        id: 2,
        text: '222'
    },
    {
        id: 3,
        text: '333'
    },
    {
        id: 4,
        text: '444'
    },
    {
        id: 5,
        text: '555'
    },
    {
        id: 6,
        text: '666'
    }
]

const Swipe = () => {
    const [isChangePosition, setIsChangePosition] = useState(false)
    const [boxList, setBoxList] = useState(initData)

    useEffect(() => {
        sessionStorage.initData = JSON.stringify(initData)
        return () => {
            sessionStorage.removeItem('initData')
        }
    }, [])
    
    const changePosition = (dragIndex: string | number, hoverIndex: string | number) => {
        let data = cloneDeep(boxList)
        let temp = data[dragIndex]
        // 交换位置
        data[dragIndex] = data[hoverIndex]
        data[hoverIndex] = temp
        setBoxList(data)
    }

    // 更换顺序按钮
    const changePositionBtn = () => {
        message.info('请拖拽图片进行排序！')
        setIsChangePosition(true)
    }

    // 取消交换位置
    const cancelChangePosition = () => {
        setIsChangePosition(false)
        setBoxList(JSON.parse(sessionStorage.getItem('initData') as any))
    }

    // 保存修改
    const saveChangePosition = () => {
        setIsChangePosition(false)
        sessionStorage.initData = JSON.stringify(boxList)
        // 在这里发送请求更新后端数据
        message.success('已更新顺序！')
    }

    const deleteImgOne = (id: number) => {
        console.log(id)
    }
    
    return(
        <div style={{ height: '100%' }}>
            <div>
                {
                    isChangePosition ?
                        <>
                            <Button onClick={ cancelChangePosition } style={{ marginRight: '15px' }}>取消</Button>
                            <Button type="primary" onClick={ saveChangePosition }>保存</Button>
                        </>
                        :
                        <Button type="primary" onClick={ changePositionBtn }>更换顺序</Button>
                }
            </div>
            <div>
                {
                    isChangePosition ?
                        <DndProvider backend={ HTML5Backend }>
                            <div 
                            // className='dragBoxContainer' 
                            style={{
                                width:"100%",
                                height:"100%",
                                display:"grid",
                                gridTemplateColumns:"repeat(auto-fill,360px)",
                                gridTemplateRows:"repeat(auto-fill,180px)",
                                gridGap:"15px",
                                justifyContent:"center",
                                alignItems:"center"}}>
                                {
                                    boxList.map((value, i)=>
                                        <DragDropBox
                                            // className={ style }
                                            className={ 'style' }
                                            key={ value.id }
                                            index={ i }
                                            id={ value.id }
                                            text={ value.text }
                                            changePosition={ changePosition }
                                        />
                                    )
                                }
                            </div>
                        </DndProvider>
                        :
                        <div className='dragBoxContainer'>
                            {
                                boxList.map(value=> (
                                    <div
                                        key={ value.id }
                                        // className={ [ style.dragBox, style.deleteIcon ].join(' ') }
                                        className='dragBox deleteIcon'
                                        style={{
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '180px',
                                            width: '100%',
                                            backgroundColor: 'pink',
                                            padding: '10px',
                                            overflow: 'hidden',
                                            borderRadius: '12px',
                                        }}
                                    >
                                        <Popconfirm
                                            title="确定要删除这张图片吗？"
                                            placement="top"
                                            onConfirm={ () => deleteImgOne(value.id) }
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <div className='deleteIconBox'>
                                                <MinusOutlined className='deleteIcon'/>
                                            </div>
                                        </Popconfirm>
                                        { value.id } - { value.text }
                                    </div>
                                ))
                            }
                            <div className='dragBox addImgBox' style={{
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '180px',
                                            width: '100%',
                                            backgroundColor: 'pink',
                                            padding: '10px',
                                            overflow: 'hidden',
                                            borderRadius: '12px',
                                        }} />
                            {/* <div className={ [style.dragBox, style.addImgBox].join(' ') }/> */}
                        </div>
                }
            </div>
        </div>
    )
}

export default Swipe