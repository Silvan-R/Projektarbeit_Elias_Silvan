export const Footer = ({ zurücksetzen }) => {
  return (
    <footer className="footer">
      <div className="footer-controls">
        <p>WID Projektarbeit</p>
        <button onClick={zurücksetzen}>Zurücksetzen</button>
        <p>Elias Roos, Silvan Ryser</p>
      </div>
    </footer>
  );
};
