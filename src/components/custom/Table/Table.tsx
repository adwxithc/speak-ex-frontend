
export interface IColumns<T> {
  Header: string;
  accessor: keyof T;
  Cell?: (row: T) => JSX.Element;
  
}
interface ITabelProps<T> {
  columns: IColumns<T>[];
  data: T[];
  RowAction?:(row: T) => void;

}

function Table<T,>({ columns, data,RowAction }: ITabelProps<T>) {
  return (
    <table className="min-w-full divide-y divide-gray-200    ">
      <thead className=" bg-secondary ">
        <tr >

          {columns.map(column => (<th key={column.accessor as string} scope="col" className="p-5  text-center  font-medium  capitalize text-lg text-black tracking-wider">{column.Header}</th>))}


        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">

        <>
          {data?
          data.map((row, rowIndex) => (
            <tr key={rowIndex}
          className={RowAction&&'cursor-pointer'}
            onClick={RowAction?()=>RowAction(row):undefined}
            >
              {columns.map((column) => (
                <td className="max-w-[200px] overflow-hidden truncate px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 " key={column.accessor as string}>
                  {column.Cell ? column.Cell(row) : (row[column.accessor] as React.ReactNode)}
                </td>
              ))}
              
            </tr>
          ))
          : <div>Loading</div>
          }
        </>


      </tbody>
    </table>
  )
}

export default Table
