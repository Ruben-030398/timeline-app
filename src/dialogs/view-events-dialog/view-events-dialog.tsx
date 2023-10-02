import React from 'react'
import DialogWrapper from '../../components/dialog-wrapper/dialog-wrapper'
import { useAppDispatch, useAppSelector } from '../../store'
import styles from './view-events-dialog.module.sass';
import Button, { ButtonVariant } from '../../components/button/button';
import { Trash2, X } from 'lucide-react';
import { TimelineEvent, updateTimeline } from '../../store/slices/timelines';
import { useFieldArray, useForm } from 'react-hook-form';
import Input from '../../components/input/input';
import validatorScheme from './validator-scheme';
import { yupResolver } from '@hookform/resolvers/yup';

export type ViewEventsDialogProps = {
  timelineId: string;
  onClose: () => void
}

export type ViewEventsDialogForm = {
  events: Array<TimelineEvent>
}

const ViewEventsDialog: React.FC<ViewEventsDialogProps> = ({ timelineId, onClose }) => {
  const timeline = useAppSelector(state => state.timelines).find(timeline => timeline.timelineId === timelineId)!;
  const dispatch = useAppDispatch();

  const { control, register, handleSubmit, formState: { errors, isDirty } } = useForm<ViewEventsDialogForm>({
    resolver: yupResolver(validatorScheme),
    reValidateMode: 'onChange',
    defaultValues: {
      events: timeline.events
    }
  });


  const {
    fields,
    remove,
  } = useFieldArray({
    control,
    name: 'events'
  });


  const onSubmit = (data: ViewEventsDialogForm) => {
    dispatch(updateTimeline({ timelineId, events: data.events }));

    onClose();
  }

  return (
    <DialogWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.view_event}>
          <div className={styles.view_event__title}>
            <h2>Timeline events {
              timeline.startIndex === timeline.endIndex
                ? `${timeline.startIndex + 1} sec`
                : `( ${timeline.startIndex + 1} - ${timeline.endIndex + 1} ) sec`
              }
            </h2>
            <Button
              type='button'
              onClick={onClose}
              variant={ButtonVariant.Secondary}
              className={styles.view_event__close_btn}
            >
              <X />
            </Button>
          </div>
          <div className={styles.view_event__body}>
            {
              errors.events?.root?.message ?
                <p className={styles.title_3_red}>{errors.events?.root?.message}</p>
                : fields.map((filed, index) => (
                  <div key={filed.id} className={styles.view_event__body__row}>
                    <p>{index + 1}</p>
                    <div className={styles.view_event__body__row__content}>
                      <Input
                        id={`events.${index}.event`}
                        className={styles.view_event__body__input}
                        {...register(`events.${index}.event`)} />
                      {errors.events && errors.events[index]?.event?.message && <label htmlFor={`events.${index}.event`}>{errors.events[index]?.event?.message}</label>}
                    </div>

                    <Button
                      type='button'
                      onClick={() => remove(index)}
                      variant={ButtonVariant.Secondary}
                      className={styles.view_event__remove_btn}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))
            }
          </div>
          <div className={styles.view_event__footer}>
            <Button
              type='submit'
              variant={ButtonVariant.Primary}
              className={styles.view_event__save_btn}
              disabled={!isDirty}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </DialogWrapper>

  )
}

export default ViewEventsDialog