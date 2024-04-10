import { Add } from '@mui/icons-material'
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

function Languages() {

  const navigate = useNavigate()

  const columns = useMemo(()=>[
  
    {field:'Name', headerName:'Name',width:400},
    {field:'Base Price', headerName:'basePrice',width:400},
    {field:'blocked', headerName:'Blocked',width:400,type:'boolean',editable:true},
    
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

      getRowSpacing={params=>({
        top:params.isFirstVisible ? 0:5,
        bottom:params.isLastVisible?0:5
      })}
      

        
       />

    </Box>
  )
}

export default Languages
