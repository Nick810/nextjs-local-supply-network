import { Html, Head, Preview, Section, Text } from '@react-email/components';

export const WelcomeEmail = ({ firstName }: { firstName: string }) => (
  <Html>
    <Head />
    <Preview>Welcome to Powerberry!</Preview>
    <Section>
      <Text>Hi {firstName},</Text>
      <Text>Thanks for joining us!</Text>
    </Section>
  </Html>
);
