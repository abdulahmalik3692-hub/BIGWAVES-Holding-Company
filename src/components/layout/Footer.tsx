export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__copyright">
          <a
            href="#hero"
            className="site-footer__link"
          >
            &copy; 2026 Big Wave Holding Company
          </a>
          <span className="site-footer__separator">&middot;</span>
          <span>All Rights Reserved</span>
        </p>
        <a
          href="https://bigwave.com"
          target="_blank"
          rel="noreferrer"
          className="site-footer__domain"
        >
          bigwave.com
        </a>
      </div>
    </footer>
  );
}
