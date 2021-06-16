import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = ({
    color: "#4667C9",
    fontFamily: "fantasy",
    position: 'relative',
    top: '0',
    left: '0'
});

class Timer extends Component {
    state = {
        minutes: 30,
        seconds: 0,
    }

    componentDidMount = () => {
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


    render() {
        const { minutes, seconds } = this.state;
        return (
            <div>
                {minutes === 0 && seconds === 0
                    ? (<Dialog open={true}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">{"Time is Up :("}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Because of our privacy policy, You can't chat for more than 30 min. Now You are running out of time. <br /> Sorry to say, you have to start again from the beginning...
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button href="http://localhost:3000" color="primary" autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>)
                    : (<pre style={useStyles}>{minutes} : {seconds < 10 ? `0${seconds}` : seconds}</pre>)
                }
            </div>
        )
    }
}
export default Timer;