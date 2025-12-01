export const Footer = ({ setCount }) => {
  return (
    <footer className="footer">
      <button onClick={() => setCount(0)}>Zurücksetzen</button>
    </footer>
  );
};
