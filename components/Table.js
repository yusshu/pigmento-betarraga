import styles from './Table.module.scss';

export default function Table({ head, data }) {
  return (
    <table className={styles.table}>
      <thead className="border border-white/0 border-b-black/20">
      <tr>
        {head.map((label, i) => (
          <th className="text-center text-lg font-normal p-2" key={i}>
            {label}
          </th>
        ))}
      </tr>
      </thead>
      <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {row.map((value, j) => (
            <td className="text-center text-lg p-2 font-light" key={j}>
              {value}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
}