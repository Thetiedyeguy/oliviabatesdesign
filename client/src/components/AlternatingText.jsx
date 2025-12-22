import styles from "./AlternatingText.module.css";

const AlternatingText = ({ text, className }) => {
  let letterIndex = 0;

  return (
    <p className={className}>
      {text.split('').map((char, index) => {
        if (char === ' ') {
          return (
            <span key={index}>&nbsp;</span>
          );
        }

        const isEven = letterIndex % 2 === 0;
        letterIndex++;

        return (
          <span
            key={index}
            className={isEven ? styles.bigLetter : styles.smallLetter}
          >
            {char}
          </span>
        );
      })}
    </p>
  );
};


export default AlternatingText;