import React from 'react';
import { cn } from '@tecsinapse/cortex-core';
import Icon from '../../../atoms/Icon/Icon';
import Text from '../../../atoms/Text/Text';
import HintInputContainer from '../../HintInputContainer/HintInputContainer';
import { SelectTriggerRestProps, useSelectContext } from '../SelectContext';

export interface SelectTriggerProps extends SelectTriggerRestProps {}

const Trigger = ({
  className,
  testID,
  ...rest
}: SelectTriggerProps): React.ReactElement => {
  const {
    handlePressInput,
    focused,
    disabled,
    variant,
    hint,
    hintComponent,
    rightComponent,
    style,
    numberOfLines,
    label,
    getDisplayValue,
    triggerRest,
  } = useSelectContext();

  const { className: rootClassName, testID: rootTestID, ...restTrigger } =
    triggerRest;

  return (
    <HintInputContainer
      {...restTrigger}
      {...rest}
      testID={testID ?? rootTestID ?? 'select-trigger'}
      viewStyle={style}
      onPress={handlePressInput}
      focused={focused}
      disabled={disabled}
      LabelComponent={Text}
      variant={variant}
      hint={hint}
      hintComponent={hintComponent}
      label={label}
      className={cn(rootClassName, className)}
      rightComponent={
        <>
          <Icon name="chevron-down" type="ionicon" size="centi" />
          {rightComponent}
        </>
      }
    >
      <Text numberOfLines={numberOfLines} fontWeight="bold">
        {getDisplayValue() ?? ' '}
      </Text>
    </HintInputContainer>
  );
};

Trigger.displayName = 'Select.Trigger';

export default Trigger;
