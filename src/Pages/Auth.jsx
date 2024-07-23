import { Formik, Field, Form } from "formik";
import { Link, useMatch, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/index";
function Auth() {
  const isregister = useMatch('/register');
  const navigate = useNavigate();
  const { login } = useAuth();
  async function onSubmit(values, actions) {
    console.log(values, actions);
    try {
      //api for login  or register will be called here 
      const { data } = await axios.post(`http://localhost:3001/api/users${isregister ? '' : '/login'}`, { user: values });


      console.log(data.user)
      //to login the user 
      login(data.user);

      console.log('user logged in');
      //navigateuser back to home page
      navigate('/');
    } catch (error) {
      console.error('error on submit', error)


      const { status, data } = error.response;
      if (status === 422) {
        actions.setErrors(data.errors);
      }
    }

  }
  const logininival = { email: '', password: '' }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign {isregister ? 'Up' : 'In'}</h1>
            <p className="text-xs-center">
              <Link to={isregister ? '/login' : '/register'}>
                {isregister ? 'have' : 'need'}
                &nbsp;an account?
                {/* space character */}
              </Link>
            </p>
            <Formik
              onSubmit={onSubmit}
              initialValues={isregister ? { ...logininival, username: '' } : logininival}
            >
              {() => (
                <>
                  {/* <FormErrors /> */}
                  <Form>
                    {isregister &&

                      <fieldset className="form-group">
                        <Field
                          type="text"
                          name="username"
                          placeholder="Your Name"
                          className="form-control form-control-lg"
                        />
                      </fieldset>
                    }


                    <fieldset className="form-group">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control form-control-lg"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control form-control-lg"
                      />
                    </fieldset>
                    <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                      Sign {isregister ? 'Up' : 'In'}
                    </button>
                  </Form>
                </>
              )}
            </Formik>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
