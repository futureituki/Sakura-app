import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { Heading } from './index'

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
  title: 'Atoms/Heading',
  component: Heading,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    level: {
      options: [1, 2, 3, 4, 5, 6],
      control: { type: 'radio' },
    },
    visualLevel: {
      options: [1, 2, 3, 4, 5, 6],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Heading>

export const Template: ComponentStory<typeof Heading> = (args) => <Heading {...args}>Test</Heading>

export const Index = Template.bind({})
Index.args = {
  level: 1,
  visualLevel: 2,
}
