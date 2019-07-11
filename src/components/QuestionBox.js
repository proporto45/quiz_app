import React from 'react';

import Typography from '@material-ui/core/Typography';
import Answers from './Answers'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class InputSelect extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        const currentAnswerTemp = '';
        return (
            <FormControl component="fieldset" className="questionContainer">
                <FormLabel component="legend"><Typography
                    variant="subtitle1">{this.props.title}</Typography></FormLabel>

                <Answers currentLink={this.props.stageObjectLink} type={this.props.type}
                         currentAnswer={currentAnswerTemp} answers={this.props.answers} formId={this.props.formId}
                         questionId={this.props.id} titleCheck={this.props.title}/>
            </FormControl>
        )
    }
}
