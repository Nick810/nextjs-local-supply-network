import { Html, Head, Preview, Section, Text } from '@react-email/components';

export const WaitlistEmail = ({ 
  name,
  email,
  productTitle,
  varaintTitle
} : { 
  name: string 
  email: string; 
  productTitle: string; 
  varaintTitle: string;
}) => (
  <Html>
    <Head />
    <Preview>Waitlist Alert!</Preview>
    <Section>
      <Text>A customer wants to join a waitlist of { productTitle } - { varaintTitle },</Text>
      <Text>Name: { name }</Text>
      <Text>Email: { email }</Text>
    </Section>
  </Html>
);
