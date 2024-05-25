import Table, { IColumns } from "../../components/custom/Table/Table"


interface IData {
  name: string;
  age: number;
  email: string;
  actions?:string
}

function Test() {
  const columns: IColumns<IData>[] = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Age', accessor: 'age' },
    { Header: 'Email', accessor: 'email' },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: (row: IData) => (
        <button
          onClick={() => alert(`Editing ${row.name}`)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Edit
        </button>
      ),
    },
  ];

  // Sample data
  const data: IData[] = [
    { name: 'John Doe', age: 28, email: 'john@example.com' },
    { name: 'Jane Doe', age: 22, email: 'jane@example.com' },
    { name: 'Sam Smith', age: 33, email: 'sam@example.com' },
  ];

  return (
    <div  className="h-screen">
      <Table columns={columns} data={data} />
     
    </div>


  )
}

export default Test
