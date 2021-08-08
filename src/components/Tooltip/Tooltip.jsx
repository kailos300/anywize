import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
const useStyles = makeStyles({
    _tourdetailbar: {
        background: '#6F9CEB',
        width: '255px',
        height: '70px',
        position: 'relative',
        // right: 0,
        top: '-30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: ' space-around',
        color: 'black',
        "&::before": {
            content: '""',
            height: 0,
            width: 0,
            position: 'absolute',
            left: '46%',
            bottom: '-36px',
            border: '20px solid transparent',
            borderTopColor: '#6F9CEB',
            // borderRightColor: '#DA362A',
        }
    },
    _codetext: {
        fontSize: '15px',
    },
    _codedetail: {
        fontSize: '15px',
        fontWeight: 'bold',
    },
    _1F1F1F: {
        background: '#1F1F1F',
    },
    _525252: {
        background: '#525252',
    },
    _textalignright: {
        textAlign: 'right',

    },
    _edit: {
        background: '#6F9CEB',
        borderRadius: '50%',
        padding: '2px',
        width: '13px',
        height: '13px',
    },
    _pointer: {
        cursor: 'pointer'
    },
    _width111: '111px',
    _fontsize12: {
        fontSize: '12px',
        cursor: 'pointer'
    }
});
export default function TooltipBar(props) {
    const classes = useStyles();
    const copyCode = () => {
        props.name == 'callicon' ?
            navigator.clipboard.writeText(`Mobile:${'762342837462'}`) :
            navigator.clipboard.writeText(`Tourcode:${props.rowData.code}, Password:${props.rowData.password}`)
    }
    return (
        <div className={classes._tourdetailbar} >
            {props.name == 'callicon' ?
                <div className={classes._codetext}>
                    <span className={classes._codedetail}>Mobile:</span> 762342837462
                </div>
                :
                <div className={classes._codetext}>
                    <span className={classes._codedetail}>Tourcode:</span> {props.rowData.code}
                    <br />
                    <span className={classes._codedetail}>Password:</span> {props.rowData.password}
                </div>
            }
            <FileCopyOutlinedIcon onClick={copyCode} style={{ color: 'black', cursor: 'pointer' }} />
        </div>
    )
}
