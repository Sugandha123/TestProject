import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FromControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import './RadioButtonList.css'

const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent'
        },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outine: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover~&': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled~&': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)'
        },
    },
    checkedIcon: {
        backgroundColor: '#007481',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""'
        },
        'input:hover~&': {
            backgroundColor: '#106ba3'
        },
        'input:disabled~&': {
            background: '#007481'
        }
    },
});

function StyledRadio(props) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}></span>}
            icon={<span className={classes.icon}></span>}>
            {...props}
        </Radio>
    );
}

export default function RadioButtonList(props) {
    const { setFieldValue, parentCallback, fieldValueName, defaultValue } = props;

    function handleToggle(value) {
        parentCallback(value);
        setFieldValue(fieldValueName, value.value);
    }

    const radioList = props.radioButtonList.map((options) =>
        <FormControlLabel
            key={options.value}
            value={options.value}
            control={<StyledRadio></StyledRadio>}
            label={options.label}
            disabled={props.disabled}
            onClick={() => handleToggle(options)}>
        </FormControlLabel>
    );

    const defaultRadioValue = defaultValue;

    return (
        <FormControl component="fieldset" className="left radioGroup">
            <RadioGroup row defaultValue={defaultRadioValue} aria-label="customized-radio" name="customized-radios">
                {radioList}
            </RadioGroup>
        </FormControl>
    );
}