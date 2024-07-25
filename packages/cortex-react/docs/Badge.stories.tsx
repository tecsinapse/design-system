import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Badge, BadgeAnchor, Button } from "../src";

export default {
    title: 'Cortex/Badge',
    component: Badge,
    subcomponents: { BadgeAnchor }
} as Meta<typeof Badge>


const baseArgs = {
    value: 4,
    variants: {
        intent: 'primary'
    }
}

export const Default: StoryObj<typeof Badge> = ({
    args: {
        ...baseArgs
    },
    render: (args) => <Badge variants={args.variants} value={args.value} />
})

export const Anchor: StoryObj<typeof BadgeAnchor> = ({
    args: {
        ...baseArgs,
        variants: {
            ...baseArgs.variants,
            isAnchor: true
        }
    },
    render: (args) => <BadgeAnchor
    variants={args.variants}
    value={args.value}
  >
    <Button variants={{ variant: 'outline' }}>
      <p>Button</p>
    </Button>
  </BadgeAnchor>
})
    