export const Footer = ({ setCount }) => {
  return (
    <footer className="footer">
      Footer
      <button onClick={() => setCount(0)}>Null</button>
    </footer>
  );
};
