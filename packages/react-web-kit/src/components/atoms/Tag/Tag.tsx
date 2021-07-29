import React from 'react';
import { Text, Tag as TagCore, TagProps as TagCoreProps } from '@tecsinapse/react-core';

export interface TagProps extends Omit<TagCoreProps, 'value'> {
    value: string
};

const Tag: React.FC<TagProps> = ({ value, ...rest }): JSX.Element => {
    return (
        <TagCore
            value={<Text
                colorVariant='secondary'
                colorTone='dark'
                fontStack='default'
                fontWeight='bold'
                typography={rest.variant === 'small' ? 'sub' : 'base'}
            >{value}</Text>}
            {...rest}
        />
    );
};

export default Tag;
