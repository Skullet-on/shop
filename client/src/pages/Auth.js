import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../index';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/constants'

const Auth = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (isLogin) {
        await user.login(email, password);
      } else {
        await user.registration(email, password);
      }
    
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e)
    }
    
  }

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{height: window.innerHeight - 54}}
    >
      <Card style={{width: 600}} className="p-5">
        <h2 className='m-auto'>{ isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className='d-flex flex-column'>
          <Form.Control
            className='mt-3'
            placeholder='Введите email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className='mt-3'
            placeholder='Введите пароль'
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className='d-flex justify-content-between mt-3'>
            { isLogin ?
              <div>
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
              </div>
              :
              <div>
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
              </div>
            }
            <Button
              variant={'outline-dark'}
              onClick={handleClick}
            >
              { isLogin ? 'Войти' : 'Регистрация' }
            </Button>
          </div>
        </Form>
      </Card>  
    </Container>
  )
})

export default Auth;
