// emails/Welcome.tsx
import {
  Html, Head, Preview, Body, Container, Heading, Text, Button, Hr, Link,
} from '@react-email/components';

type Props = {
  firstName?: string;
  discordInviteUrl?: string;
  siteUrl?: string;
};

export default function WelcomeEmail({
  firstName = 'there',
  discordInviteUrl = 'https://discord.gg/U82NkuVc', // default; 
  siteUrl = 'https://spryntr.co',
}: Props) {
  // Small helpers
  const name = (firstName || 'there').trim();
  const preheader = `You're on the Spryntr waitlist — here’s what’s next`;

  return (
    <Html>
      <Head />
      <Preview>{preheader}</Preview>

      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', margin: 0 }}>
        <Container style={{ padding: 24, maxWidth: 520, margin: '0 auto' }}>
          <Heading style={{ margin: '0 0 12px', lineHeight: 1.2 }}>
            Thanks for joining, {name}! 🎉
          </Heading>

          <Text style={{ margin: '0 0 14px', color: '#333' }}>
            You’re in the Spryntr waitlist. We’ll be in touch soon with next steps and early access updates.
          </Text>

          <Button
            href={discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: '#000',
              color: '#fff',
              padding: '12px 20px',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Join our Discord
          </Button>

          {/* Fallback for clients that block buttons */}
          <Text style={{ margin: '12px 0 0', fontSize: 12, color: '#666' }}>
            Can’t click the button? Paste this link in your browser:{' '}
            <Link href={discordInviteUrl} target="_blank" rel="noopener noreferrer">
              {discordInviteUrl}
            </Link>
          </Text>

          <Hr style={{ borderColor: '#eee', margin: '24px 0' }} />

          <Text style={{ color: '#555', margin: 0 }}>
            Have questions? Just reply to this email and our team will help.
          </Text>
          <Text style={{ color: '#999', fontSize: 12, marginTop: 12 }}>
            From the Spryntr Team · <Link href={siteUrl}>{siteUrl}</Link>
          </Text>
          <Text style={{ color: '#aaa', fontSize: 11, marginTop: 6 }}>
            If this wasn’t you, you can safely ignore this message.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/** Optional: make preview nice in `npm run dev:email` */
export const PreviewProps: Props = {
  firstName: 'Shammah',
  discordInviteUrl: 'https://discord.gg/U82NkuVc',
  siteUrl: 'https://spryntr.co',
};
