export const Footer = ({ zurücksetzen }) => {
  return (
    <footer className="footer">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h4>WID-Projektarbeit</h4>
        <button onClick={zurücksetzen}>Zurücksetzen</button>
        <h4>Elias Roos, Silvan Ryser</h4>
      </div>
    </footer>
  );
};
