import React from 'react'
import cmtItem from '@/css/cmtItem.scss'


export default function ReactItem(props) {
    return <div className = {cmtItem.box}>
        <h1 className = {cmtItem.title}>{props.user}</h1>
        <p className = {cmtItem.content}>{props.content}</p></div>
}