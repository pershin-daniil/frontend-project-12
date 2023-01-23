import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { toast } from 'react-toastify';
import useSocket from '../../hooks/socket.js';
import { closeModal } from '../../slices/modalSlice';
import ModalInput from './ModalInput.jsx';

const AddChannel = () => {
  const { addNewChannel } = useSocket();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { channels } = useSelector((state) => state.channels);
  const { modals } = useSelector((state) => state.modals);
  const { isShown } = modals;

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: yup.object().shape({
      channelName: yup.string().trim()
        .notOneOf(channels.map((channel) => channel.name), t('modal.unique'))
        .min(3, t('modal.lengthParams'))
        .max(20, t('modal.lengthParams'))
        .required(t('modal.lengthParams')),
    }),
    onSubmit: (values) => {
      try {
        addNewChannel({ name: values.channelName });
        formik.resetForm();
        dispatch(closeModal());
        toast.success(t('success.newChannel'));
      } catch (err) {
        toast.error(t('errors.channelAdd'));
      }
    },
  });

  const handleClose = () => dispatch(closeModal());

  const values = {
    isShown,
    handleClose,
    title: t('modal.add'),
    formik,
    cancelButton: t('cancel'),
    submitButton: t('send'),
  };

  return (
    <ModalInput values={values} />
  );
};

export default AddChannel;
