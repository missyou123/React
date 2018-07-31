import React from 'react'
import ReactDOM from 'react-dom'

import TestFn from '@/components/TestFn'

import CmtList from '@/components/CmtList'

import Ipt from '@/components/Ipt'

console.log("index.js");


function Test() {
    return <h1>测试react环境</h1>
}


ReactDOM.render(
    <div>
        <Test></Test>
        <Ipt></Ipt>
        <TestFn></TestFn>
        <CmtList></CmtList>
    </div>
    , document.getElementById('app')
)