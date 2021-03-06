import { Alert } from '@material-ui/lab';
import React, { Component } from 'react';

export default class Timer extends Component {
    state = {
        minutes: 30,
        seconds: 0,
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div>
                { minutes === 0 && seconds === 0
                    ? <Alert variant={false} severity="warning" style={{ color: "crimson", fontFamily: "sans-serif", position: 'absolute', top: '0', left: '0' }}></Alert>
                    : <pre style={{ color: "#4667C9", fontFamily: "fantasy", position: "relative", top: "0", left: "0" }}>{minutes} : {seconds < 10 ? `0${seconds}` : seconds}</pre>
                }
            </div>
        )
    }
}