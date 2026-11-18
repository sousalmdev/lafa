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
  Section,
  Text,
} from "@react-email/components";

export default function ContactConfirmationEmail({
  name = "there",
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
            .em-sub { color: #6d5a58 !important; }
            .em-btn { background-color: #6e0d14 !important; color: #eae3d5 !important; }
          }
        `}</style>
      </Head>
      <Preview>{`We received your ${service} inquiry — Lafa Agency`}</Preview>
      <Body className="em-body" style={main} bgcolor="#1a0305">
        <Container className="em-container" style={container} bgcolor="#2e0609">
          <Section className="em-header" style={header} bgcolor="#6e0d14">
            <Img
              src="https://lafaagency.com/shortcut-icon.png"
              width="44"
              height="44"
              alt="Lafa Agency"
              style={logo}
            />
            <Text className="em-muted" style={eyebrow}>
              LAFA AGENCY · TALENT &amp; CREATORS
            </Text>
            <Heading className="em-beige" style={title}>
              We got your message, {name}.
            </Heading>
          </Section>

          <Section className="em-card" style={card} bgcolor="#eae3d5">
            <Text className="em-ink" style={lead}>
              Thank you for reaching out to <strong>Lafa Agency</strong>. Our team is reviewing your{" "}
              <strong>{service}</strong> inquiry and will get back to you within 1–2 business days.
            </Text>

            <Hr style={divider} />

            <Text className="em-red" style={label}>YOUR SUBMISSION SUMMARY</Text>
            <Section className="em-brief" style={summaryBox} bgcolor="#f5f0e6">
              <Text className="em-sub" style={summaryLabel}>SERVICE</Text>
              <Text className="em-red" style={summaryService}>{service}</Text>
              {message ? (
                <>
                  <Text className="em-sub" style={summaryLabel}>BRIEF</Text>
                  <Text className="em-ink" style={summaryText}>{message}</Text>
                </>
              ) : null}
            </Section>

            <Section style={ctaWrap}>
              <Button className="em-btn" href="https://lafaagency.com" style={ctaBtn}>
                Visit lafaagency.com ↗
              </Button>
            </Section>

            <Text className="em-ink" style={signoff}>
              Talk soon,
              <br />
              <strong>Lafa Agency</strong>
            </Text>
          </Section>

          <Section className="em-footer" style={footer} bgcolor="#2e0609">
            <Text className="em-muted" style={footerText}>
              LAFA AGENCY · TALENT AND CREATORS AGENCY · BUSINESS@LAFAAGENCY.COM
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
  padding: "32px 32px 28px",
  textAlign: "left",
};

const logo = {
  borderRadius: "8px",
  border: "1px solid #9e3d44",
  marginBottom: "16px",
};

const eyebrow = {
  margin: "0 0 6px",
  fontSize: "10px",
  fontWeight: "600",
  letterSpacing: "0.2em",
  color: "#e6d1ce",
};

const title = {
  margin: "0",
  fontSize: "26px",
  fontWeight: "600",
  color: "#eae3d5",
  letterSpacing: "-0.025em",
  lineHeight: "1.15",
};

const card = {
  padding: "30px 32px",
  backgroundColor: "#eae3d5",
  color: "#1c0a0b",
};

const lead = {
  margin: "0 0 20px",
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#1c0a0b",
};

const divider = {
  borderColor: "#cfc4b2",
  margin: "0 0 20px",
};

const label = {
  margin: "0 0 10px",
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "0.16em",
  color: "#6e0d14",
};

const summaryBox = {
  backgroundColor: "#f5f0e6",
  border: "1px solid #d9cfbd",
  borderRadius: "6px",
  padding: "16px 18px",
};

const summaryLabel = {
  margin: "0 0 4px",
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "0.14em",
  color: "#6d5a58",
};

const summaryService = {
  margin: "0 0 14px",
  fontSize: "15px",
  fontWeight: "600",
  color: "#6e0d14",
};

const summaryText = {
  margin: "0",
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#1c0a0b",
  whiteSpace: "pre-wrap",
};

const ctaWrap = {
  marginTop: "24px",
  marginBottom: "24px",
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

const signoff = {
  margin: "0",
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#3d2526",
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
