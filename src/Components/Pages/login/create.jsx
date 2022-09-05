import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import Footer from '../../Modules/Footer'
import SimpleNavBar from '../../Modules/SimpleNavBar'
import { Inputsigin } from './Input'
import { OAuthButtonGroup } from './OAuthButtonGroup'

export const Create = () => (

  <div style={{backgroundColor: '#ffffff'}}>

    <SimpleNavBar />

    <Container
      maxW="lg"
      py={{
        base: '12',
        md: '24',
      }}
      px={{
        base: '0',
        sm: '8',
      }}
    >
      <Stack style={{ backgroundColor: '#675cb0', padding: '2rem', borderRadius: '5%' }} spacing="8">
        <Stack spacing="6">
          <Stack
            spacing={{
              base: '2',
              md: '3',
            }}
            textAlign="center"
          >
            <Heading
              size={useBreakpointValue({
                base: 'xs',
                md: 'sm',
              })}
              color='white'
            >
              Regístrate
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color='white'>¿Estás registrado?</Text>
              <NavLink to="/login">
                <Button variant="link" colorScheme="blue">
                  Inicia sesión
                </Button>
              </NavLink>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{
            base: '0',
            sm: '8',
          }}
          px={{
            base: '4',
            sm: '10',
          }}
          bg={useBreakpointValue({
            base: 'transparent',
            sm: 'bg-surface',
          })}
          boxShadow={{
            base: 'none',
            sm: useColorModeValue('md', 'md-dark'),
          }}
          borderRadius={{
            base: 'none',
            sm: 'xl',
          }}
        >
          <Stack style={{ backgroundColor: '#9f90ea', padding: '2rem', borderRadius: '5%' }} spacing="6">
            <Stack spacing="5">
              <Inputsigin />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>

    <Footer />

  </div>
)

export default Create;