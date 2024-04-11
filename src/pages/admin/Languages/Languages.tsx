import { Add } from '@mui/icons-material'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import  { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useGetLanguagesMutation } from '../../../redux/features/admin/auth/adminApiSlice'
import { setLanguageList } from '../../../redux/features/admin/languages/languageSlice'
import { grey } from '@mui/material/colors'

function Languages() {

  const navigate = useNavigate()

const [getLanguageList] = useGetLanguagesMutation()
const dispatch =useDispatch()
  const {languageList} = useSelector((state:RootState)=>state.language)

  useEffect(()=>{
    const getLanguages=async()=>{
      try {
          const res =await getLanguageList({}).unwrap()
          
          
          dispatch(setLanguageList([...res.data.languages]));
          
      } catch (error) {
        console.log(error);
        
      }
    }
    getLanguages()
  },[]);

  const columns = useMemo(()=>[
    {field:'id', headerName:'id',width:450},
    {field:'name', headerName:'Name',width:450},
    {field:'basePrice', headerName:'basePrice',width:450},
    
    
  ],[])

  return (
    <Box
    sx={{
      height:400,
      width:'100%'
    }}
    >
      <Box sx={{display:'flex',justifyContent:'end'}}> <Tooltip title='add new language'><IconButton onClick={()=>navigate('/admin/add-language')} sx={{backgroundColor:(theme)=>theme.palette.primary.main,marginRight:8,marginTop:5}} ><Add /></IconButton></Tooltip></Box>
      <Typography
      variant='h3'
      component='h3'
      sx={{textAlign:'center', mt:3,mb:3}}
      >
         Languages
      </Typography>
      <DataGrid
      
      columns={columns}
      rows={languageList}
      getRowSpacing={params=>({
        top:params.isFirstVisible ? 0:5,
        bottom:params.isLastVisible?0:5
      })}
      sx={{
        [`& .${gridClasses.row}`]: {
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? grey[200] : grey[900],
          
        },
      }}
     

        
       />

    </Box>
  )
}

export default Languages
