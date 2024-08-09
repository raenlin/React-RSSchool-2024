import styles from './Footer.module.css';

function Footer() {
  return (
    <footer>
      <div className={styles['footer-inner']}>
        <a href="https://github.com/raenlin/" target="blank">
          <h3>raenlin</h3>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
