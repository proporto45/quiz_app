import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';

export default class AutoNumber extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: (this.props.linkToSaved.length != 0) ? this.props.linkToSaved : "...",
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.questionName == "ИМТ") {
            if (this.props.calcAttr.growthAnswer[0] && this.props.calcAttr.weightAnswer[0]) {
                if (this.props.calcAttr.growthAnswer[0] != prevProps.calcAttr.growthAnswer[0] || this.props.calcAttr.weightAnswer[0] != prevProps.calcAttr.weightAnswer[0]) {
                    const weight = parseInt(this.props.currentQuestions[this.props.questionId - 1].userAnswer[0]);
                    const growth = parseInt(this.props.currentQuestions[this.props.questionId - 2].userAnswer[0]);
                    const IMT = (growth == 0) ? 0 : (weight / Math.pow((growth / 100), 2));
                    this.props.savingToReduxLink(this.props.questionId, [Math.floor(IMT).toString()]);
                    // this.setState({value: [Math.floor(IMT).toString()]});
                }
            }
        }
        else if (this.props.questionName == "Индекс GERD-HRQL") {
            if (this.props.calcAttr.length === 10) {
                const previousHrql = (prevProps.calcAttr === "") ? "" : prevProps.calcAttr.reduce((a, b) => a + b, 0);
                const currentHrql = this.props.calcAttr.reduce((a, b) => a + b, 0);
                if (currentHrql !== previousHrql) {
                    this.props.savingToReduxLink(this.props.questionId, [currentHrql]);
                }
            }
        }
    }

    render() {
        const questionFormId = `${this.props.formId}_${this.props.questionId}`;
        return (
            <Grid container
                  direction="row"
                  justify="space-around"
                  alignItems="flex-start">
                <FormGroup id={questionFormId}>
                    <Typography
                        variant="subtitle1">{(this.props.linkToSaved[0] != undefined) ? this.props.linkToSaved[0] : "..."}</Typography>

                </FormGroup>
            </Grid>
        )
    }
};