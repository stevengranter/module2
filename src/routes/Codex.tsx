import { useParams } from 'react-router-dom';

export default function CodexRoute() {
  const { wilderId } = useParams();

  let content;

  if (wilderId) {
    content = <p>wilderId: {wilderId}</p>;
  }
  return (
    <>
      <h2>WilderCodex</h2>
      {content}
    </>
  );
}
