import { setAuthUser } from 'Actions/AuthActions';
import Button from 'Components/input-fields/button';
import Text from 'Components/input-fields/text';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { login } from 'Services/api';
import LoaderHOC from 'Services/loaderService';
import { SessionKey, setSession } from 'Services/securityService';
import { logo } from 'Utils/AssetUtil';

import { faFingerprint, faUserCircle } from '@fortawesome/free-solid-svg-icons';
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

type TProps = {
  setLoader: (status: boolean) => void;
};

const Login = (props: TProps): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles({});
  const { setLoader } = props;

  const [formData, setFormData] = React.useState<ILoginDTO>({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const [errors] = React.useState<ILoginDTO>({
    email: '',
    password: '',
  });

  const [disabledForm, setDisabledForm] = React.useState<boolean>(true);
  const [serverError, setServerError] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setServerError('');
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoader(true);

    login(formData)
      .then((res) => {
        const authToken = res.token;
        setSession({ [SessionKey.AUTH_TOKEN]: authToken });
        dispatch(setAuthUser());
        setLoader(false);
        history.push('/dashboard');
      })
      .catch(() => {
        setLoader(false);
        setServerError('Invalid Credentials');
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
                        icon={faUserCircle}
                        onChange={handleChange}
                        validateField={validateForm}
                        className="w-320px"
                        errorMsg={errors.email}
                        required
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Text
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        label="Password"
                        icon={faFingerprint}
                        onChange={handleChange}
                        validateField={validateForm}
                        className="w-320px"
                        errorMsg={errors.password}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Link to="forgotpassword">Forgot password?</Link>
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
                          id="signIn"
                          type="submit"
                          value="Log In"
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

export default LoaderHOC(Login);
