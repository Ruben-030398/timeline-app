import React from 'react'
import clsx from 'clsx';
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button, { ButtonVariant } from '../../components/button/button'
import DialogWrapper from '../../components/dialog-wrapper/dialog-wrapper'
import styles from './add-event-dialog.module.sass';
import Input from '../../components/input/input';
import validatorScheme from './validator-scheme';
import { useAppDispatch } from '../../store';
import { generateTimeline } from '../../store/actions/generate-timeline-action';

export type AddEventDialogProps = {
  onClose: () => void,
  startIndex: number,
  endIndex: number,
}

export type AddEventDialogForm = {
  eventName: string
}

export const AddEventDialog: React.FC<AddEventDialogProps> = ({ onClose, endIndex, startIndex }) => {
  const dispatch = useAppDispatch();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<AddEventDialogForm>({
    resolver: yupResolver(validatorScheme),
    defaultValues: {
      eventName: ''
    }
  })

  const onSubmit = (values: AddEventDialogForm) => {    
    dispatch(generateTimeline({ endIndex, startIndex, events: [values.eventName] }));

    onClose();
  };

  return (
    <DialogWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.add_event} >
          <div className={styles.add_event__title}>
            <h2>New event</h2>
            <Button
              type='button'
              onClick={onClose}
              variant={ButtonVariant.Secondary}
              className={styles.add_event__close_btn}
            >
              <X />
            </Button>
          </div>

          <div>
            <div className={styles.add_event__label}>
              <Input autoFocus {...register('eventName')} id="event-name" />
              <label
                htmlFor="event-name"
                className={clsx({ [styles.error_text]: !!errors.eventName?.message })}
              >
                {errors.eventName?.message || "Event name"}
              </label>
            </div>
          </div>
          <div className={styles.add_event__footer}>
            <Button
              type='submit'
              variant={ButtonVariant.Primary}
              className={styles.add_event__save_btn}
            >
              Save
            </Button>
          </div>
        </div >
      </form>
    </DialogWrapper>
  )
}
