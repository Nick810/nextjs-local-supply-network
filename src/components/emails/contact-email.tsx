import { Html, Head, Preview, Section, Text } from '@react-email/components';

export const ContactEmail = ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => (
  <Html>
    <Head />
    <Preview>New contact form submission</Preview>
    <Section>
      <Text>From: {name} ({email})</Text>
      <Text>Message:</Text>
      <Text>{message}</Text>
    </Section>
  </Html>
);
