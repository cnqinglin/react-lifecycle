import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

//自己写一个控制台
let div = document.createElement("div");
document.body.appendChild(div);
console.log = function(content) {
  div.innerHTML += `<br>${content}`;
};

class Parent extends React.Component {
  constructor() {
    super();
    this.state = {
      hasChild: true
    };
  }
  onClick() {
    this.setState({
      hasChild: false
    });
  }
  callSon() {
    this.setState({
      word: "父级组件说：你还好吗"
    });
  }

  render() {
    return (
      <div>
        父级组件<button onClick={() => this.onClick()}>kill Child</button>
        <button onClick={() => this.callSon()}>call son</button>
        {this.state.hasChild ? <App word={this.state.word} /> : null}
      </div>
    );
  }
}

class App extends React.Component {
  onClick() {
    console.log("用户点击了");
    this.setState({
      n: this.state.n + 1
    });
  }
  constructor() {
    super();
    console.log("创建App");
    this.state = {
      n: 0,
      x: "不展示"
    };
  }

  upDateX() {
    this.setState({
      x: this.state.x + "!"
    });
  }

  componentWillMount() {
    console.log("将要mount app");
  }

  //render 将内容填进去,更新内容
  render() {
    //等价于update
    console.log("填充/更新App 的内容");
    return (
      <div className="App">
        {this.state.n}
        <br />
        {this.props.word}
        <br />
        <button onClick={() => this.onClick()}>+1</button>
        <button
          onClick={() => {
            this.upDateX();
          }}
        >
          update x
        </button>
      </div>
    );
  }

  //页面中显示div的内容
  componentDidMount() {
    console.log("mount App 完毕");
  }

  componentWillUpdate() {
    console.log("update app 之前");
  }

  componentDidUpdate() {
    console.log("update app 之后");
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.n === this.state.n) {
      return false;
    } else {
      return true;
    }
  }

  componentWillUnmount() {
    console.log("App快要死了");
  }

  componentWillReceiveProps() {
    console.log("顶层组件将要更新了");
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Parent />, rootElement);
