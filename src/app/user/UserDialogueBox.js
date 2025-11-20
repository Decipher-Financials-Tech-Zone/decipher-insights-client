import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import UserDetails from './UserDetails';
import "./userDetails.css";

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
    const { onClose, selectedValue, open, handleLogout, loggingOut, userDetails } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} open={open} className='userDetailsDialogueBox'>
            <UserDetails Details handleLogout={handleLogout} loggingOut={loggingOut} userDetails={userDetails}/>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    loggingOut: PropTypes.func.isRequired,
    userDetails: PropTypes.object.isRequired
    
};

export default function UserDialogueBox({ handleLogout, loggingOut, userDetails }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <div>
            <PersonOutlineOutlinedIcon sx={{ cursor: "pointer" }} onClick={handleClickOpen} />
            <SimpleDialog
                open={open}
                onClose={handleClose}
                handleLogout={handleLogout}
                loggingOut={loggingOut}
                userDetails={userDetails}
            />
        </div>
    );
}