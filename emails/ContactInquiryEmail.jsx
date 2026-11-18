import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from "@react-email/components";

export default function ContactInquiryEmail({
  name = "Visitor",
  email = "visitor@example.com",
  service = "Partnerships",
  message = "",
}) {
  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <style>{`
          :root { color-scheme: light; supported-color-schemes: light; }
          @media (prefers-color-scheme: dark) {
            .em-body { background-color: #1a0305 !important; }
            .em-container { background-color: #2e0609 !important; }
            .em-header { background-color: #6e0d14 !important; }
            .em-card { background-color: #eae3d5 !important; color: #1c0a0b !important; }
            .em-brief { background-color: #f5f0e6 !important; }
            .em-footer { background-color: #2e0609 !important; }
            .em-ink { color: #1c0a0b !important; }
            .em-red { color: #6e0d14 !important; }
            .em-beige { color: #eae3d5 !important; }
            .em-muted { color: #d8c7c4 !important; }
            .em-btn { background-color: #6e0d14 !important; color: #eae3d5 !important; }
          }
        `}</style>
      </Head>
      <Preview>{`New ${service} inquiry from ${name}`}</Preview>
      <Body className="em-body" style={main} bgcolor="#1a0305">
        <Container className="em-container" style={container} bgcolor="#2e0609">
          <Section className="em-header" style={header} bgcolor="#6e0d14">
            <Row>
              <Column style={{ width: "48px", verticalAlign: "middle" }}>
                <Img
                  src="https://lafaagency.com/shortcut-icon.png"
                  width="38"
                  height="38"
                  alt="Lafa Agency"
                  style={logo}
                />
              </Column>
              <Column style={{ verticalAlign: "middle" }}>
                <Text className="em-muted" style={eyebrow}>
                  LAFA AGENCY · TALENT &amp; CREATORS
                </Text>
                <Heading className="em-beige" style={title}>
                  New Project Inquiry
                </Heading>
              </Column>
            </Row>
          </Section>

          <Section className="em-card" style={card} bgcolor="#eae3d5">
            <Row style={metaRow}>
              <Column style={metaCol}>
                <Text className="em-red" style={label}>NAME / BRAND</Text>
                <Text className="em-ink" style={value}>{name}</Text>
              </Column>
              <Column style={metaCol}>
                <Text className="em-red" style={label}>SERVICE INTEREST</Text>
                <Text className="em-btn" style={serviceBadge}>{service}</Text>
              </Column>
            </Row>

            <Text className="em-red" style={label}>CONTACT EMAIL</Text>
            <Text className="em-ink" style={value}>{email}</Text>

            <Hr style={divider} />

            <Text className="em-red" style={label}>PROJECT BRIEF</Text>
            <Section className="em-brief" style={briefBox} bgcolor="#f5f0e6">
              <Text className="em-ink" style={messageText}>
                {message || "No brief provided."}
              </Text>
            </Section>

            <Section style={ctaWrap}>
              <Button
                className="em-btn"
                href={`mailto:${email}?subject=Re: ${encodeURIComponent(service)} Inquiry - Lafa Agency`}
                style={ctaBtn}
              >
                Reply to {name} ↗
              </Button>
            </Section>
          </Section>

          <Section className="em-footer" style={footer} bgcolor="#2e0609">
            <Text className="em-muted" style={footerText}>
              LAFA AGENCY · LAFAAGENCY.COM · BUSINESS@LAFAAGENCY.COM
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#1a0305",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: "40px 16px",
};

const container = {
  maxWidth: "580px",
  margin: "0 auto",
  backgroundColor: "#2e0609",
  border: "1px solid #4d171c",
  borderRadius: "10px",
  overflow: "hidden",
};

const header = {
  backgroundColor: "#6e0d14",
  padding: "28px 32px",
};

const logo = {
  borderRadius: "8px",
  border: "1px solid #9e3d44",
};

const eyebrow = {
  margin: "0 0 4px",
  fontSize: "10px",
  fontWeight: "600",
  letterSpacing: "0.2em",
  color: "#e6d1ce",
};

const title = {
  margin: "0",
  fontSize: "24px",
  fontWeight: "600",
  color: "#eae3d5",
  letterSpacing: "-0.02em",
};

const card = {
  padding: "30px 32px",
  backgroundColor: "#eae3d5",
  color: "#1c0a0b",
};

const metaRow = {
  marginBottom: "6px",
};

const metaCol = {
  width: "50%",
  verticalAlign: "top",
};

const label = {
  margin: "0 0 5px",
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "0.16em",
  color: "#6e0d14",
};

const value = {
  margin: "0 0 18px",
  fontSize: "16px",
  fontWeight: "600",
  color: "#1c0a0b",
};

const serviceBadge = {
  display: "inline-block",
  margin: "0 0 18px",
  padding: "5px 12px",
  backgroundColor: "#6e0d14",
  color: "#eae3d5",
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "0.04em",
  borderRadius: "999px",
};

const divider = {
  borderColor: "#cfc4b2",
  margin: "8px 0 20px",
};

const briefBox = {
  backgroundColor: "#f5f0e6",
  border: "1px solid #d9cfbd",
  borderRadius: "6px",
  padding: "16px 18px",
};

const messageText = {
  margin: "0",
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#1c0a0b",
  whiteSpace: "pre-wrap",
};

const ctaWrap = {
  marginTop: "24px",
};

const ctaBtn = {
  display: "inline-block",
  backgroundColor: "#6e0d14",
  color: "#eae3d5",
  fontSize: "13px",
  fontWeight: "600",
  letterSpacing: "0.06em",
  textDecoration: "none",
  padding: "12px 22px",
  borderRadius: "999px",
};

const footer = {
  padding: "18px 32px",
  backgroundColor: "#2e0609",
};

const footerText = {
  margin: "0",
  fontSize: "11px",
  letterSpacing: "0.14em",
  color: "#bfa8a5",
  textAlign: "center",
};
