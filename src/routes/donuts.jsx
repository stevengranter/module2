import styles from './donuts.module.css';
import donutLogo from "/pink-donut.webp";

function Donuts() {
  return (
    <div>
      <img src={donutLogo} className={styles.logo} alt="an illustration of a donut with pink glaze and multi-colored sprinkles" />
      <h1>donutsy</h1>

    </div>
  );
}
export default Donuts;