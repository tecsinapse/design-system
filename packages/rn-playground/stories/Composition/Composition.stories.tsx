import React, { useState } from 'react';
import { View } from 'react-native';
import { Meta } from '@storybook/react-vite';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Header,
  Icon,
  Input,
  Select,
  Snackbar,
  Tag,
  Text,
} from '@tecsinapse/cortex-native';

/**
 * Reference gallery for the Tier 1 compound components: every compound's
 * composed spelling (`X.Root`/`X.Part` statics) next to its monolith,
 * prop-driven spelling, plus the className override precedence contract
 * (recipe/variant classes -> consumer `className` (twMerge, consumer wins)
 * -> consumer `style` (absolute, RN semantics)).
 */
const StoryMeta: Meta = {
  title: 'Composition',
};

export default StoryMeta;

const Caption = ({ children }: { children: React.ReactNode }) => (
  <Text typography="label" fontWeight="bold" colorVariant="secondary" className="mb-mili">
    {children}
  </Text>
);

const Example = ({ children }: { children: React.ReactNode }) => (
  <View className="mb-deca">{children}</View>
);

type SelectOption = { label: string; key: number };

const selectOptions: SelectOption[] = new Array(6)
  .fill(undefined)
  .map((_, index) => ({ key: index, label: `Option ${index}` }));

const selectLabelExtractor = (item: SelectOption) => item.label;
const selectKeyExtractor = (item: SelectOption) => String(item.key);

export const CardComposedVsMonolith = () => (
  <View className="p-deca">
    <Caption>Composed — Card.Header / Card.Body / Card.Footer statics</Caption>
    <Example>
      <Card>
        <Card.Header>
          <Text>Header</Text>
        </Card.Header>
        <Card.Body>
          <Text>Body</Text>
        </Card.Body>
        <Card.Footer>
          <Text>Footer</Text>
        </Card.Footer>
      </Card>
    </Example>

    <Caption>
      Monolith — flat CardHeader / CardBody / CardFooter aliases (same
      component references as the statics above)
    </Caption>
    <Example>
      <Card>
        <CardHeader>
          <Text>Header</Text>
        </CardHeader>
        <CardBody>
          <Text>Body</Text>
        </CardBody>
        <CardFooter>
          <Text>Footer</Text>
        </CardFooter>
      </Card>
    </Example>
  </View>
);

export const InputComposedVsMonolith = () => {
  const [composedValue, setComposedValue] = useState('');
  const [monolithValue, setMonolithValue] = useState('');

  return (
    <View className="p-deca">
      <Caption>
        Composed — Input.Face / Input.Left / Input.Box / Input.Right /
        Input.Hint statics
      </Caption>
      <Example>
        <Input.Face label="Amount">
          <Input.Left>
            <Text>R$</Text>
          </Input.Left>
          <Input.Box
            placeholder="0,00"
            value={composedValue}
            onChange={setComposedValue}
          />
          <Input.Right>
            <Text>kg</Text>
          </Input.Right>
        </Input.Face>
        <Input.Hint text="Helper text" variant="default" />
      </Example>

      <Caption>
        Monolith — legacy leftComponent / rightComponent / hint props
      </Caption>
      <Example>
        <Input
          label="Amount"
          placeholder="0,00"
          value={monolithValue}
          onChange={setMonolithValue}
          leftComponent={<Text>R$</Text>}
          rightComponent={<Text>kg</Text>}
          hint="Helper text"
        />
      </Example>
    </View>
  );
};

export const ButtonComposedVsMonolith = () => (
  <View className="p-deca">
    <Caption>Composed — Button.Icon / Button.Label statics</Caption>
    <Example>
      <Button intent="primary" variant="filled">
        <Button.Icon name="checkmark" type="ionicon" />
        <Button.Label>Save</Button.Label>
      </Button>
    </Example>

    <Caption>Monolith — legacy title prop</Caption>
    <Example>
      <Button title="Save" intent="primary" variant="filled" />
    </Example>
  </View>
);

export const HeaderComposedVsMonolith = () => (
  <View className="p-deca">
    <Caption>Composed — Header.Left / Header.Title / Header.Right statics</Caption>
    <Example>
      <Header>
        <Header.Left>
          <Icon name="menu" type="ionicon" />
        </Header.Left>
        <Header.Title>
          <Text>Title</Text>
        </Header.Title>
        <Header.Right>
          <Icon name="close" type="ionicon" />
        </Header.Right>
      </Header>
    </Example>

    <Caption>Monolith — legacy leftButton / rightButton props</Caption>
    <Example>
      <Header
        leftButton={{ icon: { name: 'menu', type: 'ionicon' } }}
        rightButton={{ icon: { name: 'close', type: 'ionicon' } }}
      >
        <Text>Title</Text>
      </Header>
    </Example>
  </View>
);

export const SnackbarComposed = () => {
  const [open, setOpen] = useState(true);

  return (
    <View className="p-deca">
      <Caption>
        Composed — Snackbar.Icon / Snackbar.Content / Snackbar.Action statics
      </Caption>
      <Text className="mb-mili">
        Bottom-anchored snackbar with a leading checkmark icon and a
        trailing close icon. Tap the close icon to dismiss it, then tap
        &quot;Show snackbar&quot; below to bring it back.
      </Text>
      <Text className="mb-mili" typography="sub" colorVariant="secondary">
        Snackbar positions itself absolutely against its nearest positioned
        ancestor, so this demo gives it a dedicated relative, fixed-height box
        to sit in — without one, it would overlap this text instead of
        flowing below it.
      </Text>
      <View className="relative h-[100px] mb-deca">
        <Snackbar open={open} colorVariant="success" onClose={() => setOpen(false)}>
          <Snackbar.Icon name="checkmark-circle-outline" type="ionicon" />
          <Snackbar.Content>
            <Text colorVariant="success" colorTone="medium">
              Saved successfully
            </Text>
          </Snackbar.Content>
          <Snackbar.Action />
        </Snackbar>
      </View>
      <Button
        title="Show snackbar"
        intent="secondary"
        variant="outline"
        disabled={open}
        onPress={() => setOpen(true)}
      />
    </View>
  );
};

