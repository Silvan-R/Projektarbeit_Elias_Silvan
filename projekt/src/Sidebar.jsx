export const Sidebar = ({ setCount, count }) => {
  return (
    <aside>
      Sidebar
      <button id="1" onClick={() => setCount(count + 1)}>
        Klick mich
      </button>
    </aside>
  );
};
