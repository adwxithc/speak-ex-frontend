
import { useMemo } from 'react';
import { BarChart, Bar, ResponsiveContainer, Rectangle, Tooltip, YAxis, XAxis, Legend } from 'recharts';


function LearnerHelperChart({learnersCount,helpersCount}:{learnersCount:number,helpersCount:number}) {
    

    const data= useMemo(()=>{
        return [
            {
                name: 'Learners',
                'count':learnersCount||0
            },
            {
                name:'Helpers',
                'count':helpersCount||0
            }
        ]
    },[helpersCount, learnersCount])
    

      return (
        <>
        <div className='h-64 '>
        
           
            <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={data}>
           
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Tooltip />
                <Bar  dataKey="count" fill="#00255F"  background={{ fill: '#eee' }}  shape={<Rectangle radius={[10, 10, 0, 0]} />}    />
            </BarChart>

            </ResponsiveContainer>
        </div>
         
        
        </>
      );
    
}

export default LearnerHelperChart
