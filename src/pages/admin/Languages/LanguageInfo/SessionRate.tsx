
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ILnaguageMonthelySessions } from '../../../../types/queryResults';


interface ISessionRateProps{
  sessionCounts:ILnaguageMonthelySessions[]
}

function SessionRate({sessionCounts}:ISessionRateProps) {


  if(!sessionCounts) return <div className='h-64'></div>
    return (

        <div className='h-64 '>
            
            <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={sessionCounts}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#00255F" activeDot={{ r: 8 }} />
                        
                    </LineChart>
            </ResponsiveContainer>
        </div>
  
    );

}

export default SessionRate
