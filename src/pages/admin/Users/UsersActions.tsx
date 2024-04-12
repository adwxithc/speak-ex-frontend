import { Check, Save } from '@mui/icons-material';
import { Box, CircularProgress, Fab } from '@mui/material'
import { green } from '@mui/material/colors';
import { GridCellParams } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { useUpdateUserMutation } from '../../../redux/features/admin/listUsers/usersListApiSlice';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../../redux/features/admin/listUsers/usersListSlice';


function UsersActions({
  params,
  rowId,
  setRowId,
}: {
  params: GridCellParams;
  rowId: string | null;
  setRowId: React.Dispatch<React.SetStateAction<string | null>>;
}) {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [updateUser] = useUpdateUserMutation()

  const dispatch = useDispatch()
  const handleSubmit = async () => {
    try {

      setLoading(true)

      const data = { id: params.id, blocked: params.row.blocked }
      const res = await updateUser(data).unwrap()
      console.log(res);
      dispatch(updateUserData(res.data))
      setSuccess(true),
        setRowId(null)

    } catch (error) {


      console.log(error);

    } finally {
      setLoading(false)
      setTimeout(() => {
        setSuccess(false)
      }, 2000)

    }
  }


  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  )
}

export default UsersActions
