import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Button,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import filter from 'leo-profanity';

import getModal from './modal/index.js';
import { changeCurrentChannel } from '../slices/channelsSlice.js';
import { openModal } from '../slices/modalSlice.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const selector = useSelector((state) => state.modals);
  const { modalType } = selector.modals;

  const handleChangeClick = (id) => {
    dispatch(changeCurrentChannel(id));
  };

  const renderModal = () => {
    if (modalType === '') {
      return null;
    }
    const Component = getModal(modalType);
    return <Component />;
  };

  return (
    <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channelsTitle')}</span>
        <Button
          variant=""
          className="p-0 text-primary btn-group-vertical"
          onClick={() => dispatch(openModal({ type: 'adding', targetId: null }))}
        >
          <PlusSquare />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((el) => (
          <li className="nav-item w-100" key={el.id}>
            <ButtonGroup className="d-flex show dropdown">
              <Button
                onClick={() => handleChangeClick(el.id)}
                variant={el.id === currentChannelId ? 'secondary' : 'light'}
                className="w-100 rounded-0 text-start text-truncate"
              >
                <span className="me-1">#</span>
                {filter.clean(el.name)}
              </Button>
              { el.removable
                && (
                  <Dropdown>
                    <Dropdown.Toggle split variant={el.id === currentChannelId ? 'secondary' : 'light'} className="flex-grow-0 dropdownCustom">
                      <span className="visually-hidden">{t('modal.toggle')}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => dispatch(openModal({ type: 'removing', targetId: el.id }))}>{t('modal.remove')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => dispatch(openModal({ type: 'renaming', targetId: el.id }))}>{t('modal.rename')}</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
            </ButtonGroup>
          </li>
        ))}
      </ul>
      { renderModal() }
    </Col>
  );
};

export default Channels;
