import "/src/Css/footer/Footer.css"
// import logo from "/src/components/assets/logo.png"

export function Footer() {
  return (
    <>
      <div className="footer">
        <img src={"./src/components/assets/company-logo.png"} alt="" />
        <div className="footer-text">
          <span className="copyright">© 2025 AAAL Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries.</span>
          <span className="links">Privacy Policy | Legal | AAAL Subscriber Agreements | Refunds | Cookies</span>
        </div>
      </div>
    </>
  );
}
