import React from 'react';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';

export default class InputSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    handleInput = e => {
        const questionNumType = this.props.questionNumType;
        let maxValue;
        switch (questionNumType) {
            case "Возраст":
                maxValue = 120;
                break;
            case "Рост":
                maxValue = 220;
                break;
            case "Вес":
                maxValue = 220;
                break;
            default:
                maxValue = 999;
                break;
        }
        if (Number.isNaN(e.target.value)) {
            e.target.value = "";
        } else {
            const currentValue = (e.target.value > maxValue) ? maxValue.toString() : e.target.value;
            e.target.value = currentValue;
            this.props.savingToReduxLink(this.props.questionId, [currentValue]);
        }
    };

    render() {
        const questionFormId = `${this.props.formId}_${this.props.questionId}`;
        const answerId = `${questionFormId}_${this.props.answers[0].answerId.toString()}`;
        return (
            <Grid container
                  direction="row"
                  justify="space-around"
                  alignItems="flex-start">
                <FormGroup id={questionFormId}>
                    <Input
                        id={answerId}
                        className="inputNumber"
                        type="number"
                        fullWidth={false}
                        margin="dense"
                        pattern="\d*"
                        onInput={this.handleInput}
                        value={(this.props.linkToSaved[0] != undefined) ? this.props.linkToSaved[0] : ''}
                    />
                </FormGroup>
            </Grid>
        )
    }
}
