import * as yup from 'yup';
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Col, Form, Button } from 'react-bootstrap';
import { animateScroll } from 'react-scroll';
import { ArrowRightSquare } from 'react-bootstrap-icons';

import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import useSocket from '../hooks/socket.js';

const Messages = () => {
  const { t } = useTranslation();

  const { addNewMessage } = useSocket();

  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);

  const inputMessage = useRef(null);

  useEffect(() => {
    inputMessage.current.focus();
  }, []);

  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'messages-box' });
  }, [messages]);

  const currentChannel = channels.length !== 0
    ? channels.find((el) => el.id === currentChannelId) : '';

  const currentChannelName = currentChannel ? currentChannel.name : '';

  const currentMessages = messages.filter((el) => el.channelId === currentChannelId);
  const currentMessagesLength = currentMessages ? currentMessages.length : 0;

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object().shape({
      body: yup.string().trim().required(t('messageBody')),
    }),
    onSubmit: (values) => {
      const { body } = values;
      const { username } = JSON.parse(localStorage.getItem('userdatas'));

      if (body) {
        const newMessage = {
          body,
          channelId: currentChannelId,
          username,
        };
        try {
          addNewMessage(newMessage);
          formik.resetForm();
        } catch (err) {
          toast.error(t('errors.message'));
        }
      }
      inputMessage.current.focus();
    },
  });

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">
            {t('messagesCounter.messages', { count: currentMessagesLength })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentMessagesLength === 0 ? '' : currentMessages.map((el) => (
            <div className="text-break mb-2" key={el.id}>
              <b>{filter.clean(el.username)}</b>
              {`: ${filter.clean(el.body)}`}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
            <Form.Group className="input-group">
              <Form.Label className="visually-hidden" htmlFor="body">{t('newMessage')}</Form.Label>
              <Form.Control
                name="body"
                aria-label={t('newMessage')}
                placeholder={t('placeholders.newMessage')}
                className="border-0 p-0 ps-2"
                onChange={formik.handleChange}
                value={formik.values.body}
                ref={inputMessage}
              />
              <Button
                type="submit"
                disabled={!formik.values.body}
                variant=""
                className="btn-group-vertical border-0"
              >
                <ArrowRightSquare />
                <span className="visually-hidden">
                  {t('send')}
                </span>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default Messages;
