import React from 'react'

export default class Ipt extends React.Component {
    constructor() {
        super()
        this.state = {
            msg: "test event"
        }
    }

    clickBtn = () => {

        const btn = this.refs.mybtn;
        console.log(btn);
        const a = 'test state';
        btn.innerHTML = a;
        this.setState({
            msg: a
        })
    }

    changeText = (e) => {
        console.log(e.target.value);
        this.setState({
            msg: e.target.value
        })

    }

    render() {
        return <div>
            <h1 className = 'title'>{this.state.msg}</h1>
            <button style={{color : 'red'}} onClick={() => this.clickBtn()} ref='mybtn'>演示事件绑定</button>
            <br />
            <br />
            <input type="text" value={this.state.msg} onChange={(e) => this.changeText(e)} />
        </div>

    }
}