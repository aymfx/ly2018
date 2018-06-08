---
title: react-Lifting State Up
date: 2017-07-16
tags: react
---

# 案例一

> 通过输入温度改变条件

```
function BoilingVerdict(props) {
    if(props.celsius>=100) {
        return <p>水开了</p>
    }
    return <p>水没开</p>
}

class Calculator extends Component {
    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state  = {temperature:''}
    }

    handleChange(e) {
        this.setState({temperature:e.target.value})
    }

    render(){
        const temperature = this.state.temperature;

        return (<div>
            <fieldest>
                <legend>
                    输入温度吧
                </legend>
                <input type="text"
                       value={temperature}
                       onChange={this.handleChange}
                />
                <BoilingVerdict
                    celsius={parseFloat(temperature)}
                />
            </fieldest>
        </div>)

    }
}
```

> 通过输入温度改变不同的的状态,共享状态是通过将其移动到需要它的组件的最接近的共同祖先来完成的，通过event up 改变父组件状态值


```
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                       onChange={this.handleChange} />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        );
    }
}
```

> 在任何一个react对象中，任何数据都应该是单一来源。

> 这个状态需要第一时间被添加到它需要的组件上，如果其他组件也需要它，我们可以把他的状态提升到它最近的组件上，而不是试图在不同组件同步,这就是自相而下的数据流。






