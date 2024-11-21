import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/lab'
import { Dashboard, ExitToApp, Person, ListAlt, ShoppingCart } from '@mui/icons-material'
import { Backdrop } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { logoutUser } from '../../../actions/userAuthenticateAction'
function ProfileOptions({ user }) {
  const [open, setOpen] = useState(false)
  const { cartItems } = useSelector((state) => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const actions = [
    { icon: <ListAlt />, name: 'Orders', func: () => navigate('/orders') },
    { icon: <Person />, name: 'Profile', func: () => navigate('/account') },
    { icon: <ShoppingCart className={`text-[${cartItems.length > 0 && 'tomato'}]`} />, name: `Cart ${cartItems.length}`, func: () => navigate('/cart') },
    {
      icon: <ExitToApp />, name: 'Logout', func: () => {
        dispatch(logoutUser())
        toast.success('Logout Successfully')
        navigate('/login')
      }
    },
  ];
  if (user.data.role == 'admin') {
    actions.unshift({ icon: <Dashboard />, name: 'Dashboard', func: () => navigate('/dashboard') })
  }
  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        className={`${user.data.role == 'admin' ? 'mt-[298px]' : 'mt-[240px]'} mx-4`}
        ariaLabel="SpeedDial controlled open example"
        sx={{
          '.MuiSpeedDial-fab': {
            width: 36,       // smaller width
            height: 36,      // smaller height
            minWidth: 36,   // Ensure the button doesn't expand
          },
        }}
        icon={<img src={user?.data?.avatar?.url || '/profile.png'} alt='Profile image' className='rounded-full' />}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        direction='down'
      >
        {actions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.func} />
        ))}
      </SpeedDial>
    </>
  )
}

export default ProfileOptions