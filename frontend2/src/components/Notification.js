import React, { useEffect } from 'react';
import './Notification.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessage, getMessage } from '../redux/messages/messageAction';

const Notification = () => {
    const message = useSelector(getMessage)
    const dispatch = useDispatch();
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(deleteMessage())
            
        }, 2000);
        return () => clearTimeout(timer);
    }, [message]);
    if (message === "") {
        return <></>
    } else {
        console.log(message);
        return <div className="notification-wrapper">{message}</div>;
    }
};

export default Notification;