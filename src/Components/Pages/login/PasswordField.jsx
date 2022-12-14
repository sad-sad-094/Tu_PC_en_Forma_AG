import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
  useMergeRefs
} from '@chakra-ui/react'
import * as React from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { useForm } from '../../../Hooks/useForm';
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { actionLogIn } from '../../../Redux/Actions/Actions';
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../Utils/JulianFirebase';


export const PasswordField = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = React.useRef(null)
  const mergeRef = useMergeRefs(inputRef, ref)
  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  })
  const onClicksumit = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, formValues.email, formValues.password)
      .then((userCredential) => {
        if (!userCredential.user.emailVerified) {
          toast.warm('Tu cuenta no ha sido verificada. Por favor, verifica tu correo antes de iniciar sesión.')
        } else {
          getDoc(doc(db, 'Clientes', auth.currentUser.uid))
            .then(doc => {
              if (doc.exists) {
                let userData = doc.data();
                let logInaction = Object.assign({}, actionLogIn);
                logInaction.payload = {
                  name: auth.currentUser.displayName,
                  id: auth.currentUser.uid,
                  email: userData.email,
                  apellidos: userData.apellidos,
                  phone: userData.phone,
                  admin: userData.admin,
                  avatar: auth.currentUser.photoURL,
                  isLogged: true
                };
                dispatch(logInaction);
                toast.success('Bienvenido.')
                navigation("/home");
              } else {
                toast.error('Por favor, contacta al administrador del sitio. Ha ocurrido un error.')
              }
            })

        }
      })
      .catch((error) => {
        checkLoginErr(error.code);
      });
  }
  const onClickReveal = () => {

    onToggle()

    if (inputRef.current) {
      inputRef.current.focus({
        preventScroll: true,

      })
    }
  }

  const checkLoginErr = (code) => {
    switch (code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        toast.warn("Correo o contraseña incorrectos.");
        break;
      case "auth/too-many-requests":
        toast.warn("El correo de verificación ha sido enviado muchas veces. Contacta al administrador.");
        break;
      default:
        break;
    }
  }

  return (
    < >
      <form >
        <FormControl>
          <FormLabel color='white' htmlFor="email">Correo</FormLabel>
          <Input color='white' onChange={handleInputChange} value={formValues.email} id="email" name="email" type="email" />
        </FormControl>
        <FormControl>
          <FormLabel color='white' htmlFor="password">Constraseña</FormLabel>
          <InputGroup>
            <InputRightElement>
              <IconButton
                variant="link"
                aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                icon={isOpen ? <HiEyeOff /> : <HiEye />}
                onClick={onClickReveal}
              />
            </InputRightElement>
            <Input
              color='white'
              onChange={handleInputChange}
              value={formValues.password}
              id="password"
              ref={mergeRef}
              name="password"
              type={isOpen ? 'text' : 'password'}
              autoComplete="current-password"
              required
              {...props}
            />

          </InputGroup>
          <br />
          <Stack spacing="6"  >
            <Button onClick={onClicksumit} backgroundColor='white' color='mute' >Inicia Sesion</Button>
          </Stack>
        </FormControl>
      </form>
    </>
  )
})
PasswordField.displayName = 'PasswordField'