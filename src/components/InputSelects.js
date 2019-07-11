import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    root: {
        '&$outlined': {
            background: "none !important"
        }
    },
    outlined: {}
};

class InputSelect extends React.Component {


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.questionTitle === 'Регион РФ') {
            this.props.updateCitySelectOptions((this.props.questionId + 1), "");
        }
    }

    handleChange = event => {
        const currentSelected = [event.target.value];
        this.props.savingToReduxLink(this.props.questionId, currentSelected);
        if (this.props.questionTitle == 'Регион РФ') {
            this.props.updateCitySelectOptions((this.props.questionId + 1), event.target.value);
        }
    };

    render() {
        const {classes} = this.props;
        const labels = this.props.answers.map((item, index) => {
            return <MenuItem key={item.answerId} value={item.answerTitle}>{item.answerTitle}</MenuItem>
        });
        const questionFormId = `${this.props.formId}_${this.props.questionId}`;
        return (
            <Grid container
                  direction="row"
                  justify="space-around"
                  alignItems="flex-start">
                <form id={questionFormId} className="InputSelectsForm" autoComplete="off">
                    <FormControl id="choices" className='choices'>

                        <Select
                            id="dropDownSelect"
                            value={(this.props.linkToSaved[0] != undefined) ? this.props.linkToSaved[0] : ''}
                            autoWidth={true}
                            displayEmpty
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'Выбрать',
                                id: 'simple',
                            }}
                            variant="outlined"
                            classes={{
                                root: classes.root,
                                outlined: classes.outlined
                            }}
                        >
                            <MenuItem value="Не выбран">
                                <em>Не выбран</em>
                            </MenuItem>
                            {labels}
                        </Select>
                    </FormControl>
                </form>
            </Grid>
        )
    }
}

export default withStyles(styles)(InputSelect);