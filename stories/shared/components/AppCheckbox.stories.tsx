import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AppCheckBox from "@/modules/shared/components/AppCheckbox";

const meta = {
  title: "Shared/Components/AppCheckbox",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    isDeselect: {
      control: "boolean",
      description: "Whether the checkbox is in deselect mode",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Unchecked: Story = {
  render: function UncheckedRender(args) {
    const [checked, setChecked] = React.useState<boolean | "indeterminate">(
      false,
    );

    return (
      <AppCheckBox
        {...args}
        name="checkbox-unchecked"
        value={checked}
        onChange={setChecked}
        label="Unchecked checkbox"
      />
    );
  },
};

export const Checked: Story = {
  render: function CheckedRender(args) {
    const [checked, setChecked] = React.useState<boolean | "indeterminate">(
      true,
    );

    return (
      <AppCheckBox
        {...args}
        name="checkbox-checked"
        value={checked}
        onChange={setChecked}
        label="Checked checkbox"
      />
    );
  },
};

export const Indeterminate: Story = {
  render: function IndeterminateRender(args) {
    const [checked, setChecked] = React.useState<boolean | "indeterminate">(
      "indeterminate",
    );

    return (
      <AppCheckBox
        {...args}
        name="checkbox-indeterminate"
        value={checked}
        onChange={setChecked}
        label="Indeterminate state"
      />
    );
  },
};

export const WithoutLabel: Story = {
  render: function WithoutLabelRender(args) {
    const [checked, setChecked] = React.useState<boolean | "indeterminate">(
      false,
    );

    return (
      <AppCheckBox
        {...args}
        name="checkbox-no-label"
        value={checked}
        onChange={setChecked}
      />
    );
  },
};

export const DisabledUnchecked: Story = {
  render: function DisabledUncheckedRender(args) {
    const [checked, setChecked] = React.useState<boolean | "indeterminate">(
      false,
    );

    return (
      <AppCheckBox
        {...args}
        name="checkbox-disabled-unchecked"
        value={checked}
        onChange={setChecked}
        label="Disabled unchecked"
        disabled
      />
    );
  },
};

export const DisabledChecked: Story = {
  render: function DisabledCheckedRender(args) {
    const [checked, setChecked] = React.useState<boolean | "indeterminate">(
      true,
    );

    return (
      <AppCheckBox
        {...args}
        name="checkbox-disabled-checked"
        value={checked}
        onChange={setChecked}
        label="Disabled checked"
        disabled
      />
    );
  },
};

export const DisabledIndeterminate: Story = {
  render: function DisabledIndeterminateRender(args) {
    const [checked, setChecked] = React.useState<boolean | "indeterminate">(
      "indeterminate",
    );

    return (
      <AppCheckBox
        {...args}
        name="checkbox-disabled-indeterminate"
        value={checked}
        onChange={setChecked}
        label="Disabled indeterminate"
        disabled
      />
    );
  },
};

export const DeselectMode: Story = {
  render: function DeselectModeRender(args) {
    const [checked, setChecked] = React.useState<boolean | "indeterminate">(
      true,
    );

    return (
      <AppCheckBox
        {...args}
        name="checkbox-deselect"
        value={checked}
        onChange={setChecked}
        onDeselect={() => {
          alert("Deselect callback triggered!");
          setChecked(false);
        }}
        label="Deselect mode (click to trigger deselect)"
        isDeselect
      />
    );
  },
};

export const AllStates: Story = {
  render: function AllStatesRender() {
    const [unchecked, setUnchecked] = React.useState<boolean | "indeterminate">(
      false,
    );
    const [checked, setChecked] = React.useState<boolean | "indeterminate">(
      true,
    );
    const [indeterminate, setIndeterminate] = React.useState<
      boolean | "indeterminate"
    >("indeterminate");
    const [deselect, setDeselect] = React.useState<boolean | "indeterminate">(
      true,
    );

    return (
      <div className="space-y-4">
        <AppCheckBox
          name="all-unchecked"
          value={unchecked}
          onChange={setUnchecked}
          label="Unchecked"
        />
        <AppCheckBox
          name="all-checked"
          value={checked}
          onChange={setChecked}
          label="Checked"
        />
        <AppCheckBox
          name="all-indeterminate"
          value={indeterminate}
          onChange={setIndeterminate}
          label="Indeterminate"
        />
        <AppCheckBox
          name="all-deselect"
          value={deselect}
          onChange={setDeselect}
          onDeselect={() => setDeselect(false)}
          label="Deselect mode"
          isDeselect
        />
        <AppCheckBox
          name="all-disabled-unchecked"
          value={false}
          onChange={() => {}}
          label="Disabled unchecked"
          disabled
        />
        <AppCheckBox
          name="all-disabled-checked"
          value={true}
          onChange={() => {}}
          label="Disabled checked"
          disabled
        />
        <AppCheckBox
          name="all-disabled-indeterminate"
          value="indeterminate"
          onChange={() => {}}
          label="Disabled indeterminate"
          disabled
        />
      </div>
    );
  },
};
