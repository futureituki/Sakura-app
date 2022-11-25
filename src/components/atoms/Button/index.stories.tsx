import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { PrimaryButton } from './index'

// export default {
//   title: "Atoms/Button",

//   component: PrimaryButton,

// } as ComponentMeta<typeof PrimaryButton>;

// storyです
// このコンポーネントにいろんな引数を与えて
// 色んなパターンの表示を見ることができます。
// storyはそれぞれ独立しているので、このように中身が同じアロー関数を与えても大丈夫です。（通常は色々なパターンの引数を与えシミュレートします。）

// export const Default = () => <PrimaryButton variant='contained' color='mainColor' label='test'>Click me</PrimaryButton>;

// export const Default2 = () => <Button>Click me</Button>;

// export const Default3 = () => <Button>Click me</Button>;
export default {
  title: 'Atoms/Button',
  component: PrimaryButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: {
      options: ['#ff4c90', '#bb77ff'],
      control: { type: 'radio' },
    },
    background: {
      options: ['#ff4c90', '#bb77ff'],
      control: { type: 'radio' },
    },
    label: {
      control: { type: 'text' },
    },
    variant: {
      options: ['outlined', 'contained'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof PrimaryButton>

export const Template: ComponentStory<typeof PrimaryButton> = (args) => (
  <PrimaryButton {...args}>Test</PrimaryButton>
)

export const Index = Template.bind({})
Index.args = {
  color: '#ff4c90',
  background: '#bb77ff',
  label: '',
  variant: 'contained',
}
