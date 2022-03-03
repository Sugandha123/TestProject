import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState, memo } from 'react';

const useStyles = makeStyles({
    paper: {
        border: "1px solid #0c5460"
    }
});

const AutoCompleteDropDown = (props) => {
    const classes = useStyles();
    const [autoCompleteDropDownValue, setAutoCompleteDropDownValue] = useState(null);
    const [valueParameterFlag, setValueParameterFlag] = useState(false);

    useEffect(() => {
        //set the default value on view and edit mode
        if (props?.autoCompleteDropDownValueParameter) {
            setValueParameterFlag(true);
        }
        setAutoCompleteDropDownValue({ value: props.defaultValue, label: props.defaultLabel });
    }, [props?.defaultValue, props.defaultLabel, props.dropDownValue]);

    const onChange = (e, newValue) => {
        if (props.setFieldValue !== undefined) {
            if (newValue !== null) {
                props.parentCallBackOnChangehandler(newValue);
                if (e.target.textContent !== '') {
                    props.setFieldValue(props.fieldName, newValue.value);
                }
                else {
                    props.setFieldValue(props.fieldName, '');
                }
                //set the value of autocomplete drop down
                setAutoCompleteDropDownValue({ value: newValue.value, label: newValue.label });
            }
        }
        else {
            if (newValue !== null) {
                props.parentCallBackOnChangehandler(newValue);
            }
        }
    };

    return (
        <div className={props.setFieldValue ? 'autoCompleteDropDown' : 'autoCompleteDropDown headerFacilityContainer'}>
            {!valueParameterFlag && <Autocomplete
                id='combo-box-demo'
                className={props.setFieldValue ? 'row autoCompleteStyle left' : 'row autoCompleteStyle headerFacility'}
                classes={{ paper: classes.paper }}
                options={props?.dropDownValue}
                getOptionLabel={props?.showLabelAndValue ?
                    (option) => option.label && option.value !== "" && option.value !== null ? `${option.value}-${option.label}` : `${option.label}` :
                    (option) => option.label ? option.label : ""}
                getOptionSelected={(option, value) => option.value === value.value}
                disabled={props?.disabled}
                style={{ width: props.width ? props.width : '80%' }}
                onChange={(e, newValue) => onChange(e, newValue)}
                renderInput={(params) =>
                    <TextField {...params}
                        label={props?.defaultLabel && props?.defaultValue && props?.showLabelAndValue ?
                            `${props?.defaultValue}-${props?.defaultLabel}` :
                            props?.defaultLabel && props?.defaultValue && props?.showLabelAndValue === false ?
                                props?.defaultLabel :
                                props.labelValue}
                        variant='outlined'
                        fullWidth
                    >
                    </TextField>}
            />
            }

            {valueParameterFlag && <Autocomplete
                id='combo-box-demo'
                className={props.setFieldValue ? 'row autoCompleteStyle left' : 'row autoCompleteStyle headerFacility'}
                classes={{ paper: classes.paper }}
                value={autoCompleteDropDownValue}
                options={props?.dropDownValue}
                getOptionLabel={props?.showLabelAndValue ?
                    (option) => option.label && option.value !== "" && option.value !== null ? `${option.value}-${option.label}` : `${option.label}` :
                    (option) => option.label ? option.label : ""}
                getOptionSelected={(option, value) => option.value === value.value}
                disabled={props?.disabled}
                style={{ width: props.width ? props.width : '80%' }}
                onChange={(e, newValue) => onChange(e, newValue)}
                renderInput={(params) =>
                    <TextField {...params}
                        label={props?.defaultLabel && props?.defaultValue && props?.showLabelAndValue ?
                            `${props?.defaultValue}-${props?.defaultLabel}` :
                            props?.defaultLabel && props?.defaultValue && props?.showLabelAndValue === false ?
                                props?.defaultLabel :
                                props.labelValue}
                        variant='outlined'
                        fullWidth
                    >
                    </TextField>}
            />
            }
        </div>

    );

}

export default AutoCompleteDropDown;