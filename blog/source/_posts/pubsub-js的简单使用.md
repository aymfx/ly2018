---
title: pubsub-js的简单使用
date: 2016-08-20
tags: javascript
---
# 发布与订阅

> 它是一个库，通过这个库，我们能很好的将事件事件发布出去，而不需要关心接受者是谁

> https://www.npmjs.com/package/pubsub-js 这是npm库

> https://github.com/mroderick/PubSubJS 这是地址

# 安装

> cnpm i pubsub-js -S

# 我把它运用在了一个小demo配合react

> 这是 App.js


``` bash
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Alert from './Alert'
import PubSub from "pubsub-js"

class Button extends Component{
      constructor(props){
          super(props)
          this.state={
              time:false
          }
          this.bundEvent=this.bundEvent.bind(this);

      }
      bundEvent() {
          this.setState(prevState => ({time: !prevState.time}))
          if(this.state.time){
                PubSub.publishSync("SHOW_TIME","测试啦")
          }else{
              PubSub.publish("HIDE_TIME","继续")
          }
      }
      render(){
          return (<div>
              <button onClick={this.bundEvent}>{this.props.children}</button>
          </div>)
      }


}



class App extends Component {
  render() {
    return (
      <div className="App">
          <Alert/>
          <Button>大时代</Button>
      </div>
    );
  }
}

export default App;
```

> 这是自定义的提示，名字请忽略，没写弹窗

 
``` bash
import React, { Component } from 'react';
import './App.css';
import PubSub from "pubsub-js"
class Alert extends Component {
    constructor(props) {
        super(props)
        this.state={
            flag:false
        }
    }
    Show(e) {
        console.log(e,11);
        this.setState({
            flag:true
        })
    }
    Hide(e) {
        console.log(e,22);
        this.setState({
            flag:false
        })
    }
    componentDidMount() {
        PubSub.subscribe("SHOW_TIME",this.Show.bind(this))
        PubSub.subscribe("HIDE_TIME",this.Hide.bind(this))
    }

    render() {
        console.log(this.state.flag);
        return (
            <div className="App" style={{display:this.state.flag ? 'block' : 'none'}}>
                       <p>测试</p>
              </div>

        );
    }
}
export default Alert;
```

>  PubSub.subscribe("SHOW_TIME",this.Show.bind(this))  这是用来订阅一个方法

>  PubSub.publish("HIDE_TIME","继续") 这就是用来发布方法的了

> PubSub.unsubscribe() 用来取消订阅

> 对于全局都需要的弹窗和tips以及loding，我们可以用这个来改，不用每次都在局部写了





# 官网上提供的小栗子
 
``` bash
Basic example

// create a function to subscribe to topics
var mySubscriber = function( msg, data ){
    console.log( msg, data );
};

// add the function to the list of subscribers for a particular topic
// we're keeping the returned token, in order to be able to unsubscribe
// from the topic later on
var token = PubSub.subscribe( 'MY TOPIC', mySubscriber );

// publish a topic asyncronously
PubSub.publish( 'MY TOPIC', 'hello world!' );

// publish a topic syncronously, which is faster in some environments,
// but will get confusing when one topic triggers new topics in the
// same execution chain
// USE WITH CAUTION, HERE BE DRAGONS!!!
PubSub.publishSync( 'MY TOPIC', 'hello world!' );
```




``` bash
Cancel specific subscription

// create a function to receive the topic
var mySubscriber = function( msg, data ){
    console.log( msg, data );
};

// add the function to the list of subscribers to a particular topic
// we're keeping the returned token, in order to be able to unsubscribe
// from the topic later on
var token = PubSub.subscribe( 'MY TOPIC', mySubscriber );

// unsubscribe this subscriber from this topic
PubSub.unsubscribe( token );

Cancel all subscriptions for a function

// create a function to receive the topic
var mySubscriber = function( msg, data ){
    console.log( msg, data );
};

// unsubscribe mySubscriber from ALL topics
PubSub.unsubscribe( mySubscriber );
Clear all subscriptions for a topic

PubSub.subscribe('a', myFunc1);
PubSub.subscribe('a.b', myFunc2);
PubSub.subscribe('a.b.c', myFunc3);

PubSub.unsubscribe('a.b');
// no further notications for 'a.b' and 'a.b.c' topics
// notifications for 'a' will still get published
Clear all subscriptions

PubSub.clearAllSubscriptions();
// all subscriptions are removed
Hierarchical addressing

// create a subscriber to receive all topics from a hierarchy of topics
var myToplevelSubscriber = function( msg, data ){
    console.log( 'top level: ', msg, data );
}

// subscribe to all topics in the 'car' hierarchy
PubSub.subscribe( 'car', myToplevelSubscriber );

// create a subscriber to receive only leaf topic from hierarchy op topics
var mySpecificSubscriber = function( msg, data ){
    console.log('specific: ', msg, data );
}

// subscribe only to 'car.drive' topics
PubSub.subscribe( 'car.drive', mySpecificSubscriber );

// Publish some topics
PubSub.publish( 'car.purchase', { name : 'my new car' } );
PubSub.publish( 'car.drive', { speed : '14' } );
PubSub.publish( 'car.sell', { newOwner : 'someone else' } );

// In this scenario, myToplevelSubscriber will be called for all
// topics, three times in total
// But, mySpecificSubscriber will only be called once, as it only
// subscribes to the 'car.drive' topic
```
# Tips

``` bash
Example of use of "constants"

// BAD
PubSub.subscribe("hello", function( msg, data ){
	console.log( data )
});

PubSub.publish("helo", "world");

// BETTER
var MY_TOPIC = "hello";
PubSub.subscribe(MY_TOPIC, function( msg, data ){
	console.log( data )
});

PubSub.publish(MY_TOPIC, "world");
```

