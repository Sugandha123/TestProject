import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        float: 'left'
    },
    cardHeader: {
        padding: '0px'
    },
    list: {
        width: 240,
        maxHeight: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto'
    },
    checkedIcon: {
        'input:disabled~&': {
            background: '#007481'
        }
    },
    button: {
        margin: theme.spacing(0.5, 0)
    }
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

export default function CheckBoxList(props) {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [isSettingDefaultChecked, setIsSettingDefaultChecked] = useState(false);
    const { setFieldValue, parentCallback, fieldValueName } = props;

    useEffect(() => {
        if (checked.length !== 0) {
            setFieldValue(fieldValueName, 'true');
        }
        else {
            setFieldValue(fieldValueName, '');
        }
    }, [checked, fieldValueName, setFieldValue]);

    const settingDefaultChecked = useCallback(() => {
        if (isSettingDefaultChecked === true) {
            return;
        }
        else {
            if (props?.defaultChecked && props?.defaultChecked.length > 0) {
                setIsSettingDefaultChecked(true);
                setChecked(props.defaultChecked);
            }
        }
    }, [isSettingDefaultChecked, props?.defaultChecked]);

    useEffect(() => {
        settingDefaultChecked();
    }, [settingDefaultChecked]);

    useEffect(() => {
        if (props.checkBoxListValue) {
            setLeft(props.checkBoxListValue);
        }
    }, [props?.checkBoxListValue]);

    const handleToggle = (event) => () => {
        const currentIndex = checked.some(element => element.value === event.value && element.label === event.label);
        const index = checked.findIndex(obj => obj.value === event.value);
        const newChecked = [...checked];
        if (!currentIndex) {
            newChecked.push(event);
        }
        else {
            newChecked.splice(index, 1);
        }
        setChecked(newChecked);
        parentCallback(newChecked);
    };

    const handleToggleAll = (items) => () => {
        if (checked.length === items.length) {
            setChecked([]);
            parentCallback([]);
        }
        else {
            //filter the list to remove duplicate data
            let list = [];
            list = (union(checked, items));
            const filterCheckedList = [];
            if (list.length !== 0) {
                list.forEach(obj => {
                    if (!filterCheckedList.some(o => o.value === obj.value)) {
                        filterCheckedList.push({ ...obj });
                    }
                });
            }
            setChecked(filterCheckedList);
            parentCallback(filterCheckedList);
        }
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const customList = (title, options) => (
        <Card>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(options)}
                        checked={
                            props?.defaultChecked ?
                                (numberOfChecked(checked) === left.length) :
                                (numberOfChecked(options) === options.length && options.length !== 0)
                        }
                        indeterminate={numberOfChecked(options) !== options.length && numberOfChecked(options) !== 0}
                        disabled={options.length === 0 || props.disabled}
                        inputProps={{ 'aria-label': 'all items selected' }}
                    >
                    </Checkbox>
                }
                title={title}
                subheader={props?.defaultChecked ?
                    `${numberOfChecked(checked)}/${options.length} selected` :
                    `${numberOfChecked(options)}/${options.length} selected`}>

            </CardHeader>

            <Divider />
            <List
                className={classes.list} dense component="div" role="list" style={{ maxHeight: props.height }}>
                {options.map((event) => {
                    const labelId = `transfer-list-all-item-${event.label}-label`;
                    return (
                        <ListItem key={event.value} role="listitem"
                            button
                            disabled={props.disabled}
                            onClick={handleToggle(event)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.some(element => element.value === event.value && element.label === event.label)}
                                    tabIndex={-1}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                >
                                </Checkbox>
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={event.value}></ListItemText>
                        </ListItem>
                    );
                })}

            </List>
        </Card>
    );

    return (
        <Grid container spacing={2} justify='flex-start' alignItems='centre' className={classes.root}>
            <Grid item disabled={true} className='left'>
            {customList(props.checkBoxListHeader,left)}
            </Grid>
        </Grid>
    );

}