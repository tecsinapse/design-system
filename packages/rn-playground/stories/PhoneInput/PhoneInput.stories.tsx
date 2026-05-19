import { Meta, StoryFn } from '@storybook/react';
import { PhoneInput } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { View } from 'react-native';

const StoryMeta: Meta<typeof PhoneInput> = {
  title: 'PhoneInput',
  component: PhoneInput,
  args: {
    defaultCountry: 'br',
    label: 'Phone number',
    countryModalTitle: 'Select country',
    hasSearch: true,
  },
};

export default StoryMeta;

type IStory = StoryFn<typeof PhoneInput>;

export const Base: IStory = args => {
  const [phone, setPhone] = useState<string | undefined>(undefined);

  return (
    <View style={{ padding: 16, width: '100%' }}>
      <PhoneInput
        {...args}
        value={phone}
        onChange={nextPhone => setPhone(nextPhone)}
      />
    </View>
  );
};

export const Disabled: IStory = args => {
  return (
    <View style={{ padding: 16, width: '100%' }}>
      <PhoneInput
        {...args}
        disabled
        value="+5511999999999"
        hint="Phone input disabled"
      />
    </View>
  );
};
