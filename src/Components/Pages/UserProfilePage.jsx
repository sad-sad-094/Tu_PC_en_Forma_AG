//! Sebastian


import React, { useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../Utils/JulianFirebase';
import { actionLogIn, actionLogOut } from '../../Redux/Actions/Actions';
import { getAuth, deleteUser, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input, MainContainer, MaintenanceCard, TargetContainer, TestimoniesContainer } from '../../Styles/StylesSebastian';

function UserProfilePage() {

  const navigation = useNavigate();
  const user = useSelector(state => state.userLogIn);
  const dispatch = useDispatch();

  const [newUserInfo, setNewUserInfo] = useState({
    name: '',
    apellidos: '',
    phone: ''
  });
  const [show, setShow] = useState(false);

  const setNewInfo = (event) => {
    setNewUserInfo({
      ...newUserInfo,
      [event.target.name]: event.target.value,
    })
  }

  const updateUserInfo = () => {
    updateDoc(doc(db, 'Clientes', user.id), {
      name: newUserInfo.name,
      apellidos: newUserInfo.apellidos,
      phone: newUserInfo.phone
    })
      .then(() => {
        toast.success('Información actualizada con éxito.');
        let updateInfoAction = Object.assign({}, actionLogIn);
        updateInfoAction.payload = {
          name: newUserInfo.name,
          apellidos: newUserInfo.apellidos,
          email: user.email,
          phone: newUserInfo.phone,
          isLogged: true
        };
        dispatch(updateInfoAction);
        navigation("/home");
      })
  }

  const letDeleteUser = () => {
    deleteDoc(doc(db, 'Clientes', user.id))
      .then(() => {
        deleteUser(getAuth().currentUser)
          .then(() => {
            toast.success('Usuario eliminado exitosamente.')
            letLogout();
            navigation("/");
          })
          .catch((error) => toast.error(`Ocurrió un error. ${error}. Por favor, contacta al administrador.`));
      })
      .catch((error) => toast.error(`Ocurrió un error. ${error}. Por favor, contacta al administrador.`));

  }

  const letLogout = () => {
    signOut(getAuth())
      .then(() => {
        let logOutAction = Object.assign({}, actionLogOut);
        dispatch(logOutAction);
      })
  }

  const showInput = () => setShow(true);


  return (

    <MainContainer>

      <MaintenanceCard style={{ borderRadius: '25px' }}>
        
        <h2>{user.name} {user.apellidos}</h2>

        {user.avatar ?

           <img style={{width: '5%', borderRadius: '50%'}} src={user.avatar} alt="Usuario Foto" />

          : 

          <img style={{width: '5%', borderRadius: '50%'}} src="https://res.cloudinary.com/dtxqusdhr/image/upload/v1660799782/BuffaloApp/User-Profile-Transparent_lfytwr.png" alt="Usuario Foto" />

          }

        <p>Esta es la información de tu perfil de usuario.</p>

        {show === true ?
          <TargetContainer>
            <form onChange={setNewInfo}>
              <Input type="text" placeholder="Por favor, actualiza tu nombre" required name="name" />
              <Input type="text" placeholder="Por favor, actualiza tus apellidos" required name="apellidos" />
              <Input type="text" placeholder="Por favor, actualiza tu teléfono" required name="phone" />
            </form>
            <TestimoniesContainer>
              <Button style={{ backgroundColor: '#58E228', color: '#ffffff' }} onClick={updateUserInfo}>Guardar</Button>
              <Button style={{ backgroundColor: '#ff0000', color: '#ffffff' }} onClick={letDeleteUser}>Darse de baja</Button>
              <Button style={{ backgroundColor: '#ffffff', color: '#000000' }} onClick={() => setShow(false)}>Cancelar</Button>
            </TestimoniesContainer>
          </TargetContainer> : <TargetContainer style={{ marginTop: '1rem' }}>
            <Input type="text" placeholder={user.name} required name="name" disabled />
            <Input type="text" placeholder={user.apellidos} required name="apellidos" disabled />
            <Input type="text" placeholder={user.phone} required name="phone" disabled />
            <Button style={{ backgroundColor: '#ffffff', color: '#000000' }} onClick={showInput}>Editar perfil</Button>
          </TargetContainer>
        }


        <Button style={{ backgroundColor: '#ffffff', color: '#000000' }} onClick={() => navigation("/home")}>Regresar</Button>

      </MaintenanceCard>

    </MainContainer>

  )

}

export default UserProfilePage;
