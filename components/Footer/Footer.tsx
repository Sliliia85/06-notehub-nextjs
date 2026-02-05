import css from './Footer.module.css';

export const Footer = () => (
  <footer className={css.footer}>
    <div className={css.content}>
      <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
      <div className={css.wrap}>
        <p>Developer: Світлана</p> {/* Замініть на ваше ім'я */}
        <p>
          Contact us: <a href="mailto:student@notehub.app">student@notehub.app</a>
        </p>
      </div>
    </div>
  </footer>
);