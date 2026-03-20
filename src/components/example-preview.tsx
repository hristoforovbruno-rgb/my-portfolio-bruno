import styles from "./example-preview.module.css";

type ExampleTheme = "restaurant" | "clinic" | "gym" | "service";
type ExampleSize = "compact" | "full";

type ExamplePreviewProps = {
  theme: ExampleTheme;
  size?: ExampleSize;
};

export function ExamplePreview({ theme, size = "compact" }: ExamplePreviewProps) {
  return (
    <div className={`${styles.frame} ${styles[theme]} ${styles[size]}`}>
      <div className={styles.bar}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <div className={styles.viewport}>
        {theme === "restaurant" ? <RestaurantPreview /> : null}
        {theme === "clinic" ? <ClinicPreview /> : null}
        {theme === "gym" ? <GymPreview /> : null}
        {theme === "service" ? <ServicePreview /> : null}
      </div>
    </div>
  );
}

function RestaurantPreview() {
  return (
    <div className={`${styles.hero} ${styles.restaurantHero}`}>
      <div className={styles.restaurantTop}>
        <div>
          <p className={styles.kicker}>Modern Dining Experience</p>
          <h3 className={styles.title}>A menu-first layout that makes booking easier.</h3>
          <p className={styles.copy}>
            Designed to make the food feel premium and the reservation path feel obvious.
          </p>
        </div>
        <div className={styles.restaurantPhoto} />
      </div>
      <div className={styles.actions}>
        <span className={styles.primary}>Book Table</span>
        <span className={styles.ghost}>View Menu</span>
      </div>
      <div className={styles.menuStrip}>
        <div className={styles.card}>Chef specials</div>
        <div className={styles.card}>Seasonal tasting</div>
        <div className={styles.card}>Private dining</div>
      </div>
    </div>
  );
}

function ClinicPreview() {
  return (
    <div className={`${styles.hero} ${styles.clinicHero}`}>
      <p className={styles.kicker}>Trusted Dental Care</p>
      <div className={styles.clinicGrid}>
        <div>
          <h3 className={styles.title}>A calmer clinic page that builds trust quickly.</h3>
          <p className={styles.copy}>
            Structured to explain treatment clearly and reduce hesitation before first contact.
          </p>
          <div className={styles.actions}>
            <span className={styles.primary}>Request Visit</span>
            <span className={styles.ghost}>Treatments</span>
          </div>
        </div>
        <div className={styles.clinicPanels}>
          <div className={styles.card}>Implants</div>
          <div className={styles.card}>Whitening</div>
          <div className={styles.card}>Family dentistry</div>
          <div className={styles.card}>Appointment CTA</div>
        </div>
      </div>
    </div>
  );
}

function GymPreview() {
  return (
    <div className={`${styles.hero} ${styles.gymHero}`}>
      <div className={styles.gymBanner}>7 Day Trial</div>
      <h3 className={styles.title}>A higher-energy gym page with stronger signup flow.</h3>
      <p className={styles.copy}>
        Built to push trial memberships, class interest, and immediate action.
      </p>
      <div className={styles.gymStats}>
        <div className={styles.card}>Strength zone</div>
        <div className={styles.card}>Group classes</div>
        <div className={styles.card}>Open 6AM-11PM</div>
      </div>
      <div className={styles.actions}>
        <span className={styles.primary}>Free Trial</span>
        <span className={styles.ghost}>Class List</span>
      </div>
    </div>
  );
}

function ServicePreview() {
  return (
    <div className={`${styles.hero} ${styles.serviceHero}`}>
      <div className={styles.serviceHeader}>
        <div>
          <p className={styles.kicker}>Fast Local Help</p>
          <h3 className={styles.title}>A service page that pushes calls and urgent enquiries.</h3>
        </div>
        <div className={styles.servicePhone}>24/7</div>
      </div>
      <p className={styles.copy}>
        Made for local businesses that need trust, clarity, and quick contact on every screen.
      </p>
      <div className={styles.serviceLayout}>
        <div className={styles.serviceActions}>
          <span className={styles.primary}>Call Now</span>
          <span className={styles.ghost}>See Services</span>
        </div>
        <div className={styles.serviceList}>
          <div className={styles.card}>Emergency callout</div>
          <div className={styles.card}>Service areas</div>
          <div className={styles.card}>Same-day response</div>
        </div>
      </div>
    </div>
  );
}
