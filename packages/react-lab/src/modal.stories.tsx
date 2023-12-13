import React from 'react';
import { StoryFn } from '@storybook/react';
import { button, overlay, modal } from '@tecsinapse/cortex-core';
export default {
  title: 'Lab/Modal',
  component: <div />,
};

const Template: StoryFn = () => {
  return (
    <div>
      <input type="checkbox" id="modal-toggle" className="sr-only peer" />
      <label
        htmlFor={'modal-toggle'}
        className={button({
          intent: 'primary',
          className: 'flex justify-center items-center',
        })}
      >
        <p>Open/close drawer</p>
      </label>
      <label className={overlay()} htmlFor={'modal-toggle'}></label>
      <dialog
        id="modal"
        className={modal({
          className: 'gap-deca flex-col max-w-[400px] bottom-[300px]',
        })}
      >
        <p className={'text-primary-medium text-h3'}>Title</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <label htmlFor={'modal-toggle'} className={button()}>
          Close modal
        </label>
      </dialog>
    </div>
  );
};

export const Base = Template.bind({});

Base.args = {};
