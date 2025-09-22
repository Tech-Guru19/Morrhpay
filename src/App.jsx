import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // <- this includes Popper


const COMPANY_ACCOUNT = {
  bank: "MorrhPay Bank",
  acctName: "MORRHPAY LIMITED",
  acctNumber: "1234567890",
  currency: "NGN",
};

const PAYMENT_RULES = {
  maxAmount: 5000000, 
  confirmWindowDays: 7, 
  refundPolicy:
    "If payment isn't confirmed within the confirmation window, a refund will be issued to the SAME ACCOUNT WHICH SENT THE PAYMENT.",
};

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: "#173321", zIndex: 1030 }}>
      <div className="container">
        <a className="navbar-brand text-white fw-bold d-flex align-items-center" href="#home">
          <div style={{
            width: 36, height: 36, borderRadius: 8, background: "linear-gradient(45deg,#FFC857,#FF6B6B)",
            marginRight: 10
          }} />
          <span>MorrhPay</span>
        </a>

        <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#mnav">
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>

        <div className="collapse navbar-collapse" id="mnav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link text-white" href="#about">About</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#partner">Partner with us</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#terms">Terms</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#privacy">Privacy</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header id="home" className="py-5" style={{
      background: "linear-gradient(135deg, rgba(23,51,33,0.9), rgba(40,160,100,0.85))",
      color: "white",
      minHeight: "60vh",
      display: "flex",
      alignItems: "center"
    }}>
      <div className="container text-center">
        <h1 className="display-5 fw-bold">MorrhPay — Simple, Secure Payments for Good</h1>
        <p className="lead mt-3 mb-4">Send support, manage partners, and track impact all in one place.</p>
        <a href="#partner" className="btn btn-light btn-lg" style={{ color: "#173321" }}>Partner With Us</a>
      </div>
    </header>
  );
}

