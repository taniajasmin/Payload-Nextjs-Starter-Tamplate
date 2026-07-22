import type { CollectionConfig } from 'payload'
import { adminOnlyAccess } from '../access/cmsAccess'

export const WebhookLogs: CollectionConfig = {
  slug: 'webhook-logs',
  access: adminOnlyAccess,
  admin: {
    useAsTitle: 'provider',
    defaultColumns: ['provider', 'eventType', 'direction', 'statusCode', 'timestamp', 'processed'],
    group: 'Integrations Section',
  },
  fields: [
    {
      name: 'provider',
      type: 'select',
      required: true,
      options: [
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'HubSpot', value: 'hubspot' },
        { label: 'Mailchimp', value: 'mailchimp' },
        { label: 'Intercom', value: 'intercom' },
        { label: 'Cloudflare', value: 'cloudflare' },
        { label: 'Payment Gateway', value: 'payment' },
        { label: 'Shipping API', value: 'shipping' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'eventType',
      type: 'text',
      required: true,
    },
    {
      name: 'direction',
      type: 'select',
      required: true,
      options: [
        { label: 'Inbound', value: 'inbound' },
        { label: 'Outbound', value: 'outbound' },
      ],
    },
    {
      name: 'payload',
      type: 'json',
    },
    {
      name: 'headers',
      type: 'json',
    },
    {
      name: 'statusCode',
      type: 'number',
    },
    {
      name: 'responseBody',
      type: 'textarea',
    },
    {
      name: 'errorMessage',
      type: 'textarea',
    },
    {
      name: 'signatureValid',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'timestamp',
      type: 'date',
      required: true,
    },
    {
      name: 'processed',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'processedAt',
      type: 'date',
    },
    {
      name: 'retryCount',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
