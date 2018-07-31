import React from 'react'

import CmtItem from '@/components/CmtItem'
import cmtStyle from '@/css/cmtList.scss'

console.log(cmtStyle);
export default class CmtList extends React.Component {
    constructor() {
        super()
        this.state = {
            CommentList: [
                { id: 1, user: '刘德华', content: '天诺友情' },
                { id: 2, user: '张学友', content: '吻别' },
                { id: 3, user: '范·迪塞尔', content: '速度与激情1,2,3,4,5,6' },
                { id: 4, user: '道恩·强森', content: '无' },
            ]
        }
    }

    render() {
        return <div>
            <h1 className={cmtStyle.title}>环球影片列表</h1>
            {
                this.state.CommentList.map(item =>
                    <CmtItem key={item.id} {...item}></CmtItem>
                )}

        </div>
    }
}