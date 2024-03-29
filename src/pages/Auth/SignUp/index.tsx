import { setAuthUser } from 'Actions/AuthActions';
import { setLoaderStatus } from 'Actions/GlobalActions';
import Button from 'Components/InputFields/Button';
import Text from 'Components/InputFields/Text';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signUp } from 'Services/api';
import { SessionKey, setSession } from 'Services/securityService';
import { logo } from 'Utils/assetUtil';

import { Card, Container, CssBaseline, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import validateForm from './validateForm';

const useStyles = makeStyles(() => ({
  logo: {
    width: '300px',
    height: 'auto',
    margin: '0 auto',
    display: 'block',
    paddingTop: 30,
  },
  paper: {
    marginTop: 30,
  },
  paperDiv: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 80,
  },
}));

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles({});

  const [formData, setFormData] = React.useState<ISignUpDTO>({
    email: '',
  });
  const { email } = formData;

  const [errors] = React.useState<ISignUpDTO>({
    email: '',
  });

  const [disabledForm, setDisabledForm] = React.useState<boolean>(true);
  const [serverError, setServerError] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setServerError('');
  };

  const setLoader = (status: boolean): void => {
    dispatch(setLoaderStatus(status));
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoader(true);

    signUp(formData)
      .then((res) => {
        const authToken = res.token;
        setSession({ [SessionKey.AUTH_TOKEN]: authToken });
        dispatch(setAuthUser());
        setLoader(false);
        history.push('/dashboard');
      })
      .catch((err) => {
        setLoader(false);
        setServerError('Account already exists.');
      });
  };

  const activeSubmitButton = () => {
    if (validateForm(formData).isValid) {
      setDisabledForm(false);
    } else {
      setDisabledForm(true);
    }
  };

  React.useEffect(() => {
    activeSubmitButton();
  }, [formData]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paperDiv}>
        <Grid item xs={12}>
          <Grid container direction="column" justify="center" alignItems="center" alignContent="center">
            <Grid className="shadow-primaryBoxShadow" item xs={12}>
              <Card className="card">
                <form>
                  <Grid container item xs={12} spacing={2} direction="column" justify="center">
                    <Grid item xs={12}>
                      <img src={logo} className={classes.logo} alt="logo" />
                    </Grid>
                    <Grid item xs={12}>
                      <Text
                        id="email"
                        name="email"
                        type="text"
                        value={email}
                        label="Email"
                        icon={['fas', 'user-circle']}
                        onChange={handleChange}
                        validateField={validateForm}
                        className="w-320px"
                        errorMsg={errors.email}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <div>
                        Do have an account? <Link to="/">Log In</Link>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    spacing={2}
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <Paper className={classes.paper} elevation={0}>
                        <Button
                          id="signUn"
                          type="submit"
                          value="Sign Up"
                          onClick={onSubmit}
                          disabled={disabledForm}
                          className="w-320px h-60px focus:outline-none"
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      {serverError && <p className="msgError">{serverError}</p>}
                    </Grid>
                  </Grid>
                </form>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default SignUp;