function About() {
  return (
    <section id="about" className="py-5 bg-light">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-md-6">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6a7ef8d47b3afaed4f4cf0a6e2f2c4b6"
              alt="about" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold" style={{ color: "#173321" }}>About MorrhPay</h2>
            <p className="lead text-muted">
              MorrhPay is a payment orchestration platform built to make donations and partner payments secure and transparent.
              We connect donors and partners, ensure funds go to verified accounts, and provide clear timelines and refund policies.
            </p>
            <ul>
              <li>Secure transfers to company account</li>
              <li>Transparent confirmation & refund policy</li>
              <li>Partner onboarding with fast response</li>
            </ul>
            <p className="text-muted mb-0">Let’s build trustworthy giving together.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerFormSection() {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [acctName, setAcctName] = useState("");
  const [acctNumber, setAcctNumber] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!company.trim()) e.company = "Company / Organization name is required";
    if (!contact.trim()) e.contact = "Contact person is required";
    if (!email.match(/^\S+@\S+\.\S+$/)) e.email = "Valid email required";
    if (!phone.trim()) e.phone = "Phone number required";
    if (!country.trim()) e.country = "Country required";
    if (!acctName.trim()) e.acctName = "Account name required";
    if (!acctNumber.trim()) e.acctNumber = "Account number required";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    const partner = {
      id: Date.now(),
      company, contact, email, phone, country, acctName, acctNumber, message,
      createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem("morrhpay_partners") || "[]");
    existing.unshift(partner);
    localStorage.setItem("morrhpay_partners", JSON.stringify(existing));
    setSuccess(true);

    setCompany(""); setContact(""); setEmail(""); setPhone(""); setCountry(""); setAcctName(""); setAcctNumber(""); setMessage("");
    setErrors({});
  };

  return (
    <section id="partner" className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h3 className="fw-bold text-center mb-3" style={{ color: "#173321" }}>Partner With Us</h3>
            <p className="text-center text-muted mb-4">Fill the form below and our partnerships team will reach out.</p>

            {success ? (
              <div className="text-center py-4">
                <div className="card shadow-sm mx-auto" style={{ maxWidth: 560 }}>
                  <div className="card-body">
                    <h4 className="fw-bold text-success">🎉 Thanks — we received your request</h4>
                    <p className="mb-2">We’ll reach out to <strong>{contact || "you"}</strong> at <strong>{email}</strong> within 3 business days.</p>
                    <p className="small text-muted mb-3">Want to submit another? The last submission is saved locally on your device.</p>
                    <div className="d-flex gap-2 justify-content-center">
                      <a className="btn btn-outline-secondary" href="#home">Back to home</a>
                      <button className="btn btn-success" onClick={() => setSuccess(false)}>Create another</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card shadow-sm p-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Company / Organization</label>
                    <input className={`form-control ${errors.company ? "is-invalid" : ""}`} value={company} onChange={e => setCompany(e.target.value)} />
                    <div className="invalid-feedback">{errors.company}</div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Contact Person</label>
                    <input className={`form-control ${errors.contact ? "is-invalid" : ""}`} value={contact} onChange={e => setContact(e.target.value)} />
                    <div className="invalid-feedback">{errors.contact}</div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input className={`form-control ${errors.email ? "is-invalid" : ""}`} value={email} onChange={e => setEmail(e.target.value)} />
                    <div className="invalid-feedback">{errors.email}</div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input className={`form-control ${errors.phone ? "is-invalid" : ""}`} value={phone} onChange={e => setPhone(e.target.value)} />
                    <div className="invalid-feedback">{errors.phone}</div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Country</label>
                    <input className={`form-control ${errors.country ? "is-invalid" : ""}`} value={country} onChange={e => setCountry(e.target.value)} />
                    <div className="invalid-feedback">{errors.country}</div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Your Bank Account Name</label>
                    <input className={`form-control ${errors.acctName ? "is-invalid" : ""}`} value={acctName} onChange={e => setAcctName(e.target.value)} />
                    <div className="invalid-feedback">{errors.acctName}</div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Your Bank Account Number</label>
                    <input className={`form-control ${errors.acctNumber ? "is-invalid" : ""}`} value={acctNumber} onChange={e => setAcctNumber(e.target.value)} />
                    <div className="invalid-feedback">{errors.acctNumber}</div>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Message (short note)</label>
                    <textarea className="form-control" rows="3" value={message} onChange={e => setMessage(e.target.value)} />
                  </div>

                  <div className="col-12 text-muted small">
                    <p><strong>Note:</strong> All payments should be sent to our company account:</p>
                    <ul>
                      <li><strong>Bank:</strong> {COMPANY_ACCOUNT.bank}</li>
                      <li><strong>Account name:</strong> {COMPANY_ACCOUNT.acctName}</li>
                      <li><strong>Account number:</strong> {COMPANY_ACCOUNT.acctNumber}</li>
                      <li><strong>Currency:</strong> {COMPANY_ACCOUNT.currency}</li>
                    </ul>
                    <p className="mb-0">Important: When a partner or donor sends a payment, the <strong>name on the payment alert must match the name filled in this form</strong>. If names do not match, a refund will be issued to the account which sent the payment.</p>
                  </div>

                  <div className="col-12 d-grid">
                    <button type="submit" className="btn btn-lg" style={{ backgroundColor: "#173321", color: "white" }}>
                      Submit Partnership Request
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Terms() {
  return (
    <section id="terms" className="py-5 bg-white">
      <div className="container">
        <h3 className="fw-bold mb-3" style={{ color: "#173321" }}>Terms &amp; Conditions — MorrhPay</h3>

        <p className="text-muted">These terms govern payments and partner onboarding on MorrhPay. By using our service you accept these terms.</p>

        <h5 className="mt-4">1. Payment destination</h5>
        <p>All official payments for donations or partner transfers must be sent to the MorrhPay company account listed on our website and on the Partner form. Any payment sent to a different account is not recognized.</p>

        <h5 className="mt-3">2. Maximum allowable amount</h5>
        <p>
          The maximum single payment allowed through MorrhPay is <strong>{COMPANY_ACCOUNT.currency} {Number(PAYMENT_RULES.maxAmount).toLocaleString()}</strong>.
          Payments exceeding this limit require prior written approval from MorrhPay.
        </p>

        <h5 className="mt-3">3. Payment confirmation timeline</h5>
        <p>
          MorrhPay aims to confirm receipt of payments within <strong>{PAYMENT_RULES.confirmWindowDays} business days</strong>. Confirmation may take longer if bank processing or verification is required.
        </p>

        <h5 className="mt-3">4. Name matching requirement</h5>
        <p>
          The name on the payment alert (the sender's name shown by the bank) must match the partner/donor name provided on the form. If the name on the alert does not match the form record, the payment will not be confirmed until the mismatch is resolved. If the mismatch cannot be resolved, a refund will be issued to the sending account.
        </p>

        <h5 className="mt-3">5. Same-account rule</h5>
        <p>
          Payments should not be sent from the company account (i.e., do not send to MorrhPay from MorrhPay's own account). If a payment is made from the company's account inadvertently, it will be flagged and returned.
        </p>

        <h5 className="mt-3">6. If payment is not confirmed</h5>
        <p>
          If MorrhPay cannot confirm the payment within the confirmation window due to verification issues or mismatched details, we will:
        </p>
        <ul>
          <li>Notify the sender to provide proof/clarification.</li>
          <li>If unresolved within 14 days, we will issue a refund to the same sending account number automatically.</li>
          <li>Refunds are issued only to the account that originally sent the funds; we do not send refunds to third-party accounts.</li>
        </ul>

        <h5 className="mt-3">7. Refund policy</h5>
        <p>
          Refunds will be issued to the exact account number that sent the payment. MorrhPay is not responsible for funds sent to wrong accounts due to incorrect details provided by the sender.
        </p>

        <h5 className="mt-3">8. Dispute & support</h5>
        <p>
          If you have questions about a payment or confirmation, contact our partnerships team (the email displayed on the site). We’ll investigate and respond within 5 business days.
        </p>
      </div>
    </section>
  );
}

function Privacy() {
  return (
    <section id="privacy" className="py-5 bg-light">
      <div className="container">
        <h3 className="fw-bold mb-3" style={{ color: "#173321" }}>Privacy Policy</h3>
        <p className="text-muted">We respect your privacy. This page explains how we collect and use partner and donor data.</p>

        <h5 className="mt-3">Data we collect</h5>
        <ul>
          <li>Contact & company details provided on the Partner form</li>
          <li>Transaction alerts and minimal payment metadata required to confirm transfers</li>
        </ul>

        <h5 className="mt-3">How we use data</h5>
        <ul>
          <li>To verify payments and confirm partner/donor identity</li>
          <li>To contact partners about collaborations</li>
          <li>To comply with legal and audit requirements</li>
        </ul>

        <h5 className="mt-3">Data retention</h5>
        <p className="text-muted">Partner details are kept for as long as needed to provide the service and for legal compliance. If you want your data removed, contact us and we will remove it from our records where feasible.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-4" style={{ backgroundColor: "#173321", color: "white" }}>
      <div className="container text-center">
        <small>&copy; {new Date().getFullYear()} MorrhPay. All rights reserved.</small>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <About />
        <PartnerFormSection />
        <Terms />
        <Privacy />
      </main>
      <Footer />
    </>
  );
}
