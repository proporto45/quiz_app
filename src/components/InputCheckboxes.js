import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import remove from 'lodash/array/remove';


export default class InputCheckboxes extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: (this.props.linkToSaved.length != 0) ? this.props.linkToSaved : [],
    };
    handleChange = event => {
        const currentSelected = this.state.value;
        if (event.currentTarget.checked) {
            currentSelected.push(event.currentTarget.value);
        } else {
            let result = remove(currentSelected, (n) => {
                return n == event.currentTarget.value;
            });
        }
        // this.setState({value: currentSelected});
        this.props.savingToReduxLink(this.props.questionId, currentSelected);
        event.preventDefault();
    };

    render() {
        const saved = this.props.linkToSaved;

        const checkboxes = this.props.answers.map((answer, index) => {
                const isSelected = ((typeof saved) != 'string') ? (saved.some((item) => {
                    return (answer.answerTitle == item);
                })) : false;
            return <FormControlLabel key={answer.answerId} id={answer.answerId}
                                     control={
                                         <Checkbox id={answer.answerId.toString()} color="primary"
                                                   value={answer.answerTitle} disableRipple={true}/>
                                     } checked={isSelected}
                                     label={answer.answerTitle} onChange={this.handleChange}/>
        });
        const questionFormId = `${this.props.formId}_${this.props.questionId}`;
        return (
            <Grid container
                  direction="row"
                  justify="space-around"
                  alignItems="flex-start">
                <FormGroup id={questionFormId}>
                    {checkboxes}
                </FormGroup>
            </Grid>
        )
    }
}


