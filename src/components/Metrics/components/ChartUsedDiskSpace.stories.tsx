import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import { ChartKafkaInstanceMetrics } from './ChartKafkaInstanceMetrics'
import MetricsI18n from '../Metrics-i18n.json'

export default {
  title: 'Metrics/Components/ChartKafkaInstanceMetrics',
  component: ChartKafkaInstanceMetrics,
  args: {
    duration: 5,
  },
  parameters: {
    i18n: MetricsI18n,
  },
} as ComponentMeta<typeof ChartKafkaInstanceMetrics>

const Template: ComponentStory<typeof ChartKafkaInstanceMetrics> = (args) => (
  <ChartKafkaInstanceMetrics {...args} />
)

export const UnderLimits = Template.bind({})
UnderLimits.args = {
  metrics: {
    1636546066048: 74297344789,
    1636546166048: 74502144789,
    1636546266048: 119756096789,
    1636546366048: 119948608789,
    1636546466048: 75231232789,
  },
}

export const OverLimits = Template.bind({})
OverLimits.args = {
  metrics: {
    1636546066048: 74297344789,
    1636546166048: 74502144789,
    1636546266048: 2197560967890,
    1636546366048: 119948608789,
    1636546466048: 75231232789,
  },
}