export const SnackbarMonolith = () => {
  const [open, setOpen] = useState(true);

  return (
    <View className="p-deca">
      <Caption>
        Monolith — legacy leftIcon / dismissable / rightIcon props. Should
        look identical to the composed story above.
      </Caption>
      <Text className="mb-mili">
        Bottom-anchored snackbar built from the legacy leftIcon /
        dismissable / rightIcon props instead of the Icon/Content/Action
        statics. Tap the close icon to dismiss it, then tap &quot;Show
        snackbar&quot; below to bring it back.
      </Text>
      <Text className="mb-mili" typography="sub" colorVariant="secondary">
        Snackbar positions itself absolutely against its nearest positioned
        ancestor, so this demo gives it a dedicated relative, fixed-height box
        to sit in — without one, it would overlap this text instead of
        flowing below it.
      </Text>
      <View className="relative h-[100px] mb-deca">
        <Snackbar
          open={open}
          colorVariant="success"
          dismissable
          onClose={() => setOpen(false)}
          leftIcon={{
            name: 'checkmark-circle-outline',
            type: 'ionicon',
            colorVariant: 'success',
            colorTone: 'medium',
          }}
          rightIcon={{ colorTone: 'medium', colorVariant: 'success' }}
        >
          <Text colorVariant="success" colorTone="medium">
            Saved successfully
          </Text>
        </Snackbar>
      </View>
      <Button
        title="Show snackbar"
        intent="secondary"
        variant="outline"
        disabled={open}
        onPress={() => setOpen(true)}
      />
    </View>
  );
};

export const TagComposedVsMonolith = () => (
  <View className="p-deca">
    <Caption>Composed — Tag.Icon / Tag.Label / Tag.Close statics</Caption>
    <Example>
      <Tag>
        <Tag.Icon name="stopwatch" type="fontisto" />
        <Tag.Label>Label</Tag.Label>
        <Tag.Close />
      </Tag>
    </Example>

    <Caption>Monolith — legacy value / icon / dismiss props</Caption>
    <Example>
      <Tag
        value="Label"
        variant="small"
        dismiss
        icon={{ name: 'stopwatch', type: 'fontisto' }}
      />
    </Example>
  </View>
);

export const SelectComposedVsMonolith = () => {
  const [composedValue, setComposedValue] = useState<
    SelectOption | undefined
  >(undefined);
  const [monolithValue, setMonolithValue] = useState<
    SelectOption | undefined
  >(undefined);

  return (
    <View className="p-deca">
      <Caption>
        Composed — controlComponent rendering Select.Trigger explicitly
      </Caption>
      <Example>
        <Select
          label="Select"
          placeholder="Choose..."
          selectModalTitle="Choose an option"
          confirmButtonText="Confirm"
          hideSearchBar
          options={selectOptions}
          type="single"
          value={composedValue}
          onSelect={setComposedValue}
          keyExtractor={selectKeyExtractor}
          labelExtractor={selectLabelExtractor}
          controlComponent={() => <Select.Trigger />}
        />
      </Example>

      <Caption>Monolith — default trigger, no controlComponent</Caption>
      <Example>
        <Select
          label="Select"
          placeholder="Choose..."
          selectModalTitle="Choose an option"
          confirmButtonText="Confirm"
          hideSearchBar
          options={selectOptions}
          type="single"
          value={monolithValue}
          onSelect={setMonolithValue}
          keyExtractor={selectKeyExtractor}
          labelExtractor={selectLabelExtractor}
        />
      </Example>
    </View>
  );
};

export const ClassNameOverridePrecedence = () => (
  <View className="p-deca">
    <Caption>
      Card — recipe class (bg-surface-overlay) vs className=&quot;bg-primary-light&quot;
    </Caption>
    <Example>
      <Text className="mb-micro">Default: card paints with bg-surface-overlay</Text>
      <Card>
        <Card.Body>
          <Text>Default surface</Text>
        </Card.Body>
      </Card>
    </Example>
    <Example>
      <Text className="mb-micro">
        className=&quot;bg-primary-light&quot;: consumer class wins, bg-surface-overlay is
        removed from the merged string (twMerge), not just painted over
      </Text>
      <Card className="bg-primary-light">
        <Card.Body>
          <Text>bg-primary-light surface</Text>
        </Card.Body>
      </Card>
    </Example>

    <Caption>
      Button — recipe corner radius vs className=&quot;rounded-full&quot;
    </Caption>
    <Example>
      <Text className="mb-micro">Default: buttonStyles recipe corner radius</Text>
      <Button title="Save" />
    </Example>
    <Example>
      <Text className="mb-micro">
        className=&quot;rounded-full&quot;: consumer class wins over the recipe&apos;s corner
        radius class
      </Text>
      <Button title="Save" className="rounded-full" />
    </Example>
  </View>
);
