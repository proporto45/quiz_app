import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class InputSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const titleString = (this.props.stageTitle.length != 0) ? this.props.stageTitle[0].stageName : '';
        const currentTitle = (titleString.split('. ').length > 1) ? titleString.split('. ').join('. ').replace(`${titleString.split('. ')[0]}. `, '') : '';
        const currentPreTitle = (titleString.split('. ').length > 1) ? titleString.split('. ')[0] : titleString;
        return (
            <Grid item>
                <Typography variant="h6">
                    {currentPreTitle}
                </Typography>
                <br/>
                <Typography variant="subtitle1">
                    {currentTitle}
                </Typography>
                <br/>
            </Grid>
        )
    }
}
