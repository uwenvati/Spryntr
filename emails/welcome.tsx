// emails/Welcome.tsx
import {
  Html, Head, Preview, Body, Container, Heading, Text, Button, Hr, Link, Img
} from '@react-email/components';

type Props = {
  firstName?: string;
  discordInviteUrl?: string;
  siteUrl?: string;
};

export default function WelcomeEmail({
  firstName = 'there',
  discordInviteUrl = 'https://discord.gg/U82NkuVc',
  siteUrl = 'https://spryntr.co', // still used for unsubscribe + footer
}: Props) {
  const name = (firstName || 'there').trim();

  const productName = 'Cortex';
  const companyName = 'Spryntr';
  const founderName = 'Vem';
  const supportEmail = 'vem@spryntr.co';

  // ✅ Always-public absolute URLs (avoid localhost in emails)
  const logoUrl = 'https://spryntr.co/email-logo.png';
  const handshakeUrl = 'https://spryntr.co/email-hand.png';

  const preheader = `You're on the ${productName} waitlist — here’s what’s next`;

  const card: React.CSSProperties = {
    border: '1px solid #D9D9D9',
    borderRadius: 8,
    padding: 18,
    margin: '22px 0',
  };

  const bulletList: React.CSSProperties = {
    margin: '6px 0 0 18px',
    padding: 0,
    lineHeight: 1.8,
    color: '#333',
  };

  return (
    <Html>
      <Head />
      <Preview>{preheader}</Preview>

      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', margin: 0 }}>
        <Container style={{ padding: 24, maxWidth: 520, margin: '0 auto' }}>
          {/* Logo + handshake */}
          <div style={{ textAlign: 'center', marginTop: 8, marginBottom: 10 }}>
            <Img src={logoUrl} alt={companyName} width="110" style={{ margin: '0 auto 18px', display: 'block' }} />
            <Img src={handshakeUrl} alt="Handshake" width="150" style={{ margin: '0 auto 8px', display: 'block' }} />
          </div>

          {/* Greeting */}
          <Heading style={{ margin: '20px 0 8px', lineHeight: 1.25, fontSize: 24, textAlign: 'center' }}>
            Hi {name},
          </Heading>

          {/* Founder line */}
          <Text style={{ margin: '0 0 18px', color: '#111', textAlign: 'center', fontWeight: 600 }}>
            Thanks for joining the {productName} waitlist! I'm {founderName}, founder of {companyName}, and
            I'm excited to have you as part of our early community.
          </Text>

          {/* Intro paragraph — Spryntr-specific */}
          <Text style={{ margin: '0 0 10px', color: '#333' }}>
            {productName} is going to change the way you bring order to messy organizational data.
            With {companyName}, you’ll be able to unify scattered information, manage workflows, and
            unlock insights effortlessly. We’re putting the finishing touches on something really
            special, and you’ll be among the first to experience it.
          </Text>

          {/* Box: What happens next + Stay connected */}
          <div style={card}>
            <Heading as="h3" style={{ margin: 0, fontSize: 16 }}>What happens next?</Heading>
            <ul style={bulletList}>
              <li>You&apos;ll get exclusive updates on our development progress</li>
              <li>Early access when we launch</li>
              <li>Special benefits and pricing</li>
            </ul>

            <Text style={{ textAlign: 'center', marginTop: 8, color: '#999' }}>.</Text>

            <Heading as="h3" style={{ margin: '8px 0 0', fontSize: 16 }}>Stay connected:</Heading>
            <ul style={bulletList}>
              <li>
                Follow our journey on{' '}
                <Link href="https://discord.gg/U82NkuVc" target="_blank" rel="noopener noreferrer">
                  Discord
                </Link>.
              </li>
              <li>
                Reply to this email with any questions — I personally read every message ({supportEmail}).
              </li>
              <li>
                Refer friends with your unique link: <Link href="https://spryntr.co">spryntr.co</Link>
              </li>
            </ul>
          </div>

          {/* CTA (Discord) */}
          <div style={{ textAlign: 'left', marginTop: 12 }}>
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
            <Text style={{ margin: '10px 0 0', fontSize: 12, color: '#666' }}>
              Can’t click the button? Paste this link in your browser:{' '}
              <Link href={discordInviteUrl} target="_blank" rel="noopener noreferrer">
                {discordInviteUrl}
              </Link>
            </Text>
          </div>

          {/* Closing */}
          <Text style={{ margin: '18px 0', color: '#333' }}>
            I&apos;ll be in touch soon with more exciting updates. Thanks for believing in what we&apos;re building!
          </Text>

          {/* Signature */}
          <Text style={{ color: '#111', margin: '0 0 26px' }}>
            Best, {founderName}<br />
            Founder, {companyName}<br />
            {supportEmail}
          </Text>

          <Hr style={{ borderColor: '#E6E6E6', margin: '12px 0 18px' }} />

          {/* Social row (Discord only) */}
          <div style={{ textAlign: 'center', marginBottom: 14 }}>
            <Link href="https://discord.gg/U82NkuVc">Discord</Link>
          </div>

          {/* Footer */}
          <Text style={{ color: '#666', fontSize: 12, textAlign: 'center', marginTop: 6 }}>
            You&apos;re receiving this because you signed up for the {productName} waitlist.{' '}
            <Link href={`${siteUrl}/unsubscribe`}>Unsubscribe</Link> if you no longer wish to receive updates.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/** Local preview props */
export const PreviewProps: Props = {
  firstName: 'Shammah',
  discordInviteUrl: 'https://discord.gg/U82NkuVc',
  siteUrl: 'https://spryntr.co', // ensure https for image loading in previews too
};
